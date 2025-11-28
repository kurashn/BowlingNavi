import { Hero } from "@/components/Hero";
import { TournamentCard } from "@/components/TournamentCard";
import { MOCK_TOURNAMENTS } from "@/data/mockTournaments";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col gap-12 pb-20">
            <Hero />

            <section className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">注目の大会</h2>
                    <Link
                        href="/tournaments"
                        className="group flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                        すべて見る
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {MOCK_TOURNAMENTS.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                    <div className="relative z-10">
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                            レーンに立つ準備はできましたか？
                        </h2>
                        <p className="mb-8 mx-auto max-w-2xl text-indigo-200">
                            今すぐ参加して、あなたの実力を試しましょう。
                        </p>
                        <Link
                            href="/tournaments"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-indigo-900 shadow-lg transition-transform hover:scale-105"
                        >
                            大会を探す
                        </Link>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-blue-500/20 blur-3xl" />
                </div>
            </section>
        </div>
    );
}
