import Link from "next/link";
import { ArrowLeft, HelpCircle, Mail, ChevronRight, CheckCircle2, MessageSquare } from "lucide-react";

export const metadata = {
    title: 'ヘルプセンター（よくある質問） | BowlingNavi -ボウナビ-',
    description: 'BowlingNavi（ボウナビ）に関するよくある質問と回答をまとめています。大会のエントリー方法や主催者様向けの掲載方法などについてはこちらをご確認ください。',
};

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            
            {/* Hero Section (Premium Dark Mode Style) */}
            <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#020d20]">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(43,135,255,0.15),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(41,210,243,0.1),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020d20]/50 to-slate-50"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        トップページに戻る
                    </Link>

                    <div className="text-center max-w-2xl mx-auto">
                        <div className="mb-4 flex justify-center">
                            <span className="rounded-full bg-blue-600/20 px-4 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                                <HelpCircle className="size-3.5" />
                                FAQ / HELP
                            </span>
                        </div>
                        <h1 className="mb-6 text-3xl font-black text-white md:text-5xl tracking-tight">
                            ヘルプセンター
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            BowlingNaviに関するよくある質問と回答をまとめました。<br className="hidden sm:block" />
                            解決しない場合は、ページ下部よりお気軽にお問い合わせください。
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 max-w-4xl -mt-16 relative z-20">
                <div className="space-y-12">
                    
                    {/* Section 1: 一般ユーザー向け */}
                    <section>
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <MessageSquare className="size-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">大会の参加・検索について</h2>
                        </div>
                        
                        <div className="space-y-6">
                            {/* FAQ Item */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="bg-blue-50/50 p-6 md:px-8 md:py-6 border-b border-slate-100 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        Q
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1 leading-snug">
                                        大会へのエントリー（申し込み）方法は？
                                    </h3>
                                </div>
                                <div className="p-6 md:p-8 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        A
                                    </div>
                                    <div className="text-slate-700 leading-loose md:text-lg">
                                        各大会の詳細ページにある「公式サイトでエントリー」等のボタンから、主催者様の公式ページへ移動して直接お手続きを行ってください。<br className="hidden md:block" />
                                        BowlingNaviサイト内での直接エントリーや決済機能は設けておりません。
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Item */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="bg-blue-50/50 p-6 md:px-8 md:py-6 border-b border-slate-100 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        Q
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1 leading-snug">
                                        初心者でも参加できる大会はありますか？
                                    </h3>
                                </div>
                                <div className="p-6 md:p-8 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        A
                                    </div>
                                    <div className="text-slate-700 leading-loose md:text-lg">
                                        はい、多数ございます。<br className="hidden md:block" />
                                        「大会一覧」ページにて、「アマチュア」向けのタグがついている大会を探してみてください。また、「初心者ガイド」のコラム記事でも、初めて大会に参加する方向けのアドバイスを掲載しています。
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Item */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="bg-blue-50/50 p-6 md:px-8 md:py-6 border-b border-slate-100 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        Q
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1 leading-snug">
                                        掲載されている情報は常に最新で正確ですか？
                                    </h3>
                                </div>
                                <div className="p-6 md:p-8 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        A
                                    </div>
                                    <div className="text-slate-700 leading-loose md:text-lg">
                                        可能な限り正確な情報を掲載するよう努めていますが、主催者様の都合（悪天候など）により急遽日程や参加費が変更される場合がございます。<br />
                                        <span className="font-bold text-red-600">ご参加の前には、必ず主催者の公式サイトや公式SNS等で最新情報をご確認ください。</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: 主催者様向け */}
                    <section>
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="size-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">大会主催者様向け</h2>
                        </div>
                        
                        <div className="space-y-6">
                            {/* FAQ Item */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="bg-blue-50/50 p-6 md:px-8 md:py-6 border-b border-slate-100 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        Q
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1 leading-snug">
                                        大会情報を掲載するのに費用はかかりますか？
                                    </h3>
                                </div>
                                <div className="p-6 md:p-8 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        A
                                    </div>
                                    <div className="text-slate-700 leading-loose md:text-lg">
                                        いいえ、初期費用・月額費用ともに<strong className="text-slate-900 bg-yellow-200 px-1.5 py-0.5 rounded">「完全無料」</strong>でご掲載いただけます。<br className="hidden md:block" />
                                        関西のボウリングを盛り上げる目的で運営しているため、掲載料をいただくことは一切ございません。
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Item */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="bg-blue-50/50 p-6 md:px-8 md:py-6 border-b border-slate-100 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        Q
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1 leading-snug">
                                        どのようにして掲載申請を行えばよいですか？
                                    </h3>
                                </div>
                                <div className="p-6 md:p-8 flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                                        A
                                    </div>
                                    <div className="text-slate-700 leading-loose md:text-lg">
                                        <p className="mb-4">
                                            上部メニューの「掲載のご案内」ページ内にある「無料掲載を申し込む」ボタンより、専用のGoogleフォームへお進みいただき、必要事項をご入力ください。
                                        </p>
                                        <Link href="/organizers" className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                            掲載のご案内ページへ
                                            <ChevronRight className="size-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <div className="mt-16 rounded-3xl bg-blue-50 border border-blue-100 p-8 md:p-12 text-center">
                        <h3 className="mb-4 text-2xl font-black text-blue-900">まだ疑問が解決しませんか？</h3>
                        <p className="mb-8 text-blue-800/80 text-lg leading-relaxed font-medium">
                            その他のご質問やご要望、サイトへのフィードバックなどがございましたら、<br className="hidden sm:block" />
                            お問い合わせフォームよりお気軽にご連絡ください。
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 shadow-md"
                        >
                            <Mail className="size-5" />
                            お問い合わせフォームへ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
