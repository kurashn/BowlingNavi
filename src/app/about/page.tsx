import { ArrowRight, Trophy, Users, Search, Calendar } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <div className="relative border-b border-white/10 bg-slate-900 py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20" />
                <div className="container relative mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                        ボウリングの未来を、<br className="md:hidden" />ここから。
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
                        BowlingNaviは、関西エリアを中心としたボウリング大会情報が集まるプラットフォームです。
                        プロ・アマ問わず、情熱を持ったボウラーと大会をつなぎます。
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/tournaments"
                            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-105"
                        >
                            大会を探す
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-500">OUR MISSION</h2>
                        <h3 className="mb-8 text-3xl font-bold text-white md:text-4xl">
                            ボウリング界の<br />情報格差をなくす
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-400">
                            これまで、ボウリングの大会情報は各団体のホームページやSNSに散らばっていました。
                            「もっと簡単に大会を見つけたい」「新しい大会に挑戦したい」
                            そんなボウラーの声に応えるために、BowlingNaviは誕生しました。
                            私たちは、情報の力でボウリング界を活性化させ、
                            すべてのボウラーが輝ける機会を創出します。
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-slate-900/50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                            <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                <Search className="size-6" />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-white">簡単検索</h3>
                            <p className="text-slate-400">
                                エリア、日程、カテゴリー（プロ・アマ）など、
                                あなたの条件に合った大会を瞬時に見つけることができます。
                            </p>
                        </div>



                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10">
                            <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                                <Users className="size-6" />
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <h3 className="text-xl font-bold text-white">コミュニティ</h3>
                                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">実装予定</span>
                            </div>
                            <p className="text-slate-400">
                                大会結果の共有を通じて、
                                ボウラー同士のつながりを深めることができます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                        <div className="relative z-10">
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
                                さあ、次のステージへ
                            </h2>
                            <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
                                あなたにぴったりの大会が、きっと見つかります。
                                BowlingNaviで、新しい挑戦を始めましょう。
                            </p>
                            <Link
                                href="/tournaments"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:scale-105"
                            >
                                大会一覧を見る
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
