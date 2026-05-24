import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function LegalPage() {
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
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">特定商取引法に基づく表記</h1>
                        <p className="text-slate-400">
                            当サイトが提供するサービスに関する取引条件等を表示しています。
                        </p>
                    </div>

                    <div className="space-y-8 text-slate-300">
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                運営事業者の名称
                            </h2>
                            <p className="leading-relaxed">
                                【公開前に貴社の正式名称・屋号を入力してください】<br />
                                例：株式会社BowlingNavi
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                運営責任者
                            </h2>
                            <p className="leading-relaxed">
                                【公開前に代表者名・運営責任者名を入力してください】<br />
                                例：山田 太郎
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                本社所在地
                            </h2>
                            <p className="leading-relaxed">
                                【公開前に住所を入力してください】<br />
                                〒000-0000<br />
                                東京都〇〇区〇〇1-2-3 〇〇ビル1F
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                お問い合わせ窓口
                            </h2>
                            <p className="leading-relaxed">
                                電話番号：【03-0000-0000】（平日 10:00〜18:00）<br />
                                メールアドレス：【info@example.com】<br />
                                ※お取引やサービスに関するお問い合わせは、上記またはお問い合わせフォームよりご連絡ください。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                サービス等の対価（販売価格）
                            </h2>
                            <p className="leading-relaxed">
                                各サービス・広告掲載プランのご案内ページ、またはお見積り書にて表示する価格（消費税込）とします。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                対価以外に必要となる費用
                            </h2>
                            <p className="leading-relaxed">
                                インターネット接続料金、通信料金等はお客様のご負担となります。<br />
                                （お支払いに伴う振込手数料はお客様のご負担となります。）
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                支払方法および支払の時期
                            </h2>
                            <p className="leading-relaxed">
                                支払方法：銀行振込、クレジットカード決済<br />
                                支払時期：各サービス契約時、または請求書に記載の期日までにお支払いください。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                サービスの提供時期
                            </h2>
                            <p className="leading-relaxed">
                                当社にて入金確認後、または契約締結後、各サービスで定められた日程に提供・掲載を開始いたします。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                返品・キャンセルに関する特約
                            </h2>
                            <p className="leading-relaxed">
                                提供するサービスの性質上、掲載開始後またはサービス提供後の返金・キャンセルは原則としてお受けできません。解約に関する詳細は、各利用規約またはご契約書の内容に準じます。
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
