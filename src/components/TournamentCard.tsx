import { Tournament } from "@/types";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

import Link from "next/link";

interface TournamentCardProps {
    tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
    const formattedDate = tournament.displayDate || new Date(tournament.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Link
            href={`/tournaments/${tournament.id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-white/10 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 h-full"
        >
            {/* Header Strip */}
            <div className="relative h-2 bg-gradient-to-r from-blue-600 to-purple-600" />

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
                            {tournament.type}
                        </span>
                        <span className={`rounded-md px-2.5 py-1 text-xs font-medium border ${tournament.status === '受付中' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            tournament.status === '開催予定' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                            {tournament.status}
                        </span>
                    </div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {tournament.title}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="size-4 shrink-0 text-slate-500" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="size-4 shrink-0 text-slate-500" />
                        <span className="truncate">{tournament.location}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-0.5">賞金総額</span>
                            <div className="flex items-center gap-1.5 text-yellow-500 font-medium min-w-0 flex-1">
                                <Trophy className="size-4 shrink-0" />
                                <span className="text-sm line-clamp-1 break-all">
                                    {tournament.prizePool
                                        ? (typeof tournament.prizePool === 'number' ? `¥${tournament.prizePool.toLocaleString()}` : tournament.prizePool)
                                        : '未定'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    );
}
