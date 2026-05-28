#!/usr/bin/env python3
"""
ボウナビ サムネイル自動生成スクリプト
- サイズ: 1200x630px (OGP標準)
- デザイン: ダーク系・ブルーアクセント（サイトのデザインに統一）
- テキスト: タイトル・カテゴリーバッジ・ブランド名を自動配置
- 使用方法: python3 generate_thumbnail.py "記事タイトル" "カテゴリー名" output.png
"""

import sys
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# =====================================
# 設定
# =====================================
W, H = 1200, 630

# カラーパレット（サイトのSlate・Blueテーマに合わせる）
COLOR_BG_TOP    = (10, 20, 45)      # #0a1422 濃いネイビー
COLOR_BG_BTM    = (15, 35, 75)      # #0f234b 少し明るいネイビー
COLOR_ACCENT    = (59, 130, 246)    # #3b82f6 ブルー
COLOR_ACCENT2   = (96, 165, 250)    # #60a5fa ライトブルー
COLOR_WHITE     = (255, 255, 255)
COLOR_GRAY      = (148, 163, 184)   # slate-400
COLOR_DARK_CARD = (20, 35, 65)      # カードの背景

CATEGORY_COLORS = {
    "ボウリング用品":  (59,  130, 246),   # blue
    "gear":           (59,  130, 246),
    "スキルアップ":    (16,  185, 129),   # emerald
    "technique":      (16,  185, 129),
    "ルール・知識":    (168, 85,  247),   # purple
    "knowledge":      (168, 85,  247),
    "初心者ガイド":    (245, 158, 11),    # amber
    "guide":          (245, 158, 11),
    "その他":         (148, 163, 184),   # gray
    "others":         (148, 163, 184),
}

FONT_BOLD   = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
FONT_MEDIUM = "/System/Library/Fonts/ヒラギノ角ゴシック W4.ttc"
FONT_LIGHT  = "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc"


def draw_gradient_bg(draw):
    """グラデーション背景を描画"""
    for y in range(H):
        ratio = y / H
        r = int(COLOR_BG_TOP[0] + (COLOR_BG_BTM[0] - COLOR_BG_TOP[0]) * ratio)
        g = int(COLOR_BG_TOP[1] + (COLOR_BG_BTM[1] - COLOR_BG_TOP[1]) * ratio)
        b = int(COLOR_BG_TOP[2] + (COLOR_BG_BTM[2] - COLOR_BG_TOP[2]) * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b))


def draw_bowling_decoration(img, draw):
    """ボウリングボール・ピンの装飾を右側に描画"""
    # 大きな半透明サークル（ボウリングボールのイメージ）
    cx, cy = 950, 315
    r = 220

    # 外側のグロー
    for i in range(5, 0, -1):
        glow_r = r + i * 15
        alpha = int(15 * (6 - i))
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ov_draw = ImageDraw.Draw(overlay)
        ov_draw.ellipse(
            [cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r],
            fill=(*COLOR_ACCENT, alpha)
        )
        img.alpha_composite(overlay)

    # メインサークル（ボール本体）
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        fill=(25, 55, 115, 180)
    )
    img.alpha_composite(overlay)

    # ボールの光沢（ハイライト）
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.ellipse(
        [cx - r + 20, cy - r + 20, cx - 60, cy - 40],
        fill=(255, 255, 255, 35)
    )
    img.alpha_composite(overlay)

    # ボールの指穴（3つ）
    holes = [
        (cx - 30, cy - 60, 20),
        (cx + 20, cy - 80, 16),
        (cx + 55, cy - 30, 16),
    ]
    for hx, hy, hr in holes:
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ov_draw = ImageDraw.Draw(overlay)
        ov_draw.ellipse(
            [hx - hr, hy - hr, hx + hr, hy + hr],
            fill=(5, 10, 30, 200)
        )
        img.alpha_composite(overlay)

    # ボールの外枠線
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        outline=(*COLOR_ACCENT2, 80), width=3
    )
    img.alpha_composite(overlay)

    # ピン（小さい三角形配置）
    pin_base_x, pin_base_y = 870, 460
    pin_positions = [
        (pin_base_x, pin_base_y - 60),
        (pin_base_x - 22, pin_base_y - 30),
        (pin_base_x + 22, pin_base_y - 30),
        (pin_base_x - 44, pin_base_y),
        (pin_base_x,      pin_base_y),
        (pin_base_x + 44, pin_base_y),
    ]
    for px, py in pin_positions:
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ov_draw = ImageDraw.Draw(overlay)
        ov_draw.ellipse([px - 8, py - 16, px + 8, py + 8],
                        fill=(255, 255, 255, 50))
        ov_draw.ellipse([px - 7, py - 5, px + 7, py + 8],
                        fill=(200, 220, 255, 60))
        img.alpha_composite(overlay)

    return img


def draw_grid_lines(draw):
    """薄いグリッド線で奥行きを演出"""
    for x in range(0, W, 80):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, 80):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)


def draw_accent_bar(draw):
    """左側のアクセントバー"""
    draw.rectangle([0, 0, 6, H], fill=COLOR_ACCENT)


def wrap_text(text, font, max_width):
    """テキストを指定幅で折り返す"""
    chars = list(text)
    lines = []
    current = ""

    for ch in chars:
        test = current + ch
        bbox = font.getbbox(test)
        w = bbox[2] - bbox[0]
        if w <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = ch

    if current:
        lines.append(current)
    return lines


def draw_category_badge(img, draw, category, cat_color):
    """カテゴリーバッジを描画"""
    try:
        fnt = ImageFont.truetype(FONT_MEDIUM, 24)
    except:
        fnt = ImageFont.load_default()

    padding_x, padding_y = 20, 10
    bbox = fnt.getbbox(category)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    bw = tw + padding_x * 2
    bh = th + padding_y * 2
    bx, by = 60, 60

    # バッジ背景
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.rounded_rectangle(
        [bx, by, bx + bw, by + bh],
        radius=8, fill=(*cat_color, 220)
    )
    img.alpha_composite(overlay)

    draw.text((bx + padding_x, by + padding_y - bbox[1]), category,
              font=fnt, fill=COLOR_WHITE)
    return by + bh + 30


def generate_thumbnail(title, category, output_path):
    # ベース画像（RGBA）
    img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)

    # 背景グラデーション
    draw_gradient_bg(draw)

    # グリッド線
    draw_grid_lines(draw)

    # ボウリング装飾
    img = draw_bowling_decoration(img, draw)

    # アクセントバー（左端）
    draw = ImageDraw.Draw(img)
    draw_accent_bar(draw)

    # カテゴリーカラー取得
    cat_color = CATEGORY_COLORS.get(category, COLOR_ACCENT)

    # カテゴリーバッジ
    text_y = draw_category_badge(img, draw, category, cat_color)

    # タイトルテキスト
    try:
        fnt_title = ImageFont.truetype(FONT_BOLD, 54)
        fnt_title_sm = ImageFont.truetype(FONT_BOLD, 44)
    except:
        fnt_title = fnt_title_sm = ImageFont.load_default()

    max_text_w = 700
    lines = wrap_text(title, fnt_title, max_text_w)

    # 3行以上になる場合はフォントを小さく
    if len(lines) > 3:
        lines = wrap_text(title, fnt_title_sm, max_text_w)
        fnt_title = fnt_title_sm

    line_h = 70
    total_text_h = len(lines) * line_h
    text_start_y = max(text_y, (H - total_text_h) // 2 - 20)

    draw = ImageDraw.Draw(img)
    for i, line in enumerate(lines):
        ty = text_start_y + i * line_h
        # テキストシャドウ
        draw.text((62, ty + 3), line, font=fnt_title,
                  fill=(0, 0, 0, 120))
        draw.text((60, ty), line, font=fnt_title, fill=COLOR_WHITE)

    # アンダーライン（タイトル下）
    underline_y = text_start_y + total_text_h + 20
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.rectangle(
        [60, underline_y, 60 + min(400, max_text_w), underline_y + 3],
        fill=(*cat_color, 200)
    )
    img.alpha_composite(overlay)

    # ブランド名（左下）
    try:
        fnt_brand = ImageFont.truetype(FONT_MEDIUM, 28)
        fnt_brand_sub = ImageFont.truetype(FONT_LIGHT, 20)
    except:
        fnt_brand = fnt_brand_sub = ImageFont.load_default()

    draw = ImageDraw.Draw(img)
    brand_y = H - 80
    draw.text((60, brand_y), "BowlingNavi", font=fnt_brand,
              fill=COLOR_ACCENT2)
    draw.text((60, brand_y + 34), "ボウナビ｜ボウリング情報メディア",
              font=fnt_brand_sub, fill=COLOR_GRAY)

    # 区切り線（ブランド上）
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.line([(60, brand_y - 20), (W - 60, brand_y - 20)],
                 fill=(255, 255, 255, 30), width=1)
    img.alpha_composite(overlay)

    # RGBAをRGBに変換して保存
    final = img.convert("RGB")
    final.save(output_path, "PNG", quality=95)
    print(f"✅ サムネイル生成完了: {output_path}")
    return output_path


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("使い方: python3 generate_thumbnail.py 'タイトル' 'カテゴリー' output.png")
        sys.exit(1)

    title = sys.argv[1]
    category = sys.argv[2]
    output = sys.argv[3]
    generate_thumbnail(title, category, output)
