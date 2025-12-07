"use client";

import Link from "next/link";
import { Search, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/tournaments?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
                            <svg viewBox="0 0 24 24" fill="none" className="size-7 text-white" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="10" cy="9" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="14" cy="9" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white tracking-tight leading-none">BowlingNavi</span>
                            <span className="text-xs font-medium text-blue-400 tracking-wider leading-none">-ボウナビ-</span>
                        </div>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                        <Link href="/tournaments" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                            大会一覧
                        </Link>
                        <Link href="/columns" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                            コラム
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                            BowlingNaviについて
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isSearchOpen ? (
                        <form onSubmit={handleSearch} className="absolute inset-x-0 top-0 z-50 flex h-16 items-center bg-slate-950 px-4 md:static md:h-auto md:bg-transparent md:p-0">
                            <div className="relative flex w-full items-center md:w-64">
                                <Search className="absolute left-3 size-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="大会を検索..."
                                    autoFocus
                                    className="w-full rounded-full border border-white/10 bg-slate-900 py-2 pl-9 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-3 text-slate-500 hover:text-white"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            <Search className="size-5" />
                        </button>
                    )}

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/tournaments"
                            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                        >
                            大会を探す
                        </Link>
                    </div>
                    <button
                        className="md:hidden text-slate-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-slate-950 px-4 py-6 md:hidden">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/tournaments"
                            className="text-base font-medium text-slate-300 transition-colors hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            大会一覧
                        </Link>
                        <Link
                            href="/columns"
                            className="text-base font-medium text-slate-300 transition-colors hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            コラム
                        </Link>
                        <Link
                            href="/about"
                            className="text-base font-medium text-slate-300 transition-colors hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            BowlingNaviについて
                        </Link>
                        <Link
                            href="/tournaments"
                            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            大会を探す
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
