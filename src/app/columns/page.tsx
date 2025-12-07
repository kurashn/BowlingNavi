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

            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 p-8 text-center">
                <div className="mb-4 rounded-full bg-slate-800 p-4">
                    <Calendar className="size-8 text-slate-400" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">記事を準備中</h2>
                <p className="text-slate-400">
                    現在、皆様に役立つ情報を執筆中です。<br />
                    公開まで今しばらくお待ちください。
                </p>
            </div>
            {/* 
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_ARTICLES.map((article) => (
                    <Link key={article.id} href={`/columns/${article.id}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 transition-all hover:border-blue-500/50 hover:bg-slate-900">
                        <div className="aspect-video w-full bg-slate-800 object-cover">
                            <div className="flex h-full w-full items-center justify-center text-slate-600">
                                <span className="text-4xl">📷</span>
                            </div>
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
            */}
        </div>
    );
}
