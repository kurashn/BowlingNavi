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
                    {['プロ公式戦', 'アマチュア', 'プロアマ', 'チャレンジ'].map((tag) => (
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
        </section>
    );
}
