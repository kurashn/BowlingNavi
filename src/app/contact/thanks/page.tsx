import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-8 inline-flex size-24 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                        <CheckCircle className="size-12" />
                    </div>
                    <h1 className="mb-6 text-4xl font-bold text-white">送信完了</h1>
                    <p className="mb-10 text-lg text-slate-400">
                        お問い合わせありがとうございます。<br />
                        内容を確認の上、担当者よりご連絡させていただきます。<br />
                        （自動返信メールをお送りしましたのでご確認ください）
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-bold text-white transition-all hover:bg-blue-700 hover:scale-105"
                    >
                        トップページに戻る
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
