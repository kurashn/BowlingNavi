"use client";

import { getTournaments } from "@/data/mockTournaments";
import { Tournament } from "@/types";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationPage({ params }: PageProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
    const [tournament, setTournament] = useState<Tournament | null>(null);

    // Unwrap params and find tournament
    if (!resolvedParams) {
        params.then(p => {
            setResolvedParams(p);
            const t = getTournaments().find((t) => t.id === p.id);
            if (t) {
                // 開催終了の大会はエントリーフォームを表示しない
                if (t.status === '開催終了' || t.status === '完了') {
                    router.push(`/tournaments/${p.id}`);
                    return;
                }
                setTournament(t);
            } else {
                notFound();
            }
        });
    }

    if (!tournament) return null; // Or loading state

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formspree.io/f/xjkqaajw", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("エントリーを受け付けました。内容を確認次第、担当者よりご連絡いたします。");
                router.push("/tournaments");
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
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <Link
                href={`/tournaments/${tournament.id}`}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="size-4" />
                大会詳細に戻る
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">大会エントリー</h1>
                <p className="text-slate-400">
                    <span className="text-white font-semibold">{tournament.title}</span> への申し込み
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-xl">
                <input type="hidden" name="tournament_id" value={tournament.id} />
                <input type="hidden" name="tournament_title" value={tournament.title} />
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">選手情報</h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium text-slate-300">名</label>
                            <input
                                id="firstName"
                                type="text"
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="太郎"
                                name="firstName"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium text-slate-300">姓</label>
                            <input
                                id="lastName"
                                type="text"
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="山田"
                                name="lastName"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">メールアドレス</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="taro.yamada@example.com"
                            name="email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-slate-300">電話番号</label>
                        <input
                            id="phone"
                            type="tel"
                            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="090-1234-5678"
                            name="phone"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">ボウリング情報</h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="avgScore" className="text-sm font-medium text-slate-300">アベレージ</label>
                            <input
                                id="avgScore"
                                type="number"
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="180"
                                name="avgScore"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="handicap" className="text-sm font-medium text-slate-300">ハンディキャップ (ある場合)</label>
                            <input
                                id="handicap"
                                type="number"
                                className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="0"
                                name="handicap"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">お支払い</h2>
                    <div className="rounded-lg bg-slate-950 p-4 text-sm text-slate-400">
                        <div className="flex justify-between mb-2">
                            <span>参加費</span>
                            <span className="text-white">
                                {tournament.entryFee
                                    ? (typeof tournament.entryFee === 'number' ? `¥${tournament.entryFee.toLocaleString()}` : tournament.entryFee)
                                    : '要確認'}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2">
                            <span className="font-bold text-white">合計</span>
                            <span className="font-bold text-blue-400">
                                {tournament.entryFee
                                    ? (typeof tournament.entryFee === 'number' ? `¥${tournament.entryFee.toLocaleString()}` : tournament.entryFee)
                                    : '要確認'}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500">
                        参加費は大会当日、会場にてお支払いください。
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "送信中..." : "エントリーを確定する"}
                </button>
            </form>
        </div>
    );
}
