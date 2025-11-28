import { Player } from "@/types";
import { Trophy, User } from "lucide-react";

interface PlayerCardProps {
    player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex flex-col md:flex-row">
                {/* Avatar / Image Section */}
                <div className="relative h-48 w-full md:h-auto md:w-48 shrink-0 bg-slate-800 flex items-center justify-center">
                    {player.avatarUrl ? (
                        // In a real app, use Next.js Image. For now, using a placeholder icon if URL is placeholder
                        player.avatarUrl.includes("placeholder") ? (
                            <User className="size-16 text-slate-600" />
                        ) : (
                            <img src={player.avatarUrl} alt={player.name} className="h-full w-full object-cover" />
                        )
                    ) : (
                        <User className="size-16 text-slate-600" />
                    )}
                    <div className="absolute top-2 left-2">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${player.type === "Pro"
                                    ? "bg-yellow-500/10 text-yellow-500 ring-1 ring-inset ring-yellow-500/20"
                                    : "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20"
                                }`}
                        >
                            {player.type === "Pro" ? "Professional" : "Amateur"}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {player.name}
                            </h3>
                            <span className="text-sm text-slate-500">{player.nameKana}</span>
                        </div>
                        {player.rank && (
                            <p className="text-sm font-medium text-slate-400 mt-1">{player.rank}</p>
                        )}
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-slate-400">{player.bio}</p>

                    <div className="mt-auto">
                        <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <Trophy className="size-3" />
                            主な戦績
                        </h4>
                        <ul className="space-y-1">
                            {player.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="text-sm text-slate-300">
                                    • {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
