import { MOCK_ARTICLES } from "@/data/mockArticles";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

export default function ColumnsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">コラム・記事</h1>
                <p className="text-slate-400">ボウリングの上達法や大会レポート、用品選びのガイドなどをお届けします。</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_ARTICLES.map((article) => (
                    <Link key={article.id} href={`/columns/${article.id}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 transition-all hover:border-blue-500/50 hover:bg-slate-900">
                        <div className="aspect-video w-full bg-slate-800 object-cover overflow-hidden">
                            {article.thumbnailUrl ? (
                                <img
                                    src={article.thumbnailUrl}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-600">
                                    <span className="text-4xl">📷</span>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-blue-400">
                                    <Tag className="size-3" />
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="size-3" />
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400">
                                {article.title}
                            </h2>
                            <p className="line-clamp-3 text-sm text-slate-400">
                                {article.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
