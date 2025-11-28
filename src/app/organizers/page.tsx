"use client";

import { ArrowLeft, Send, Building2, Calendar, MapPin, Trophy, FileText, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrganizersPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            // Replace 'YOUR_FORM_ID' with your actual Formspree Form ID
            const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                router.push("/contact/thanks");
            } else {
                alert("送信に失敗しました。時間をおいて再度お試しください。");
                setIsSubmitting(false);
            }
        } catch (error) {
            alert("エラーが発生しました。");
            setIsSubmitting(false);
        }
    };

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

                    <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-white/10 bg-slate-900 p-8">

                        {/* Organizer Info */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-2">
                                <Building2 className="size-5 text-blue-500" />
                                主催者情報
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="organizerName" className="mb-2 block text-sm font-medium text-slate-300">
                                        主催者名・団体名 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="organizerName"
                                        id="organizerName"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="例：〇〇ボウリングセンター"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                                        メールアドレス <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="contact@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tournament Info */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-2">
                                <Trophy className="size-5 text-yellow-500" />
                                大会基本情報
                            </h2>
                            <div>
                                <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-300">
                                    大会名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="例：第10回 〇〇カップ"
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-300">
                                        開催日 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="mb-2 block text-sm font-medium text-slate-300">
                                        大会形式 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="type"
                                        id="type"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">選択してください</option>
                                        <option value="プロ・アマオープン">プロ・アマオープン</option>
                                        <option value="プロトーナメント">プロトーナメント</option>
                                        <option value="アマチュア大会">アマチュア大会</option>
                                        <option value="リーグ戦">リーグ戦</option>
                                        <option value="チャリティ">チャリティ</option>
                                        <option value="その他">その他</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-300">
                                    開催場所（都道府県・会場名） <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="例：大阪府大阪市 〇〇ボウル"
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="prizePool" className="mb-2 block text-sm font-medium text-slate-300">
                                        賞金総額
                                    </label>
                                    <input
                                        type="text"
                                        name="prizePool"
                                        id="prizePool"
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="例：100万円"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="entryFee" className="mb-2 block text-sm font-medium text-slate-300">
                                        参加費
                                    </label>
                                    <input
                                        type="text"
                                        name="entryFee"
                                        id="entryFee"
                                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="例：15,000円"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-2">
                                <FileText className="size-5 text-purple-500" />
                                詳細情報
                            </h2>
                            <div>
                                <label htmlFor="format" className="mb-2 block text-sm font-medium text-slate-300">
                                    競技内容・ルール
                                </label>
                                <textarea
                                    name="format"
                                    id="format"
                                    rows={4}
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="予選〇ゲーム、決勝〇ゲームなど"
                                />
                            </div>
                            <div>
                                <label htmlFor="schedule" className="mb-2 block text-sm font-medium text-slate-300">
                                    スケジュール
                                </label>
                                <textarea
                                    name="schedule"
                                    id="schedule"
                                    rows={4}
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="9:00 受付開始、10:00 予選開始など"
                                />
                            </div>
                            <div>
                                <label htmlFor="websiteUrl" className="mb-2 block text-sm font-medium text-slate-300">
                                    公式サイト・詳細URL
                                </label>
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    id="websiteUrl"
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="https://example.com/tournament"
                                />
                            </div>
                        </div>

                        {/* Other */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-2">
                                <MessageSquare className="size-5 text-green-500" />
                                その他
                            </h2>
                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                                    備考・メッセージ
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={3}
                                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="その他、ご要望やご質問などございましたらご記入ください。"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    "送信中..."
                                ) : (
                                    <>
                                        <Send className="size-5" />
                                        申請を送信する
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-center text-xs text-slate-500">
                                送信することで、<Link href="/terms" className="text-blue-400 hover:underline">利用規約</Link>に同意したものとみなされます。
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
