import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description: "BowlingNaviのプライバシーポリシー。個人情報の取り扱いについて。",
};

export default function PrivacyPage() {
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
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">プライバシーポリシー</h1>
                        <p className="text-slate-400">
                            BowlingNavi（以下「当サイト」）における個人情報の取り扱いについて定めます。
                        </p>
                    </div>

                    <div className="space-y-8 text-slate-300">
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                1. 収集する情報
                            </h2>
                            <p className="mb-2 leading-relaxed">
                                当サイトでは、以下の情報を取得する場合があります。
                            </p>
                            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                                <li>お問い合わせフォームに入力された氏名・メールアドレス等</li>
                                <li>大会エントリーフォームに入力された選手情報</li>
                                <li>アクセス解析ツールにより自動的に収集される情報（IPアドレス、ブラウザの種類、閲覧ページ等）</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                2. 利用目的
                            </h2>
                            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                                <li>お問い合わせへの回答・対応</li>
                                <li>大会エントリーの受付・連絡</li>
                                <li>当サイトの利用状況の分析・改善</li>
                                <li>重要なお知らせの通知</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                3. アクセス解析ツール（Google Analytics）
                            </h2>
                            <p className="leading-relaxed">
                                当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
                                Google Analyticsはデータの収集のためにCookieを使用しています。
                                このデータは匿名で収集されており、個人を特定するものではありません。
                                この機能はCookieを無効にすることで拒否できますので、お使いのブラウザの設定をご確認ください。
                                詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Google Analyticsの利用規約</a>をご覧ください。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                4. 第三者への開示
                            </h2>
                            <p className="mb-2 leading-relaxed">
                                取得した個人情報は、以下の場合を除き第三者に開示・提供することはありません。
                            </p>
                            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                                <li>ご本人の同意がある場合</li>
                                <li>法令に基づく場合</li>
                                <li>大会主催者へのエントリー情報の共有（申込時に同意いただいた場合）</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                5. アフィリエイトプログラム
                            </h2>
                            <p className="leading-relaxed">
                                当サイトは、もしもアフィリエイト等のアフィリエイトプログラムに参加しています。
                                記事内の商品リンクを通じて商品が購入された場合、当サイトに紹介手数料が支払われることがあります。
                                商品の価格や評価には一切影響ありません。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <Shield className="size-5 text-blue-500" />
                                6. ポリシーの変更
                            </h2>
                            <p className="leading-relaxed">
                                当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、当サイトに掲載した時点から効力を生じるものとします。
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
