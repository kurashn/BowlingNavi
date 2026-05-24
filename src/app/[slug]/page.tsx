import { getWPPostBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ArticleContent from "@/components/ArticleContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getWPPostBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 text-slate-800">
            {/* Header Section */}
            <div className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-slate-50">
                <div className="container mx-auto max-w-4xl px-4">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                        <span className="text-slate-300">&gt;</span>
                        <Link href="/columns" className="hover:text-blue-600 transition-colors">コラム・記事</Link>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-slate-800">{article.title}</span>
                    </nav>

                    {/* Meta Info (Date, Category) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4 text-slate-800 font-bold">
                            <span className="text-lg tracking-wide">
                                {new Date(article.publishedAt).toLocaleDateString("ja-JP", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).replace(/\//g, '.')}
                            </span>
                            <span className="flex items-center px-4 py-1 bg-blue-500 text-white text-xs rounded-full shadow-sm">
                                {article.categoryName}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.5rem] lg:leading-[1.25] mb-12">
                        {article.title}
                    </h1>

                    {/* Supervisor Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4 shadow-sm w-full">
                        <div className="flex gap-5 sm:gap-6">
                            {/* Left: Avatar & Badge */}
                            <div className="flex flex-col items-center shrink-0">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[3px] border-[#D4AF37] p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <img src="/images/yamashita_hideto.jpg" alt="山下 秀人" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <span className="mt-2 px-3 py-0.5 bg-[#334155] text-white text-[11px] font-bold rounded">
                                    監修者
                                </span>
                            </div>
                            
                            {/* Right: Info */}
                            <div className="flex flex-col justify-center">
                                <Link href="/players/yamashita-shuto" className="flex items-center gap-1 group w-fit">
                                    <span className="text-lg sm:text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">山下 秀人</span>
                                    <ChevronRight className="size-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                </Link>
                                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                    日本プロボウリング協会（JPBA）公認プロボウラー。<br className="hidden sm:block" />常に進化を続けるストライカー。次世代のボウリング界を牽引する。
                                </p>
                                <Link href="/players/yamashita-shuto" className="text-xs text-slate-400 mt-2 hover:text-blue-600 transition-colors">
                                    ...続きを読む
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Writer Row */}
                    <div className="flex items-center gap-3 mb-12 pl-1">
                        <span className="px-3 py-1 bg-[#F1F5F9] border border-slate-200 text-slate-600 text-[11px] font-bold rounded">
                            編集/ライター
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                <img src="/images/bownavikun2.png" alt="ボウナビくん" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">ボウナビ編集部</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto max-w-3xl px-4">
                <article className="rounded-2xl bg-white p-6 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">

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

                    <div className="prose prose-lg prose-slate max-w-none text-slate-800
                        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-24
                        
                        /* H2 Styling */
                        prose-h2:mt-12 prose-h2:mb-6 prose-h2:py-4 prose-h2:px-5 prose-h2:bg-slate-50 prose-h2:border-l-[5px] prose-h2:border-blue-600 prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:font-bold prose-h2:rounded-r-sm
                        prose-h2:before:content-none prose-h2:border-b-0
                        
                        /* H3 Styling */
                        prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800
                        prose-h3:border-l-0 prose-h3:bg-transparent prose-h3:pl-0 prose-h3:border-b prose-h3:border-slate-200 prose-h3:pb-2
                        
                        /* Paragraphs */
                        prose-p:leading-[1.8] prose-p:text-slate-700 prose-p:mb-6
                        
                        /* Links */
                        prose-a:text-blue-600 prose-a:underline prose-a:decoration-blue-300 prose-a:underline-offset-4 prose-a:font-medium prose-a:transition-all 
                        hover:prose-a:text-cyan-600 hover:prose-a:decoration-cyan-400
                        
                        /* Strong/Bold */
                        prose-strong:font-bold prose-strong:text-slate-900
                        
                        /* Mark (Highlighter) */
                        [&_mark]:bg-cyan-100 [&_mark]:text-slate-900 [&_mark]:px-1 [&_mark]:rounded [&_mark]:font-bold
                        
                        /* Lists */
                        prose-li:text-slate-700 prose-li:leading-[1.8]
                        
                        /* Unordered Lists (UL) */
                        prose-ul:my-6 prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2
                        [&_ul>li]:relative [&_ul>li]:pl-6
                        [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-3 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-blue-500
                        
                        /* Ordered Lists (OL) */
                        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                        [&_ol>li]:pl-2
                        [&_ol>li::marker]:font-bold [&_ol>li::marker]:text-blue-600
                        
                        /* Tables */
                        prose-table:my-8 prose-table:w-full prose-table:border-separate prose-table:border-spacing-0 prose-table:rounded-lg prose-table:overflow-hidden prose-table:border prose-table:border-slate-200
                        prose-th:bg-slate-50 prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-slate-900 prose-th:border-b prose-th:border-slate-200
                        prose-td:p-4 prose-td:text-slate-700 prose-td:border-b prose-td:border-slate-100
                        prose-tr:last:child:prose-td:border-b-0
                        
                        /* Blockquotes */
                        prose-blockquote:not-italic prose-blockquote:my-8 prose-blockquote:rounded-r-xl prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                        prose-blockquote:text-slate-600
                        
                        /* HR */
                        prose-hr:my-12 prose-hr:border-slate-200
                        
                        /* Images */
                        prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-slate-100

                        /* WordPress Block Styles */
                        [&_.wp-block-image]:my-8
                        [&_.wp-block-image_img]:rounded-xl [&_.wp-block-image_img]:shadow-sm
                        [&_.wp-block-image_figcaption]:text-center [&_.wp-block-image_figcaption]:text-sm [&_.wp-block-image_figcaption]:text-slate-500 [&_.wp-block-image_figcaption]:mt-3
                    ">
                        <ArticleContent html={article.content} />
                    </div>
                </article>

                {/* Back to columns link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/columns"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-bold shadow-sm"
                    >
                        <ArrowLeft className="size-4" />
                        コラム一覧に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const article = await getWPPostBySlug(slug);

    if (!article) {
        return {
            title: "記事が見つかりません",
            description: "お探しの記事は見つかりませんでした。",
        };
    }

    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            url: `/${article.id}`,
            images: article.thumbnailUrl
                ? [{ url: article.thumbnailUrl, width: 1200, height: 630, alt: article.title }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: article.thumbnailUrl ? [article.thumbnailUrl] : [],
        },
    };
}
