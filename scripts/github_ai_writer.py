import os
import csv
import json
import base64
import urllib.parse
import urllib.request
import time
import sys
from openai import OpenAI
import requests

# Constants
WP_API_URL = "http://cms.bowlingnavi.com/wp-json/wp/v2"
WP_USER = "shun"
WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz8GYZzWDImN1yxwY1pkE6ovCSp45NTy1LLNq5dZeFCDSa6fpjH_RpgBjWHDQaLvQE7/exec"
CSV_PATH = "content_pipeline.csv"
PROMPT_PATH = "AI_WRITER_PROMPT.md"
MAX_ARTICLES_PER_RUN = 3

def get_auth_header():
    wp_app_password = os.environ.get("WP_APP_PASSWORD")
    if not wp_app_password:
        raise ValueError("WP_APP_PASSWORD is not set in environment variables.")
    credentials = f"{WP_USER}:{wp_app_password}"
    return "Basic " + base64.b64encode(credentials.encode()).decode()

def get_category_id(slug):
    res = requests.get(f"{WP_API_URL}/categories?slug={slug}")
    if res.status_code == 200 and len(res.json()) > 0:
        return res.json()[0]["id"]
    return None

def fetch_thumbnail(slug, title, category_name):
    og_url = f"https://www.bowlingnavi.com/api/og?title={urllib.parse.quote(title)}&category={urllib.parse.quote(category_name)}"
    print(f"Fetching thumbnail from {og_url}...")
    res = requests.get(og_url, timeout=15)
    if res.status_code == 200:
        filepath = f"/tmp/{slug}.png"
        with open(filepath, "wb") as f:
            f.write(res.content)
        return filepath
    return None

def upload_media(filepath, filename):
    print(f"Uploading {filepath} to WP Media...")
    headers = {
        "Authorization": get_auth_header(),
    }
    with open(filepath, "rb") as f:
        files = {
            "file": (filename, f, "image/png")
        }
        res = requests.post(f"{WP_API_URL}/media", headers=headers, files=files)
    
    if res.status_code != 201:
        print("Failed to upload image:", res.text)
        return None
    return res.json()["id"]

def create_wp_post(payload, media_id):
    payload["featured_media"] = media_id
    headers = {
        "Authorization": get_auth_header(),
        "Content-Type": "application/json"
    }
    res = requests.post(f"{WP_API_URL}/posts", headers=headers, json=payload)
    if res.status_code != 201:
        print("Failed to create post:", res.text)
        return None, None
    data = res.json()
    post_id = data["id"]
    edit_url = f"http://cms.bowlingnavi.com/wp-admin/post.php?post={post_id}&action=edit"
    return post_id, edit_url

def update_spreadsheet(row_idx, edit_url):
    payload = {
        "secret": "bowlingnavi_ai_2026",
        "row": row_idx,
        "status": "Draft",
        "wpUrl": edit_url
    }
    try:
        res = requests.post(WEBHOOK_URL, json=payload, allow_redirects=True)
        print(f"Webhook response for row {row_idx}: {res.status_code}")
    except Exception as e:
        print(f"Webhook failed for row {row_idx}: {e}")

def generate_article_with_ai(category, main_kw, long_tail_kws):
    openai_key = os.environ.get("OPENAI_API_KEY")
    if not openai_key:
        raise ValueError("OPENAI_API_KEY is not set.")
    
    client = OpenAI(api_key=openai_key)
    
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        system_prompt = f.read()
        
    user_prompt = f"""
以下のキーワード情報に基づいて記事を執筆してください。
出力は必ずJSONフォーマットで返してください。

【キーワード情報】
カテゴリ: {category}
メインキーワード: {main_kw}
関連（ロングテール）キーワード: {long_tail_kws}

【出力JSONフォーマット】
{{
    "title": "記事のタイトル（自然な日本語でキーワードを含む）",
    "content": "記事本文のHTML（必ずガイドラインの構成・文字数を守ること）",
    "fcb_seo_title": "SEOタイトル",
    "fcb_seo_keyword": "SEOキーワード（カンマ区切り）",
    "fcb_seo_description": "メタディスクリプション"
}}
"""

    print(f"Calling OpenAI API for keyword: {main_kw}...")
    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=8000
    )
    
    result_text = response.choices[0].message.content
    try:
        return json.loads(result_text)
    except json.JSONDecodeError:
        print("Failed to decode JSON from OpenAI response.")
        print("Raw response:", result_text)
        return None

def get_category_name_ja(slug):
    mapping = {
        "gear": "ボウリング用品",
        "technique": "テクニック・投げ方",
        "knowledge": "知識・ルール",
        "others": "その他"
    }
    return mapping.get(slug, "ボウリング情報")

def main():
    if not os.path.exists(CSV_PATH):
        print(f"CSV file {CSV_PATH} not found.")
        sys.exit(1)

    with open(CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        all_rows = list(reader)

    if len(all_rows) <= 1:
        print("No data in CSV.")
        sys.exit(0)

    header = all_rows[0]
    processed_count = 0

    for idx, row in enumerate(all_rows):
        if idx == 0:
            continue
        
        # Row structure: Category(0), Main KW(1), Long tail KWs(2), Slug(3), Status(4), WP URL(5), Published URL(6)
        if len(row) > 4 and row[4] == "Not Started":
            category = row[0]
            main_kw = row[1]
            long_tail_kws = row[2]
            slug = row[3]
            
            print(f"\n--- Processing [{slug}] ({main_kw}) ---")
            
            # 1. Generate Article
            article_data = generate_article_with_ai(category, main_kw, long_tail_kws)
            if not article_data:
                continue
                
            # 2. Upload Media (Thumbnail)
            cat_name_ja = get_category_name_ja(category)
            img_path = fetch_thumbnail(slug, article_data["title"], cat_name_ja)
            media_id = None
            if img_path:
                media_id = upload_media(img_path, f"{slug}.png")
                
            if not media_id:
                print("Failed to get media ID, skipping post creation to avoid missing thumbnail.")
                continue

            # 3. Create WP Post
            cat_id = get_category_id(category) or 1
            payload = {
                "title": article_data["title"],
                "content": article_data["content"],
                "status": "draft",
                "slug": slug,
                "categories": [cat_id],
                "fcb_seo_title": article_data.get("fcb_seo_title", ""),
                "fcb_seo_keyword": article_data.get("fcb_seo_keyword", ""),
                "fcb_seo_description": article_data.get("fcb_seo_description", "")
            }
            
            post_id, edit_url = create_wp_post(payload, media_id)
            if post_id:
                print(f"Successfully posted {slug}. Edit URL: {edit_url}")
                
                # 4. Update CSV row
                row[4] = "Draft"
                # Ensure row has enough columns
                while len(row) < 6:
                    row.append("")
                row[5] = edit_url
                
                # 5. Trigger Google Sheets Webhook
                sheet_row = idx + 1 # 1-indexed in Google Sheets (A1 = header)
                update_spreadsheet(sheet_row, edit_url)
                
                processed_count += 1
                
                if processed_count >= MAX_ARTICLES_PER_RUN:
                    print(f"Reached max articles per run ({MAX_ARTICLES_PER_RUN}). Stopping.")
                    break
                else:
                    # Sleep briefly to avoid aggressive API usage
                    print("Waiting 10 seconds before next article...")
                    time.sleep(10)

    # Save CSV back
    if processed_count > 0:
        with open(CSV_PATH, "w", encoding="utf-8", newline="") as f:
            writer = csv.writer(f)
            writer.writerows(all_rows)
        print("CSV updated locally.")
    else:
        print("No articles processed.")

if __name__ == "__main__":
    main()
