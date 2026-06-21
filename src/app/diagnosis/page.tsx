import DiagnosisTool from "@/components/DiagnosisTool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "あなたにぴったりの道具は？ボウリングレベル診断ツール | BowlingNavi",
    description: "たった1分で結果がわかる！あなたの平均スコアや目的に合わせて、最適なボウリング用品（シューズ・マイボール・小物）を診断します。",
    openGraph: {
        title: "あなたにぴったりの道具は？ボウリングレベル診断ツール",
        description: "たった1分で結果がわかる！あなたの平均スコアや目的に合わせて、最適なボウリング用品を診断します。",
        type: "website",
    },
};

export default function DiagnosisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 text-slate-800">
            {/* Header Section */}
            <div className="pt-24 pb-8 lg:pt-32 lg:pb-12">
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-medium text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-slate-800">ボウリングレベル診断</span>
                    </nav>

                    {/* Emoji Icon */}
                    <div className="text-5xl md:text-6xl mb-5">🎳</div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-5 tracking-tight leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            ボウリング道具診断
                        </span>
                    </h1>

                    <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        2〜3問の質問に答えるだけで、あなたに
                        <br className="sm:hidden" />
                        いま一番必要なアイテムがわかります。
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            たった1分で完了
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            完全無料
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            登録不要
                        </span>
                    </div>
                </div>
            </div>

            {/* Tool Section */}
            <div className="container mx-auto px-4">
                <DiagnosisTool />

                {/* Back Link */}
                <div className="mt-20 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-bold shadow-sm"
                    >
                        <ArrowLeft className="size-4" />
                        トップページに戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
