/**
 * WordPress REST API クライアント
 * cms.bowlingnavi.com からコラム記事を取得する
 */

const WP_API_URL = process.env.WORDPRESS_API_URL || "http://cms.bowlingnavi.com/wp-json/wp/v2";

// --- WordPress API レスポンス型 ---

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    modified: string;
    featured_media: number;
    categories: number[];
    tags: number[];
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            alt_text: string;
            media_details?: {
                sizes?: {
                    full?: { source_url: string };
                    large?: { source_url: string };
                    medium?: { source_url: string };
                };
            };
        }>;
        "wp:term"?: Array<Array<{
            id: number;
            name: string;
            slug: string;
        }>>;
    };
}

export interface WPCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
    description: string;
}

// --- 内部表現の型 ---

export interface WPArticle {
    id: string;         // slug をIDとして使用
    title: string;
    excerpt: string;
    content: string;    // HTML
    category: string;   // カテゴリースラッグ
    categoryName: string;
    publishedAt: string;
    thumbnailUrl: string;
}

export interface WPPostsResponse {
    posts: WPArticle[];
    totalPages: number;
    totalItems: number;
}

// --- ヘルパー関数 ---

/** HTMLタグを除去してプレーンテキストにする */
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

/** WPPostをWPArticleに変換 */
function mapPost(post: WPPost): WPArticle {
    // アイキャッチ画像のURL取得
    let thumbnailUrl = "";
    if (post._embedded?.["wp:featuredmedia"]?.[0]) {
        const media = post._embedded["wp:featuredmedia"][0];
        thumbnailUrl =
            media.media_details?.sizes?.large?.source_url ||
            media.media_details?.sizes?.full?.source_url ||
            media.source_url ||
            "";
    }

    // カテゴリー情報取得
    let category = "uncategorized";
    let categoryName = "未分類";
    if (post._embedded?.["wp:term"]?.[0]?.[0]) {
        const term = post._embedded["wp:term"][0][0];
        category = term.slug;
        categoryName = term.name;
    }

    return {
        id: post.slug,
        title: post.title.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        content: post.content.rendered,
        category,
        categoryName,
        publishedAt: post.date,
        thumbnailUrl,
    };
}

// --- API 関数 ---

/**
 * 記事一覧を取得
 */
export async function getWPPosts(options?: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
}): Promise<WPPostsResponse> {
    const { page = 1, perPage = 9, categorySlug } = options || {};

    const params = new URLSearchParams({
        _embed: "true",
        per_page: perPage.toString(),
        page: page.toString(),
        orderby: "date",
        order: "desc",
    });

    // カテゴリースラッグで絞り込む場合、先にカテゴリーIDを取得
    if (categorySlug) {
        const catId = await getCategoryIdBySlug(categorySlug);
        if (catId) {
            params.set("categories", catId.toString());
        } else {
            // カテゴリーが見つからない場合、空の結果を返す
            return { posts: [], totalPages: 0, totalItems: 0 };
        }
    }

    try {
        const res = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
            next: { revalidate: 60 }, // ISR: 1分間キャッシュ
        });

        if (!res.ok) {
            // 400エラー（ページ範囲外など）は空結果として扱う
            if (res.status === 400) {
                return { posts: [], totalPages: 0, totalItems: 0 };
            }
            console.error(`WordPress API error: ${res.status} ${res.statusText}`);
            return { posts: [], totalPages: 0, totalItems: 0 };
        }

        const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        const totalItems = parseInt(res.headers.get("X-WP-Total") || "0", 10);
        const data: WPPost[] = await res.json();

        return {
            posts: data.map(mapPost),
            totalPages,
            totalItems,
        };
    } catch (error) {
        console.error("Failed to fetch WordPress posts:", error);
        return { posts: [], totalPages: 0, totalItems: 0 };
    }
}

/**
 * スラッグで個別記事を取得
 */
export async function getWPPostBySlug(slug: string): Promise<WPArticle | null> {
    try {
        const params = new URLSearchParams({
            _embed: "true",
            slug,
        });

        const res = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error(`WordPress API error: ${res.status}`);
            return null;
        }

        const data: WPPost[] = await res.json();

        if (data.length === 0) {
            return null;
        }

        return mapPost(data[0]);
    } catch (error) {
        console.error("Failed to fetch WordPress post:", error);
        return null;
    }
}

/**
 * カテゴリー一覧を取得
 */
export async function getWPCategories(): Promise<WPCategory[]> {
    try {
        const res = await fetch(`${WP_API_URL}/categories?per_page=100&hide_empty=true`, {
            next: { revalidate: 300 }, // 5分間キャッシュ
        });

        if (!res.ok) {
            return [];
        }

        const data: WPCategory[] = await res.json();
        // 「未分類」は除外
        return data.filter((cat) => cat.slug !== "uncategorized");
    } catch (error) {
        console.error("Failed to fetch WordPress categories:", error);
        return [];
    }
}

/**
 * カテゴリースラッグからIDを取得
 */
async function getCategoryIdBySlug(slug: string): Promise<number | null> {
    try {
        const res = await fetch(`${WP_API_URL}/categories?slug=${slug}`, {
            next: { revalidate: 300 },
        });

        if (!res.ok) return null;

        const data: WPCategory[] = await res.json();
        return data.length > 0 ? data[0].id : null;
    } catch {
        return null;
    }
}
