/* eslint-disable @next/next/no-img-element */
import { getWPPosts, getWPCategories } from "@/lib/wordpress";
import Link from "next/link";
import { Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface ColumnsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ITEMS_PER_PAGE = 9;

export default async function ColumnsPage({ searchParams }: ColumnsPageProps) {
    const params = await searchParams;
    const categoryQuery = typeof params.category === 'string' ? params.category : null;
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const currentPage = isNaN(page) || page < 1 ? 1 : page;

    // WordPress からデータ取得
    const [{ posts: displayArticles, totalPages }, categories] = await Promise.all([
        getWPPosts({
            page: currentPage,
            perPage: ITEMS_PER_PAGE,
            categorySlug: categoryQuery || undefined,
        }),
        getWPCategories(),
    ]);

    // カテゴリーマップを動的に生成
    const categoryMap: Record<string, string> = {};
    categories.forEach((cat) => {
        categoryMap[cat.slug] = cat.name;
    });

    const createPageUrl = (pageNum: number) => {
        const urlParams = new URLSearchParams();
        if (categoryQuery) urlParams.set("category", categoryQuery);
        if (pageNum > 1) urlParams.set("page", pageNum.toString());
        const queryString = urlParams.toString();
        return `/columns${queryString ? `?${queryString}` : ''}`;
    };

    return (
        <div className="relative min-h-screen bg-slate-50 pb-24 text-slate-800">
            <div className="container relative z-10 mx-auto px-4 py-8 md:py-16 max-w-6xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        {categoryQuery ? (categoryMap[categoryQuery] || categoryQuery) : 'コラム・記事'}
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base">
                        {categoryQuery 
                            ? `${categoryMap[categoryQuery] || categoryQuery}に関する役立つ情報をお届けします。`
                            : 'ボウリングの上達法や大会レポート、用品選びのガイドなどをお届けします。'
                        }
                    </p>
                </div>

                {/* Category Filters */}
                {categories.length > 0 && (
                    <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/columns"
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                                !categoryQuery
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm"
                            }`}
                        >
                            すべて
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/columns?category=${cat.slug}`}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                                    categoryQuery === cat.slug
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm"
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {displayArticles.map((article) => (
                        <Link key={article.id} href={`/${article.id}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-300">
                            <div className="aspect-video w-full bg-slate-100 object-cover overflow-hidden relative">
                                {article.thumbnailUrl ? (
                                    <img
                                        src={article.thumbnailUrl}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                        <span className="text-4xl">📷</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 p-6 md:p-8">
                                <div className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-wider text-slate-500">
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                                        <Tag className="size-3.5 text-blue-500" />
                                        {article.categoryName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5 text-slate-400" />
                                        {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                                    </span>
                                </div>
                                <h2 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                </h2>
                                <p className="line-clamp-3 text-sm text-slate-600 leading-relaxed mt-auto">
                                    {article.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-4">
                        {currentPage > 1 ? (
                            <Link href={createPageUrl(currentPage - 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-bold shadow-sm">
                                <ChevronLeft className="size-4" />
                                前へ
                            </Link>
                        ) : (
                            <span className="flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-300 text-sm font-bold cursor-not-allowed">
                                <ChevronLeft className="size-4" />
                                前へ
                            </span>
                        )}

                        <span className="text-sm font-bold text-slate-500">
                            {currentPage} / {totalPages}
                        </span>

                        {currentPage < totalPages ? (
                            <Link href={createPageUrl(currentPage + 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-bold shadow-sm">
                                次へ
                                <ChevronRight className="size-4" />
                            </Link>
                        ) : (
                            <span className="flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-300 text-sm font-bold cursor-not-allowed">
                                次へ
                                <ChevronRight className="size-4" />
                            </span>
                        )}
                    </div>
                )}

                {displayArticles.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <p className="text-lg font-bold mb-2">記事がまだありません</p>
                        <p className="text-sm">コンテンツが公開されるまでお待ちください。</p>
                    </div>
                )}
            </div>
        </div>
    );
}
