"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/tournaments?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
            <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

            <h1 className="mb-6 max-w-4xl text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-7xl">
                全てのボウラーに<br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    最高のステージを
                </span>
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
                あなたの次の挑戦を見つけよう。プロの公式戦からアマチュア大会まで、
                スキルレベルに合わせた最適なトーナメントが見つかります。
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-2xl">
                <div className="relative flex items-center rounded-full bg-slate-900/80 p-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-all focus-within:ring-blue-500/50 sm:p-2">
                    <Search className="ml-3 size-4 text-slate-400 sm:ml-4 sm:size-5" />
                    <input
                        type="text"
                        placeholder="大会名、場所などで検索"
                        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSearch}
                        className="whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-8 sm:py-3"
                    >
                        検索
                    </button>
                </div>

                {/* Quick Filters */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
                    {['プロ公式戦', 'アマチュア', 'プロアマ', 'JB', 'NBF'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => router.push(`/tournaments?type=${encodeURIComponent(tag)}`)}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                </div>

                {/* Diagnosis Banner */}
                <div className="mt-10 sm:mt-12 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div onClick={() => router.push('/diagnosis')} className="cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-[2px] shadow-xl transition-all hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                        <div className="relative flex items-center justify-between rounded-xl bg-[#020b1b]/90 px-5 py-4 sm:px-6 sm:py-5 backdrop-blur-sm transition-colors group-hover:bg-[#020b1b]/80">
                            <div className="flex items-center gap-4 text-left">
                                <span className="text-3xl sm:text-4xl drop-shadow-md">🎳</span>
                                <div>
                                    <div className="text-xs sm:text-sm font-bold text-cyan-300 tracking-wide">1分でわかる！完全無料</div>
                                    <div className="text-base sm:text-lg font-black text-white mt-0.5">あなたにぴったりの道具を診断する</div>
                                </div>
                            </div>
                            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:bg-white/20 group-hover:translate-x-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}
