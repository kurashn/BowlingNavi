import Link from "next/link";
import { ArrowLeft, HelpCircle, Mail } from "lucide-react";

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
                            よくある質問と回答をまとめました。
                            解決しない場合は、お気軽にお問い合わせください。
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* FAQ Item 1 */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                            <h3 className="mb-3 flex items-start gap-3 text-lg font-bold text-white">
                                <HelpCircle className="mt-1 size-5 shrink-0 text-blue-500" />
                                大会への申し込み方法は？
                            </h3>
                            <p className="pl-8 text-slate-400">
                                各大会の詳細ページにある「申し込む」ボタンから、主催者の申し込みページへ移動して手続きを行ってください。
                                「詳細を見る」ボタンが表示されている場合は、リンク先の公式サイト等でご確認ください。
                            </p>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                            <h3 className="mb-3 flex items-start gap-3 text-lg font-bold text-white">
                                <HelpCircle className="mt-1 size-5 shrink-0 text-blue-500" />
                                掲載されている情報は正確ですか？
                            </h3>
                            <p className="pl-8 text-slate-400">
                                可能な限り正確な情報を掲載するよう努めていますが、主催者の都合により変更される場合があります。
                                必ず主催者の公式サイトや公式SNSで最新情報をご確認ください。
                            </p>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                            <h3 className="mb-3 flex items-start gap-3 text-lg font-bold text-white">
                                <HelpCircle className="mt-1 size-5 shrink-0 text-blue-500" />
                                大会情報を掲載したいのですが。
                            </h3>
                            <p className="pl-8 text-slate-400">
                                フッターの「大会情報の掲載申請はこちら」リンクから申請フォームへ移動し、必要事項をご記入の上、送信してください。
                                審査の上、掲載させていただきます。
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 text-center">
                        <h3 className="mb-4 text-xl font-bold text-white">まだ解決しませんか？</h3>
                        <p className="mb-6 text-slate-300">
                            その他のご質問やご要望は、お問い合わせフォームよりご連絡ください。
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-900 transition-colors hover:bg-blue-50"
                        >
                            <Mail className="size-4" />
                            お問い合わせ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
