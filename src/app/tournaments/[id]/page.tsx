import { getTournaments } from "@/data/mockTournaments";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";
import { Calendar, MapPin, Trophy, Users, ArrowLeft, ExternalLink, Info, CheckCircle2, ChevronRight, ClipboardList } from "lucide-react";

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

    const isFinished = tournament.status === '開催終了';
    const isAccepting = tournament.status === '受付中';

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <JsonLd tournament={tournament} />
            
            {/* Hero Section (Premium Dark Mode Style) */}
            <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-[#020d20]">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(43,135,255,0.15),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(41,210,243,0.1),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020d20]/50 to-slate-50"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    <Link
                        href="/tournaments"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        大会一覧に戻る
                    </Link>

                    <div className="flex flex-col gap-6 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-blue-600/20 px-4 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                                <Trophy className="size-3.5" />
                                {tournament.type}
                            </span>
                            <span className={`rounded-full px-4 py-1.5 text-xs font-bold border flex items-center gap-1.5 ${
                                isAccepting ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                isFinished ? 'bg-slate-500/20 text-slate-400 border-slate-500/30' :
                                'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }`}>
                                <Info className="size-3.5" />
                                {tournament.status}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                            {tournament.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-300 font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-5 text-blue-400" />
                                {formattedDate}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="size-5 text-purple-400" />
                                {tournament.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 max-w-5xl -mt-12 relative z-20">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Description Section */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                大会について
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                {tournament.description}
                            </p>
                        </div>

                        {/* Grid Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                                    <Trophy className="size-6 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 mb-1">賞金総額・表彰</h3>
                                    <p className="text-lg font-black text-slate-900">
                                        {tournament.prizePool ? (typeof tournament.prizePool === 'number' ? `¥${tournament.prizePool.toLocaleString()}` : tournament.prizePool) : '未定'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                    <Users className="size-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 mb-1">主催・運営</h3>
                                    <p className="text-lg font-black text-slate-900">
                                        {tournament.organizer}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Information Source */}
                        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Info className="size-5 text-slate-500" />
                                <span className="text-sm font-bold text-slate-700">公式情報源（リンク）</span>
                            </div>
                            {tournament.sourceUrl ? (
                                <a href={tournament.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 transition-colors text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
                                    公式サイトを確認する
                                    <ExternalLink className="size-4" />
                                </a>
                            ) : (
                                <span className="text-slate-500 text-sm font-medium">不明</span>
                            )}
                        </div>

                        {/* Results Section */}
                        {isFinished && tournament.results && (
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
                                    大会結果（最終成績）
                                </h2>
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    <table className="w-full text-left text-sm text-slate-600">
                                        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4">順位</th>
                                                <th className="px-6 py-4">選手名</th>
                                                <th className="px-6 py-4">スコア</th>
                                                <th className="px-6 py-4 text-right">賞金 / ポイント</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {tournament.results.map((result) => (
                                                <tr key={result.rank} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex size-7 items-center justify-center rounded-full font-black text-xs ${result.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                            result.rank === 2 ? 'bg-slate-200 text-slate-700' :
                                                                result.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {result.rank}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-slate-900">{result.playerName}</td>
                                                    <td className="px-6 py-4 font-medium">{result.score}</td>
                                                    <td className="px-6 py-4 text-right font-bold text-slate-700">
                                                        {result.prize ? `¥${result.prize.toLocaleString()}` : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Sidebar / Entry Box) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-blue-50">
                            
                            <div className="mb-8 text-center pb-8 border-b border-slate-100">
                                <span className="block text-sm font-bold text-slate-500 mb-2">参加費（エントリー費）</span>
                                <span className="text-4xl font-black text-slate-900">
                                    {tournament.entryFee ? (typeof tournament.entryFee === 'number' ? `¥${tournament.entryFee.toLocaleString()}` : tournament.entryFee) : '要確認'}
                                </span>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="size-4 text-slate-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 mb-1">現在のステータス</div>
                                        <div className="font-bold text-slate-900">{tournament.status}</div>
                                    </div>
                                </div>

                                {tournament.entryStatus && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <ClipboardList className="size-4 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 mb-1">受付状況</div>
                                            <div className="font-bold text-slate-900">{tournament.entryStatus}</div>
                                        </div>
                                    </div>
                                )}

                                {tournament.entryRequirements && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <Users className="size-4 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 mb-1">参加条件</div>
                                            <div className="font-medium text-slate-700 text-sm leading-relaxed">{tournament.entryRequirements}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Entry CTA Button */}
                            {isAccepting ? (
                                tournament.sourceUrl ? (
                                    <a href={tournament.sourceUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-base font-bold text-white shadow-[0_8px_20px_rgba(59,105,255,0.3)] transition-all hover:shadow-[0_10px_25px_rgba(59,105,255,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                                            公式サイトでエントリー
                                            <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </a>
                                ) : (
                                    <div className="block w-full rounded-xl py-4 text-base font-bold text-center bg-slate-100 text-slate-400 cursor-not-allowed">
                                        申し込み先URLがありません
                                    </div>
                                )
                            ) : tournament.sourceUrl ? (
                                <a href={tournament.sourceUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                    <button className="w-full rounded-xl bg-slate-900 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                                        公式サイトを確認する
                                        <ExternalLink className="size-4 transition-transform group-hover:scale-110" />
                                    </button>
                                </a>
                            ) : (
                                <div className="block w-full rounded-xl py-4 text-base font-bold text-center bg-slate-100 text-slate-400 cursor-not-allowed">
                                    公式サイトURLがありません
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
