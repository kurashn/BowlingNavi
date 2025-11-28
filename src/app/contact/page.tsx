"use client";

import { ArrowLeft, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            // Replace 'YOUR_FORM_ID' with your actual Formspree Form ID
            const response = await fetch("https://formspree.io/f/mnnkgglp", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("お問い合わせを受け付けました。内容を確認次第、担当者よりご連絡いたします。");
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

                <div className="mx-auto max-w-2xl">
                    <div className="mb-10 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">お問い合わせ</h1>
                        <p className="text-slate-400">
                            ご質問やご要望がございましたら、お気軽にお問い合わせください。
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-slate-900 p-8">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                                お名前 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="山田 太郎"
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
                                placeholder="taro@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
                                件名 <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subject"
                                id="subject"
                                required
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">選択してください</option>
                                <option value="tournament">大会について</option>
                                <option value="system">システムについて</option>
                                <option value="other">その他</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                                お問い合わせ内容 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={5}
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="お問い合わせ内容をご記入ください"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                "送信中..."
                            ) : (
                                <>
                                    <Mail className="size-4" />
                                    送信する
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
