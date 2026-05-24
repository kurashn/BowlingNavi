import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative mt-20 pt-16 pb-8 border-t border-[#5877ae]/15 bg-[#020b1b] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#3b69ff]/50 to-transparent"></div>
            
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
                    <div className="lg:col-span-4">
                        <Link className="inline-flex items-center gap-2.5 mb-6 group" href="/">
                            <span className="grid place-items-center w-9 h-9 text-white rounded-xl bg-gradient-to-br from-[#397cff] via-[#8a34ff] to-[#d23eff] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_8px_20px_rgba(81,52,255,0.4)] transition-transform group-hover:scale-105 duration-300">
                                <svg className="w-5 h-5"><use href="#icon-bowling" /></svg>
                            </span>
                            <span className="grid leading-none">
                                <strong className="text-white text-xl font-black">BowlingNavi</strong>
                                <small className="mt-1 text-[#b260ff] text-[10px] font-extrabold">ボウナビ.</small>
                            </span>
                        </Link>
                        <p className="text-[#a9bad6] text-sm font-semibold leading-relaxed mb-6">
                            ボウリングをもっと身近に、もっと熱く。<br />
                            大会情報・会場検索・役立つコンテンツで、<br />
                            すべてのボウラーを応援します。
                        </p>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-white text-sm font-black mb-5">サービス</h3>
                        <nav className="flex flex-col gap-3 text-sm font-bold text-[#8fa3c7]" aria-label="サービス">
                            <Link href="/tournaments" className="hover:text-white hover:translate-x-1 transition-all duration-200">大会一覧</Link>
                            <Link href="/columns" className="hover:text-white hover:translate-x-1 transition-all duration-200">コラム・記事</Link>
                            <Link href="/columns?category=Guide" className="hover:text-white hover:translate-x-1 transition-all duration-200">初心者ガイド</Link>
                            <Link href="/organizers" className="hover:text-white hover:translate-x-1 transition-all duration-200">掲載のご案内</Link>
                        </nav>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-white text-sm font-black mb-5">サポート</h3>
                        <nav className="flex flex-col gap-3 text-sm font-bold text-[#8fa3c7]" aria-label="サポート">
                            <Link href="/help" className="whitespace-nowrap hover:text-white hover:translate-x-1 transition-all duration-200">ヘルプセンター</Link>
                            <Link href="/contact" className="whitespace-nowrap hover:text-white hover:translate-x-1 transition-all duration-200">お問い合わせ</Link>
                        </nav>
                    </div>

                    <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col h-full">
                        <h3 className="text-white text-sm font-black mb-2 flex items-center gap-2">
                            公式LINE
                        </h3>
                        <p className="text-[#a9bad6] text-xs font-semibold leading-relaxed mb-4">
                            最新の大会情報やお得なエントリー枠情報を<br className="hidden lg:block" />LINEでいち早くお届けします。
                        </p>
                        <form className="mt-auto relative group">
                            <a href="https://line.me/ja/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full h-10 px-6 rounded-xl bg-[#06C755] text-white text-xs font-black shadow-[0_4px_15px_rgba(6,199,85,0.3)] hover:shadow-[0_8px_25px_rgba(6,199,85,0.5)] hover:-translate-y-0.5 transition-all">
                                友だち追加する
                            </a>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#5877ae]/15 text-center flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#6f84a6] text-xs font-bold">&copy; {new Date().getFullYear()} BowlingNavi. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-[#6f84a6] text-xs font-bold">
                        <Link href="/terms" className="hover:text-white transition-colors">利用規約</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">プライバシー</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
