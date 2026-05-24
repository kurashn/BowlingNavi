import { ArrowLeft, ArrowRight, Send, TrendingUp, Users, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "大会主催者様へ（掲載のご案内）",
    description: "BowlingNaviへの大会情報掲載をご希望の方はこちら。無料で関西の多くのボウラーに大会をアピールできます。",
};

export default function OrganizersPage() {
    return (
        <div className="min-h-screen bg-[#020813] selection:bg-[#3b69ff] selection:text-white pb-24">
            {/* Premium Animated Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,105,255,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(227,53,215,0.05),transparent_40%)] mix-blend-screen pointer-events-none z-0 fixed"></div>

            <div className="container relative z-10 mx-auto px-4 py-12 md:py-20 max-w-5xl">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white group"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        トップページに戻る
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-20 relative">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                        <Sparkles className="size-4" />
                        無料で大会情報を掲載できます
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 mb-6 tracking-tight leading-tight">
                        あなたのボウリング大会を<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">もっと多くのボウラーに。</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        BowlingNavi（ボウナビ）は、関西エリアのボウリング大会情報を網羅するポータルサイトです。
                        当サイトに掲載することで、新規参加者の獲得や大会の認知度アップに貢献します。
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
                    <div className="bg-[#061124]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users className="size-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">幅広い層へアピール</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            プロチャレンジからアマチュア大会、初心者向けイベントまで。ボウリングに関心のあるユーザーが直接サイトに訪れるため、ターゲット層へ確実に情報が届きます。
                        </p>
                    </div>

                    <div className="bg-[#061124]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="size-7 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">掲載費用は完全無料</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            ポータルサイトへの大会情報の掲載・更新は、すべて無料でご利用いただけます。初期費用や月額料金などのコストは一切かかりません。
                        </p>
                    </div>

                    <div className="bg-[#061124]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp className="size-7 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">SEOによる集客効果</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            「地域名＋ボウリング大会」などのキーワードで検索エンジンに最適化。各ボウリング場の公式HPに加えて、さらなる集客の柱として活用できます。
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-b from-[#0a1936] to-[#020813] p-10 md:p-16 text-center shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    
                    <h2 className="mb-6 text-2xl md:text-3xl font-bold text-white">
                        今すぐ大会情報を掲載申請する
                    </h2>
                    <p className="mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        以下の申請フォームより必要事項（大会名、日時、場所、参加費など）をご記入の上、送信してください。内容を確認後、担当者がサイトに掲載させていただきます。
                    </p>
                    
                    <a
                        href="https://forms.gle/h6BXp1y7UVzmxGjRA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-5 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,105,255,0.4)] relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <Send className="size-5 relative z-10" />
                        <span className="relative z-10">Googleフォームで申請する</span>
                        <ArrowRight className="size-5 relative z-10 transition-transform group-hover:translate-x-1" />
                    </a>
                    
                    <p className="mt-6 text-xs text-slate-500">
                        ※クリックすると外部サイト（Googleフォーム）へ移動します。
                    </p>
                </div>
            </div>
        </div>
    );
}
