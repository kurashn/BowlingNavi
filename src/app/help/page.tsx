import Link from "next/link";
import { ArrowLeft, HelpCircle, Mail, ChevronRight, CheckCircle2, MessageSquare } from "lucide-react";

export const metadata = {
    title: 'ヘルプセンター（よくある質問） | BowlingNavi -ボウナビ-',
    description: 'BowlingNavi（ボウナビ）に関するよくある質問と回答をまとめています。大会のエントリー方法や主催者様向けの掲載方法などについてはこちらをご確認ください。',
};

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        トップページに戻る
                    </Link>
                </div>

                <div className="mx-auto max-w-3xl">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">ヘルプセンター</h1>
                        <p className="text-slate-400">
                            BowlingNaviに関するよくある質問と回答をまとめました。<br className="hidden sm:block" />
                            解決しない場合は、ページ下部よりお気軽にお問い合わせください。
                        </p>
                    </div>

                    <div className="space-y-12 text-slate-300">
                        {/* Section 1: 一般ユーザー向け */}
                        <section>
                            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
                                <MessageSquare className="size-6 text-blue-500" />
                                大会の参加・検索について
                            </h2>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-white">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">Q</span>
                                        大会へのエントリー（申し込み）方法は？
                                    </h3>
                                    <div className="flex items-start gap-3 pl-10">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">A</span>
                                        <p className="leading-relaxed text-slate-300">
                                            各大会の詳細ページにある「公式サイトでエントリー」等のボタンから、主催者様の公式ページへ移動して直接お手続きを行ってください。<br />
                                            BowlingNaviサイト内での直接エントリーや決済機能は設けておりません。
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-white">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">Q</span>
                                        初心者でも参加できる大会はありますか？
                                    </h3>
                                    <div className="flex items-start gap-3 pl-10">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">A</span>
                                        <p className="leading-relaxed text-slate-300">
                                            はい、多数ございます。<br />
                                            「大会一覧」ページにて、「アマチュア」向けのタグがついている大会を探してみてください。また、「初心者ガイド」のコラム記事でも、初めて大会に参加する方向けのアドバイスを掲載しています。
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-white">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">Q</span>
                                        掲載されている情報は常に最新で正確ですか？
                                    </h3>
                                    <div className="flex items-start gap-3 pl-10">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">A</span>
                                        <p className="leading-relaxed text-slate-300">
                                            可能な限り正確な情報を掲載するよう努めていますが、主催者様の都合（悪天候など）により急遽日程や参加費が変更される場合がございます。<br />
                                            <span className="font-bold text-red-400">ご参加の前には、必ず主催者の公式サイトや公式SNS等で最新情報をご確認ください。</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: 主催者様向け */}
                        <section>
                            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
                                <CheckCircle2 className="size-6 text-green-500" />
                                大会主催者様向け
                            </h2>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-white">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">Q</span>
                                        大会情報を掲載するのに費用はかかりますか？
                                    </h3>
                                    <div className="flex items-start gap-3 pl-10">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">A</span>
                                        <p className="leading-relaxed text-slate-300">
                                            いいえ、初期費用・月額費用ともに<strong className="text-slate-900 bg-yellow-400 px-1.5 py-0.5 rounded">「完全無料」</strong>でご掲載いただけます。<br />
                                            関西のボウリングを盛り上げる目的で運営しているため、掲載料をいただくことは一切ございません。
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-white">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">Q</span>
                                        どのようにして掲載申請を行えばよいですか？
                                    </h3>
                                    <div className="flex items-start gap-3 pl-10">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">A</span>
                                        <div className="leading-relaxed text-slate-300">
                                            <p className="mb-4">
                                                上部メニューの「掲載のご案内」ページ内にある「無料掲載を申し込む」ボタンより、専用のGoogleフォームへお進みいただき、必要事項をご入力ください。
                                            </p>
                                            <Link href="/organizers" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                                掲載のご案内ページへ
                                                <ChevronRight className="size-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact CTA */}
                        <div className="mt-16 rounded-2xl bg-slate-900 border border-slate-800 p-8 md:p-12 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-white">まだ疑問が解決しませんか？</h3>
                            <p className="mb-8 text-slate-400 leading-relaxed">
                                その他のご質問やご要望、サイトへのフィードバックなどがございましたら、<br className="hidden sm:block" />
                                お問い合わせフォームよりお気軽にご連絡ください。
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 shadow-md"
                            >
                                <Mail className="size-4" />
                                お問い合わせフォームへ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
