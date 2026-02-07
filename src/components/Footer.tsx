import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950 py-12 text-slate-400">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
                            <svg viewBox="0 0 24 24" fill="none" className="size-6 text-white" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="10" cy="9" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="14" cy="9" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight leading-none">BowlingNavi</span>
                            <span className="text-xs font-medium text-blue-400 tracking-wider leading-none">-ボウナビ-</span>
                        </div>
                    </Link>
                    <p className="text-sm">
                        日本国内のボウリング大会情報ポータルサイト。<br />
                        関西エリア特化。
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">プラットフォーム</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/tournaments" className="hover:text-white transition-colors">大会を探す</Link></li>
                        <li><Link href="/organizers" className="hover:text-white transition-colors">大会情報の掲載申請はこちら</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">サポート</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/help" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} BowlingNavi. All rights reserved.</p>
            </div>
        </footer>
    );
}
