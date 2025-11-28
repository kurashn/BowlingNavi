import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export default function OrganizersPage() {

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
                    <div className="mb-10 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">大会情報の掲載申請</h1>
                        <p className="text-slate-400">
                            BowlingNaviへの大会情報掲載をご希望の方は、以下のフォームより申請してください。<br />
                            内容を確認の上、担当者よりご連絡させていただきます。
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
                        <p className="mb-8 text-lg text-slate-300">
                            以下のボタンからGoogleフォームへ移動し、必要事項をご記入の上、申請してください。
                        </p>
                        <a
                            href="https://forms.gle/h6BXp1y7UVzmxGjRA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                        >
                            <Send className="size-5" />
                            申請フォームを開く
                            <ArrowRight className="size-5" />
                        </a>
                        <p className="mt-6 text-xs text-slate-500">
                            ※Googleフォームへ移動します
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
