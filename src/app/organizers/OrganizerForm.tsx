"use client";

import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function OrganizerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append("form_type", "大会掲載申し込み");

        try {
            // Replace with your actual Formspree endpoint
            const response = await fetch("https://formspree.io/f/mnnkgglp", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("送信に失敗しました。時間をおいて再度お試しください。");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("大会掲載申請エラー:", error);
            alert("エラーが発生しました。");
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="rounded-2xl border border-blue-500/20 bg-slate-900/50 p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">送信が完了しました</h3>
                <p className="text-slate-400">
                    お申し込みありがとうございます。<br />
                    内容を確認次第、担当者よりご連絡または掲載の対応をさせていただきます。
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label htmlFor="org_name" className="mb-2 block text-sm font-medium text-slate-300">
                        ボウリング場・団体名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="org_name"
                        id="org_name"
                        required
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="例：〇〇ボウル"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                        ご担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="山田 太郎"
                    />
                </div>
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
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="taro@example.com"
                />
            </div>

            <div>
                <label htmlFor="tournament_name" className="mb-2 block text-sm font-medium text-slate-300">
                    掲載希望の大会名 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="tournament_name"
                    id="tournament_name"
                    required
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="例：第1回 〇〇カップ"
                />
            </div>

            <div>
                <label htmlFor="tournament_date" className="mb-2 block text-sm font-medium text-slate-300">
                    開催日時 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="tournament_date"
                    id="tournament_date"
                    required
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="例：2026年8月15日(土) 10:00〜"
                />
            </div>

            <div>
                <label htmlFor="details" className="mb-2 block text-sm font-medium text-slate-300">
                    大会詳細や参加費・公式サイトURLなど
                </label>
                <textarea
                    name="details"
                    id="details"
                    rows={5}
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="参加費：5000円&#13;&#10;公式サイト：https://...&#13;&#10;その他詳細をご記入ください"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,105,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        "送信中..."
                    ) : (
                        <>
                            <Send className="size-4" />
                            この内容で申請する
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
