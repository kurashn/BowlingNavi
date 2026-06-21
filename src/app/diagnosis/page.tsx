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
        <div className="min-h-screen bg-slate-50 pb-20 text-slate-800">
            {/* Header Section */}
            <div className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-slate-50">
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-medium text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-slate-800">ボウリングレベル診断</span>
                    </nav>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        1分でわかる！<br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            ボウリング道具診断
                        </span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        「シューズとボール、どっちから買えばいいの？」<br />
                        あなたの平均スコアと目的に合わせて、いま一番必要なアイテムを診断します！
                    </p>
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
