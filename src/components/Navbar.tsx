"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Menu } from "lucide-react";

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
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 h-[60px] border-b border-[#5877ae]/15 bg-[#020b1b]/80 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.23)]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4 max-w-6xl">
                <Link className="inline-flex items-center gap-2 min-w-0 md:min-w-[178px] group shrink-0" href="/" aria-label="BowlingNavi" onClick={() => setIsMenuOpen(false)}>
                    <span className="grid place-items-center w-8 h-8 md:w-10 md:h-10 text-white rounded-xl bg-gradient-to-br from-[#397cff] via-[#8a34ff] to-[#d23eff] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_8px_20px_rgba(81,52,255,0.4)] transition-transform group-hover:scale-105 duration-300 shrink-0">
                        <svg className="w-4 h-4 md:w-5.5 md:h-5.5"><use href="#icon-bowling" /></svg>
                    </span>
                    <span className="grid leading-none truncate">
                        <strong className="text-white text-lg md:text-[21px] font-black truncate">BowlingNavi</strong>
                        <small className="mt-0.5 md:mt-1 text-[#b260ff] text-[9px] md:text-[11px] font-extrabold truncate">ボウナビ.</small>
                    </span>
                </Link>
                
                <nav className="hidden md:flex items-center justify-center flex-1 gap-8 text-[#f4f7ff] text-sm font-extrabold whitespace-nowrap" aria-label="メインナビゲーション">
                    <Link href="/tournaments" className="opacity-95 hover:text-[#78bbff] transition-colors duration-200">大会一覧</Link>
                    <Link href="/columns" className="opacity-95 hover:text-[#78bbff] transition-colors duration-200">コラム・記事</Link>
                    <Link href="/columns?category=Guide" className="opacity-95 hover:text-[#78bbff] transition-colors duration-200">初心者ガイド</Link>
                    <Link href="/diagnosis" className="opacity-95 text-[#ffd700] hover:text-[#ffea75] transition-colors duration-200 flex items-center gap-1">
                        無料道具診断
                    </Link>
                    <Link href="/organizers" className="opacity-95 hover:text-[#78bbff] transition-colors duration-200">掲載のご案内</Link>
                </nav>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    {isSearchOpen ? (
                        <form onSubmit={handleSearch} className="flex items-center gap-2 absolute left-4 right-14 md:static md:w-auto bg-[#020b1b] md:bg-transparent p-2 md:p-0 rounded-full z-10">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="大会を検索..."
                                autoFocus
                                className="h-[34px] w-full md:w-[150px] lg:w-[200px] rounded-full border border-[#5f82c1]/20 bg-[#0e1e3a]/80 px-4 text-sm text-[#d9e7ff] placeholder:text-[#6f84a6] focus:border-[#3b69ff] focus:outline-none focus:ring-1 focus:ring-[#3b69ff] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="grid place-items-center w-[34px] h-[34px] text-[#d9e7ff] border border-[#5f82c1]/20 rounded-full bg-[#0e1e3a]/80 hover:bg-[#1a3668] transition-colors duration-200 cursor-pointer shrink-0"
                                aria-label="閉じる"
                            >
                                <X className="w-[18px] h-[18px]" />
                            </button>
                        </form>
                    ) : (
                        <button 
                            className="grid place-items-center w-[34px] h-[34px] text-[#d9e7ff] border border-[#5f82c1]/20 rounded-full bg-[#0e1e3a]/80 hover:bg-[#1a3668] transition-colors duration-200 cursor-pointer shrink-0" 
                            aria-label="検索"
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                        >
                            <svg className="w-[18px] h-[18px]"><use href="#icon-search" /></svg>
                        </button>
                    )}
                    
                    <Link className="hidden sm:inline-flex items-center justify-center gap-2 text-white border-0 rounded-lg bg-gradient-to-r from-[#3b69ff] via-[#672df1] to-[#22b9ff] shadow-[0_10px_24px_rgba(45,111,255,0.34),inset_0_1px_0_rgba(255,255,255,0.25)] font-black cursor-pointer hover:shadow-[0_12px_28px_rgba(45,111,255,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-[115px] h-[32px] text-xs shrink-0" href="/tournaments">
                        大会を探す
                    </Link>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden grid place-items-center w-[34px] h-[34px] text-[#d9e7ff] border border-[#5f82c1]/20 rounded-full bg-[#0e1e3a]/80 hover:bg-[#1a3668] transition-colors duration-200 cursor-pointer shrink-0"
                        aria-label="メニュー"
                        aria-expanded={isMenuOpen}
                        onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); }}
                    >
                        {isMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[60px] left-0 w-full bg-[#020b1b]/95 backdrop-blur-xl border-b border-[#5877ae]/15 shadow-2xl overflow-hidden animate-in slide-in-from-top-2 z-40">
                    <nav className="flex flex-col p-4 text-[#f4f7ff] text-base font-extrabold gap-3">
                        <Link href="/tournaments" className="flex items-center h-12 px-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(false)}>大会一覧</Link>
                        <Link href="/columns" className="flex items-center h-12 px-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(false)}>コラム・記事</Link>
                        <Link href="/columns?category=Guide" className="flex items-center h-12 px-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(false)}>初心者ガイド</Link>
                        <Link href="/diagnosis" className="flex items-center h-12 px-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors text-[#ffd700]" onClick={() => setIsMenuOpen(false)}>無料道具診断</Link>
                        <Link href="/organizers" className="flex items-center h-12 px-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(false)}>掲載のご案内</Link>
                        <div className="mt-2 pt-4 border-t border-white/10 flex justify-center sm:hidden">
                            <Link href="/tournaments" className="inline-flex items-center justify-center gap-2 w-full text-white border-0 rounded-xl bg-gradient-to-r from-[#3b69ff] via-[#672df1] to-[#22b9ff] shadow-[0_10px_24px_rgba(45,111,255,0.34)] font-black cursor-pointer hover:shadow-[0_12px_28px_rgba(45,111,255,0.5)] h-[44px] text-sm" onClick={() => setIsMenuOpen(false)}>
                                大会を探す
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
