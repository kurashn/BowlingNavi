import { MOCK_ARTICLES } from "@/data/mockArticles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, CheckCircle2, Quote } from "lucide-react";

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
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section with Gradient Background */}
            <div className="relative bg-slate-900 pt-24 pb-32 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 h-[1000px] w-[1000px] rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/2 h-[1000px] w-[1000px] rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-4xl px-4 relative z-10">
                    <Link href="/columns" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white group">
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        記事一覧に戻る
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                        <span className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-4 py-1.5 text-blue-400 ring-1 ring-blue-500/20 font-medium">
                            <Tag className="size-3.5" />
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="size-3.5" />
                            {new Date(article.publishedAt).toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-[1.15]">
                        <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            {article.title}
                        </span>
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto max-w-3xl px-4 -mt-20 relative z-20">
                <article className="rounded-2xl bg-white p-6 md:p-12 shadow-xl ring-1 ring-slate-900/5">

                    {/* Thumbnail Image */}
                    {article.thumbnailUrl && (
                        <div className="mb-10 -mx-6 md:-mx-12 -mt-6 md:-mt-12 overflow-hidden rounded-t-2xl">
                            <img
                                src={article.thumbnailUrl}
                                alt={article.title}
                                className="w-full h-auto object-cover aspect-video"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-24
                        
                        /* H2 Styling */
                        prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200
                        prose-h2:relative prose-h2:pl-4
                        prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-0 prose-h2:before:bottom-4 prose-h2:before:w-1 prose-h2:before:bg-gradient-to-b prose-h2:before:from-blue-500 prose-h2:before:to-cyan-500 prose-h2:before:rounded-full
                        
                        /* H3 Styling */
                        prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800
                        prose-h3:border-l-4 prose-h3:border-blue-500 prose-h3:pl-4 prose-h3:bg-slate-50 prose-h3:py-2 prose-h3:rounded-r-lg
                        prose-h3:before:content-none
                        
                        /* Paragraphs */
                        prose-p:leading-8 prose-p:text-slate-600 prose-p:mb-6
                        
                        /* Links */
                        prose-a:text-blue-600 prose-a:underline prose-a:decoration-blue-600/30 prose-a:underline-offset-4 prose-a:font-medium prose-a:transition-all 
                        hover:prose-a:text-blue-700 hover:prose-a:decoration-blue-700
                        prose-a:after:content-['↗'] prose-a:after:inline-block prose-a:after:ml-1 prose-a:after:text-xs prose-a:after:opacity-70
                        
                        /* Strong/Bold (Standard) */
                        prose-strong:font-bold prose-strong:text-slate-900
                        
                        /* Mark (Highlighter) */
                        [&_mark]:bg-cyan-100 [&_mark]:text-slate-900 [&_mark]:px-1 [&_mark]:rounded [&_mark]:font-bold [&_mark]:box-decoration-clone
                        
                        /* Lists */
                        prose-li:text-slate-600
                        
                        /* Unordered Lists (UL) */
                        prose-ul:my-8 prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2
                        [&_ul>li]:relative [&_ul>li]:pl-7
                        [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-3 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-blue-500
                        
                        /* Ordered Lists (OL) */
                        prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                        [&_ol>li]:pl-2
                        [&_ol>li::marker]:font-bold [&_ol>li::marker]:text-blue-500
                        
                        /* Tables */
                        prose-table:my-10 prose-table:w-full prose-table:border-separate prose-table:border-spacing-0 prose-table:rounded-lg prose-table:overflow-hidden prose-table:ring-1 prose-table:ring-slate-200
                        prose-th:bg-slate-50 prose-th:p-4 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 prose-th:border-b prose-th:border-slate-200
                        prose-td:p-4 prose-td:text-slate-600 prose-td:border-b prose-td:border-slate-100 prose-td:bg-white
                        prose-tr:last:child:prose-td:border-b-0
                        
                        /* Blockquotes (Editor's Comment) */
                        prose-blockquote:not-italic prose-blockquote:my-10 prose-blockquote:rounded-xl prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                        prose-blockquote:relative prose-blockquote:text-slate-700
                        
                        /* HR */
                        prose-hr:my-16 prose-hr:border-slate-200
                        
                        /* Custom Button Links (Amazon etc) */
                        [&_a[target='_blank']]:no-underline [&_a[target='_blank']]:decoration-0 [&_a[target='_blank']]:after:content-none
                        [&_a[target='_blank']]:inline-flex [&_a[target='_blank']]:items-center [&_a[target='_blank']]:justify-center [&_a[target='_blank']]:w-full [&_a[target='_blank']]:md:w-auto
                        [&_a[target='_blank']]:rounded-full [&_a[target='_blank']]:bg-gradient-to-r [&_a[target='_blank']]:from-orange-500 [&_a[target='_blank']]:to-yellow-500 
                        [&_a[target='_blank']]:px-8 [&_a[target='_blank']]:py-4 [&_a[target='_blank']]:font-bold [&_a[target='_blank']]:text-white 
                        [&_a[target='_blank']]:shadow-lg [&_a[target='_blank']]:shadow-orange-500/30 
                        [&_a[target='_blank']]:transition-all hover:[&_a[target='_blank']]:translate-y-[-2px] hover:[&_a[target='_blank']]:shadow-orange-500/50 hover:[&_a[target='_blank']]:brightness-110
                        
                        /* Shopping Cart Icon */
                        [&_a[target='_blank']]:before:content-[''] [&_a[target='_blank']]:before:mr-2 [&_a[target='_blank']]:before:size-5 
                        [&_a[target='_blank']]:before:bg-[url('https://api.iconify.design/lucide/shopping-cart.svg?color=white')] [&_a[target='_blank']]:before:bg-no-repeat [&_a[target='_blank']]:before:bg-contain
                        
                        /* Images */
                        prose-img:rounded-xl prose-img:shadow-lg prose-img:ring-1 prose-img:ring-slate-900/5
                    ">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                </article>
            </div>
        </div>
    );
}

