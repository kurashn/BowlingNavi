import { getTournaments } from "@/data/mockTournaments";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";
import { Calendar, MapPin, Trophy, Users, ArrowLeft } from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const tournament = getTournaments().find((t) => t.id === id);

    if (!tournament) {
        return {
            title: "大会が見つかりません",
        };
    }

    return {
        title: tournament.title,
        description: tournament.description,
        openGraph: {
            title: tournament.title,
            description: tournament.description,
            type: "article",
            publishedTime: tournament.date,
            authors: [tournament.organizer],
            images: [
                {
                    url: tournament.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: tournament.title,
                },
            ],
        },
    };
}

export default async function TournamentDetailPage({ params }: PageProps) {
    const { id } = await params;
    const tournament = getTournaments().find((t) => t.id === id);

    if (!tournament) {
        notFound();
    }

    const formattedDate = tournament.displayDate || new Date(tournament.date).toLocaleDateString("ja-JP", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="min-h-screen pb-20">
            <JsonLd tournament={tournament} />
            {/* Hero Header */}
            <div className="relative w-full bg-slate-900 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20" />

                <div className="relative container mx-auto px-4 py-12 md:py-16">
                    <Link
                        href="/tournaments"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        大会一覧に戻る
                    </Link>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 border border-blue-500/20">
                                {tournament.type}
                            </span>
                            <span className={`rounded-md px-3 py-1 text-sm font-medium border ${tournament.status === '受付中' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                tournament.status === '開催予定' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                }`}>
                                {tournament.status}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-white md:text-5xl max-w-4xl leading-tight">
                            {tournament.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="mb-6 text-xl font-bold text-white">大会について</h2>
                            <p className="text-lg leading-relaxed text-slate-300">
                                {tournament.description}
                            </p>
                        </section>

                        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                    <Calendar className="size-5" />
                                </div>
                                <h3 className="mb-1 text-sm font-medium text-slate-400">日時</h3>
                                <p className="text-lg font-semibold text-white">{formattedDate}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                                    <MapPin className="size-5" />
                                </div>
                                <h3 className="mb-1 text-sm font-medium text-slate-400">場所</h3>
                                <p className="text-lg font-semibold text-white">{tournament.location}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                                    <Trophy className="size-5" />
                                </div>
                                <h3 className="mb-1 text-sm font-medium text-slate-400">賞金総額</h3>
                                <p className="text-lg font-semibold text-white">
                                    {tournament.prizePool
                                        ? (typeof tournament.prizePool === 'number' ? `¥${tournament.prizePool.toLocaleString()}` : tournament.prizePool)
                                        : '未定'}
                                </p>
                            </div>

                            <div className="mb-6">
                                <span className="block text-sm text-slate-400 mb-1">情報源</span>
                                {tournament.sourceUrl ? (
                                    <a
                                        href={tournament.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 underline break-all"
                                    >
                                        {tournament.sourceUrl}
                                    </a>
                                ) : (
                                    <span className="text-white">不明</span>
                                )}
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                    <Users className="size-5" />
                                </div>
                                <h3 className="mb-1 text-sm font-medium text-slate-400">主催</h3>
                                <p className="text-lg font-semibold text-white">{tournament.organizer}</p>
                            </div>
                        </section>

                        {/* Results Section */}
                        {tournament.status === '完了' && tournament.results && (
                            <section>
                                <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
                                    <Trophy className="text-yellow-500" />
                                    大会結果
                                </h2>
                                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
                                    <table className="w-full text-left text-sm text-slate-400">
                                        <thead className="bg-slate-900 text-xs uppercase text-slate-300">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">順位</th>
                                                <th className="px-6 py-4 font-medium">選手名</th>
                                                <th className="px-6 py-4 font-medium">スコア</th>
                                                <th className="px-6 py-4 font-medium text-right">賞金</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {tournament.results.map((result) => (
                                                <tr key={result.rank} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex size-6 items-center justify-center rounded-full font-bold ${result.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                                                            result.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                                                                result.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                                                                    'text-slate-500'
                                                            }`}>
                                                            {result.rank}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-white">{result.playerName}</td>
                                                    <td className="px-6 py-4">{result.score}</td>
                                                    <td className="px-6 py-4 text-right font-medium text-white">
                                                        {result.prize ? `¥${result.prize.toLocaleString()}` : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
                            <div className="mb-6">
                                <span className="block text-sm text-slate-400 mb-1">参加費</span>
                                <span className="text-3xl font-bold text-white">
                                    {tournament.entryFee
                                        ? (typeof tournament.entryFee === 'number' ? `¥${tournament.entryFee.toLocaleString()}` : tournament.entryFee)
                                        : '要確認'}
                                </span>
                            </div>

                            <div className="mb-8 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">ステータス</span>
                                    <span className="font-medium text-white">{tournament.status}</span>
                                </div>
                            </div>

                            {tournament.status === '受付中' ? (
                                <Link href={`/tournaments/${tournament.id}/apply`}>
                                    <button className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-[1.02]">
                                        申し込む
                                    </button>
                                </Link>
                            ) : tournament.sourceUrl ? (
                                <a
                                    href={tournament.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full rounded-xl py-4 text-base font-bold text-center transition-all bg-slate-800 text-white hover:bg-slate-700 hover:scale-[1.02]"
                                >
                                    詳細を見る
                                </a>
                            ) : (
                                <div className="block w-full rounded-xl py-4 text-base font-bold text-center transition-all bg-slate-800/50 text-slate-500 cursor-not-allowed">
                                    詳細不明
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
