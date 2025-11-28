import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">利用規約</h1>
                        <p className="text-slate-400">
                            BowlingNaviをご利用いただく際のルールを定めています。
                        </p>
                    </div>

                    <div className="space-y-8 text-slate-300">
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                第1条（適用）
                            </h2>
                            <p className="leading-relaxed">
                                本規約は、ユーザーとBowlingNavi（以下、「当サイト」といいます。）との間の、当サイトの利用に関わる一切の関係に適用されるものとします。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                第2条（免責事項）
                            </h2>
                            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                                <li>
                                    当サイトに掲載されている大会情報は、主催者からの情報提供や公開情報に基づき作成されていますが、その内容の正確性、完全性、最新性を保証するものではありません。
                                </li>
                                <li>
                                    当サイトの利用により生じた損害（大会の中止・変更による損害を含む）について、当サイトは一切の責任を負いません。
                                </li>
                                <li>
                                    当サイトからリンクしている外部サイトの内容について、当サイトは一切の責任を負いません。
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                第3条（禁止事項）
                            </h2>
                            <p className="mb-2 leading-relaxed">
                                ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません。
                            </p>
                            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                                <li>法令または公序良俗に違反する行為</li>
                                <li>犯罪行為に関連する行為</li>
                                <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                                <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                                <li>不正アクセスをし、またはこれを試みる行為</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                第4条（サービス内容の変更等）
                            </h2>
                            <p className="leading-relaxed">
                                当サイトは、ユーザーに通知することなく、当サイトのサービス内容を変更し、または当サイトのサービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                <FileText className="size-5 text-blue-500" />
                                第5条（利用規約の変更）
                            </h2>
                            <p className="leading-relaxed">
                                当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
