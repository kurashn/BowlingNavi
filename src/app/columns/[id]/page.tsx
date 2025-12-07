import { MOCK_ARTICLES } from "@/data/mockArticles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ColumnDetailPage({ params }: PageProps) {
    const { id } = await params;
    const article = MOCK_ARTICLES.find((a) => a.id === id);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <Link href="/columns" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                <ArrowLeft className="size-4" />
                一覧に戻る
            </Link>

            <article>
                <header className="mb-8">
                    <div className="mb-4 flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-blue-400">
                            <Tag className="size-4" />
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                        {article.title}
                    </h1>
                </header>

                <div className="prose prose-invert max-w-none">
                    {/* Ideally use a markdown parser or sanitize HTML here */}
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </article>
        </div>
    );
}
