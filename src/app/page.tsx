import Link from "next/link";
import { getTournaments } from "@/data/mockTournaments";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
export default function Home() {
    const allTournaments = getTournaments();
    
    // Get up to 3 upcoming tournaments
    const upcomingTournaments = allTournaments
        .filter(t => new Date(t.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

    const featuredTournaments = allTournaments
        .filter(t => t.status !== '開催終了' && t.status !== '完了')
        .slice(0, 8);

    const recentArticles = MOCK_ARTICLES.slice(0, 3);

    return (
        <div className="flex flex-col gap-16 pb-24 selection:bg-[#3b69ff] selection:text-white">
            {/* Hero Section */}
            <section className="relative h-[560px] md:h-[600px] overflow-hidden flex items-center bg-[#020813]">
                {/* Premium Animated Background Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,105,255,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(227,53,215,0.1),transparent_40%)] mix-blend-screen pointer-events-none z-10"></div>
                <div className="absolute right-[-10%] md:right-[5%] top-[15%] w-[400px] md:w-[600px] h-[100px] -rotate-12 opacity-40 bg-gradient-to-r from-transparent via-[#4183ff]/40 to-[#e43adb]/40 blur-3xl z-10"></div>
                
                {/* Hero Image with Fade */}
                <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 pointer-events-none overflow-hidden">
                    {/* Desktop Gradients */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#020813] via-[#020813]/80 to-transparent z-10"></div>
                    {/* Mobile Gradients - Much lighter so image shows clearly */}
                    <div className="md:hidden absolute inset-0 bg-gradient-to-r from-[#020813] via-[#020813]/20 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/40 to-transparent z-10"></div>
                    
                    <img className="w-full h-full object-cover md:object-contain object-[70%_center] md:object-right opacity-60 md:opacity-80 saturate-125" src="/assets/hero-bowling-fade.png" alt="" />
                </div>
                
                <div className="container mx-auto px-4 max-w-6xl relative z-20">
                    <div className="w-full md:w-[640px] pt-12 md:pt-0">
                        <h1 className="text-white text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-[68px] font-black md:leading-[1.1] tracking-tight drop-shadow-2xl">
                            <span className="whitespace-nowrap">すべてのボウラーへ、</span><br />
                            <span className="bg-gradient-to-r from-[#2b87ff] via-[#8a34ff] to-[#e335d7] bg-clip-text text-transparent drop-shadow-lg">最高の舞台を。</span>
                        </h1>
                        <p className="mt-4 md:mt-6 text-[#9eb2d0] text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-[600px] drop-shadow-md">
                            <span className="inline-block">全国の大会スケジュールから、ボウリング上達のヒントまで。</span><br className="hidden sm:block" />
                            <span className="inline-block">より高いスコアを目指す、すべての挑戦者を全力でサポートします。</span>
                        </p>
                        
                        {/* Premium Search Bar */}
                        <form className="flex items-center w-full max-w-[580px] h-14 md:h-16 mt-8 md:mt-10 p-1 md:p-1.5 pl-4 md:pl-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] focus-within:border-[#3b69ff]/50 focus-within:bg-white/10 transition-all duration-500 group" action="/tournaments">
                            <label className="flex items-center flex-1 gap-2 md:gap-3 min-w-0 text-[#9eb2d0] text-sm font-bold cursor-text">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#3b69ff] shrink-0"><use href="#icon-pin" /></svg>
                                <input type="text" name="q" placeholder="大会名・会場名などで検索" className="bg-transparent border-none outline-none text-white placeholder:text-[#9eb2d0]/60 w-full text-sm md:text-base pr-2" />
                            </label>
                            <button className="flex items-center justify-center gap-1.5 md:gap-2 text-white border-0 rounded-full bg-gradient-to-r from-[#2b87ff] to-[#7d35ff] shadow-[0_4px_15px_rgba(43,135,255,0.4)] font-black hover:shadow-[0_8px_25px_rgba(43,135,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 px-4 md:px-8 h-full shrink-0 text-xs md:text-sm tracking-wide" type="submit">
                                <svg className="w-3.5 h-3.5 md:w-4 md:h-4"><use href="#icon-search" /></svg>
                                <span className="hidden sm:inline">検索する</span>
                            </button>
                        </form>
                        
                        <div className="flex flex-wrap gap-2.5 mt-6" aria-label="大会カテゴリ">
                            {[
                                { name: "プロ公式戦", href: "?type=プロ公式戦", icon: "#icon-pin" },
                                { name: "アマチュア", href: "?type=アマチュア", icon: "#icon-shield" },
                                { name: "プロアマ", href: "?type=プロアマ", icon: "#icon-bowling" },
                                { name: "ジュニア", href: "?q=ジュニア", icon: "#icon-bowling" },
                                { name: "レディース", href: "?q=レディース", icon: "#icon-users" }
                            ].map(cat => (
                                <Link key={cat.name} href={`/tournaments${cat.href}`} className="inline-flex items-center gap-1.5 h-8 px-4 text-[#dceaff] border border-white/5 rounded-full bg-white/5 backdrop-blur-md shadow-sm text-xs font-bold whitespace-nowrap hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 text-[#e335d7]"><use href={cat.icon} /></svg>
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Quick Links */}
            <section className="container mx-auto px-4 max-w-6xl relative z-20 -mt-10 md:-mt-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {[
                        { title: "注目の大会", desc: "今チェックすべき\n大会をピックアップ", icon: "#icon-trophy", href: "/tournaments", gradient: "from-[#7d35ff]/80 to-[#261b67]/90" },
                        { title: "直近開催", desc: "今週・今月の\n大会を一覧で確認", icon: "#icon-calendar", href: "/tournaments?tab=schedule", gradient: "from-[#2b87ff]/80 to-[#0e3b8a]/90" },
                        { title: "エリアから探す", desc: "都道府県・エリアから\n会場・大会を検索", icon: "#icon-map", href: "/tournaments#location-filter", gradient: "from-[#ff6b6b]/80 to-[#8a1c1c]/90" },
                        { title: "初心者向け", desc: "ルールや投げ方の\n基本をやさしく解説", icon: "#icon-spark", href: "/columns?category=Guide", gradient: "from-[#20d487]/80 to-[#0a5232]/90" },
                        { title: "大会主催者向け", desc: "大会の掲載・運営を\nサポートします", icon: "#icon-shield", href: "/organizers", gradient: "from-[#ffc545]/80 to-[#8a6a1c]/90" }
                    ].map((card, idx) => (
                        <Link key={idx} className={`relative flex items-center gap-3 h-[96px] p-4 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)] bg-gradient-to-br ${card.gradient} border border-white/10 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all duration-500 group backdrop-blur-xl`} href={card.href}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            <svg className="w-8 h-8 text-white relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-500 drop-shadow-md"><use href={card.icon} /></svg>
                            <span className="relative z-10 flex flex-col min-w-0 flex-1">
                                <strong className="text-white text-[13px] md:text-sm font-black leading-tight drop-shadow-sm">{card.title}</strong>
                                <small className="mt-1 text-white/80 text-[10px] font-semibold leading-snug whitespace-pre-line group-hover:text-white transition-colors">{card.desc}</small>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Tournaments */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="flex items-center gap-2.5 text-white text-2xl font-black tracking-tight">
                        <svg className="w-6 h-6 text-[#ffc545] drop-shadow-[0_0_10px_rgba(255,197,69,0.5)]"><use href="#icon-trophy" /></svg>
                        注目の大会
                    </h2>
                    <Link href="/tournaments" className="inline-flex items-center gap-1.5 text-[#2b87ff] text-sm font-bold hover:text-white transition-colors group">
                        すべて見る <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"><use href="#icon-arrow" /></svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featuredTournaments.map((tournament, idx) => (
                        <article key={tournament.id} className={`relative flex flex-col h-[190px] p-5 rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-500 ${idx === 0 ? 'bg-gradient-to-br from-[#16274d] to-[#0a1224] border border-[#3b69ff]/40 shadow-[0_8px_30px_rgba(59,105,255,0.2)] hover:shadow-[0_12px_40px_rgba(59,105,255,0.3)] hover:border-[#3b69ff]/60' : 'bg-[#061124]/80 backdrop-blur-md border border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-white/10'}`}>
                            {idx === 0 && <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3b69ff] opacity-20 blur-3xl rounded-full pointer-events-none group-hover:opacity-30 transition-opacity"></div>}
                            
                            <div className="flex items-center gap-2 min-h-[22px] mb-3 relative z-10">
                                <span className={`inline-flex items-center h-[22px] px-2.5 rounded-md font-bold text-[10px] leading-none text-white shadow-sm ${tournament.type.includes('プロ') ? 'bg-gradient-to-r from-[#2b87ff] to-[#1e66c9]' : tournament.type.includes('ジュニア') ? 'bg-gradient-to-r from-[#7d35ff] to-[#591ba1]' : 'bg-white/10 backdrop-blur-sm border border-white/5'}`}>
                                    {tournament.type}
                                </span>
                                <span className={`inline-flex items-center h-[22px] px-2.5 rounded-md font-bold text-[10px] leading-none shadow-sm ${tournament.status === '受付中' ? 'bg-gradient-to-r from-[#20d487] to-[#128f59] text-white' : 'bg-gradient-to-r from-[#ffc545] to-[#c29023] text-black'}`}>
                                    {tournament.status}
                                </span>
                            </div>
                            <h3 className="text-white text-[15px] font-black leading-snug line-clamp-2 mb-3 group-hover:text-[#2b87ff] transition-colors relative z-10">
                                {tournament.title}
                            </h3>
                            <p className="flex items-center gap-2 text-[#9eb2d0] text-xs font-medium truncate mt-1 relative z-10">
                                <svg className="w-3.5 h-3.5 text-[#5877ae] shrink-0"><use href="#icon-calendar" /></svg>
                                {tournament.displayDate || new Date(tournament.date).toLocaleDateString('ja-JP')}
                            </p>
                            <p className="flex items-center gap-2 text-[#9eb2d0] text-xs font-medium truncate mt-1.5 relative z-10">
                                <svg className="w-3.5 h-3.5 text-[#5877ae] shrink-0"><use href="#icon-pin" /></svg>
                                {tournament.location}
                            </p>
                            <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/5 relative z-10">
                                <p className="text-[#e335d7] text-xs font-black">
                                    {tournament.prizePool && tournament.prizePool !== '要確認' ? (
                                        <>賞金総額 <strong className="ml-1 text-white text-[13px]">{tournament.prizePool}</strong></>
                                    ) : tournament.entryFee ? (
                                        <>参加費 <strong className="ml-1 text-white text-[13px]">{typeof tournament.entryFee === 'number' ? `¥${tournament.entryFee.toLocaleString()}` : tournament.entryFee}</strong></>
                                    ) : null}
                                </p>
                            </div>
                            <Link className="absolute inset-0 z-20 focus:outline-none" href={`/tournaments/${tournament.id}`}>
                                <span className="sr-only">詳細を見る</span>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* Articles */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="flex items-center gap-2.5 text-white text-2xl font-black tracking-tight">
                        <svg className="w-5 h-5 text-[#29d2f3] drop-shadow-[0_0_10px_rgba(41,210,243,0.5)]"><use href="#icon-spark" /></svg>
                        役立つコラム・特集
                    </h2>
                    <Link href="/columns" className="inline-flex items-center gap-1.5 text-[#2b87ff] text-sm font-bold hover:text-white transition-colors group">
                        すべて見る <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"><use href="#icon-arrow" /></svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {recentArticles.map((article, idx) => (
                        <article key={article.id} className="group relative flex flex-col p-4 border border-white/5 rounded-2xl bg-[#061124]/80 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-white/10 transition-all duration-500 overflow-hidden">
                            <div className="relative h-[140px] w-full mb-4 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-[#020813]/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" src={`/assets/article-${idx === 0 ? 'bowler' : idx === 1 ? 'notes' : 'balls'}.png`} alt="" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="text-white text-[15px] font-black leading-snug line-clamp-2 mb-2 group-hover:text-[#29d2f3] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-[#9eb2d0] text-xs font-medium leading-relaxed line-clamp-2 mt-auto mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                    <span className={`inline-flex items-center h-[22px] px-2.5 text-white rounded-md text-[10px] font-bold shadow-sm ${idx === 2 ? 'bg-gradient-to-r from-[#e335d7] to-[#a31c99]' : 'bg-gradient-to-r from-[#2b87ff] to-[#1e66c9]'}`}>
                                        {article.category === 'Gear' ? 'ギア・道具' : article.category === 'Guide' ? '初心者ガイド' : article.category === 'Technique' ? 'スキルアップ' : article.category}
                                    </span>
                                    <time className="text-[#5877ae] text-[11px] font-semibold">{new Date(article.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}</time>
                                </div>
                            </div>
                            <Link className="absolute inset-0 z-20 focus:outline-none" href={`/${article.id}`}>
                                <span className="sr-only">詳細を見る</span>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* Bottom Grid */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Gear Recommendations Panel (Affiliate) */}
                    <article className="bg-[#061124]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 h-full flex flex-col shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-white text-lg font-black tracking-tight">おすすめ最新ギア</h2>
                            <span className="text-[#e335d7] text-[10px] font-bold border border-[#e335d7]/30 px-2 py-0.5 rounded-full bg-[#e335d7]/10">PR</span>
                        </div>
                        <div className="flex flex-col gap-3 mt-auto">
                            {[
                                { name: "ABS S-380 (左右兼用)", price: "¥3,500〜", imgUrl: "https://shop.r10s.jp/b-primeiro/cabinet/abs-shoes/s-380-003.jpg", url: "https://af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Fs-380%2F", tag: "コスパ最強シューズ" },
                                { name: "Brunswick ライノ", price: "¥12,000〜", imgUrl: "https://shop.r10s.jp/b-primeiro/cabinet/brunswick-ball/rhino-05.jpg", url: "https://af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Frhino%2F", tag: "初心者向けボール" },
                                { name: "Storm トロピカルサージ", price: "¥13,000〜", imgUrl: "https://shop.r10s.jp/ajimura4861/cabinet/1043-4/b07q3m2hm6.jpg", url: "https://af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fajimura4861%2Fb07q3m2hm6%2F", tag: "定番エントリー" }
                            ].map((item, idx) => (
                                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all group">
                                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
                                        <img src={item.imgUrl} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                                        <span className="text-[#20d487] text-[9px] font-black leading-none mb-1">{item.tag}</span>
                                        <h3 className="text-white text-xs font-bold truncate group-hover:text-[#2b87ff] transition-colors">{item.name}</h3>
                                        <span className="text-[#9eb2d0] text-[10px] font-semibold mt-0.5">{item.price}</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-[#bf0000] flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-[#d60000] transition-all">
                                        <span className="text-white text-[10px] font-black leading-none mt-[1px]">R</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <a href="https://search.rakuten.co.jp/search/mall/%E3%83%9C%E3%82%A6%E3%83%AA%E3%83%B3%E3%82%B0/" target="_blank" rel="noopener noreferrer" className="mt-4 text-center text-[#2b87ff] text-[11px] font-bold hover:text-white transition-colors">
                            楽天でボウリング用品をもっと見る <svg className="inline-block w-2.5 h-2.5 ml-0.5 -mt-0.5"><use href="#icon-arrow" /></svg>
                        </a>
                    </article>

                    {/* Schedule Panel */}
                    <article className="bg-[#061124]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 h-full flex flex-col shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                        <div className="flex flex-col gap-4 mb-6">
                            <h2 className="text-white text-lg font-black tracking-tight text-center">直近の開催スケジュール</h2>
                            <div className="flex items-center justify-center gap-6 text-white text-[15px] font-black">
                                <Link href="/tournaments" aria-label="前月" className="text-[#5877ae] hover:text-white text-xl cursor-pointer transition-colors">‹</Link>
                                <span>{upcomingTournaments.length > 0 ? format(new Date(upcomingTournaments[0].date), 'yyyy年M月', { locale: ja }) : '2026年5月'}</span>
                                <Link href="/tournaments" aria-label="翌月" className="text-[#5877ae] hover:text-white text-xl cursor-pointer transition-colors">›</Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-4">
                            {upcomingTournaments.length > 0 && Array.from({ length: 7 }).map((_, i) => {
                                const d = addDays(subDays(new Date(upcomingTournaments[0].date), 3), i);
                                return <span key={'w' + d.getTime()} className="text-[#5877ae] text-[11px] font-bold">{format(d, 'E', { locale: ja })}</span>;
                            })}
                            {upcomingTournaments.length > 0 && Array.from({ length: 7 }).map((_, i) => {
                                const d = addDays(subDays(new Date(upcomingTournaments[0].date), 3), i);
                                const isEventDay = isSameDay(d, new Date(upcomingTournaments[0].date));
                                return isEventDay ? (
                                    <b key={'d' + d.getTime()} className="bg-gradient-to-r from-[#2b87ff] to-[#7d35ff] text-white text-sm font-black rounded-lg py-1.5 shadow-[0_0_15px_rgba(43,135,255,0.4)]">{format(d, 'd')}</b>
                                ) : (
                                    <b key={'d' + d.getTime()} className="text-[#9eb2d0] text-sm font-bold py-1.5">{format(d, 'd')}</b>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-3 mt-2 border-t border-white/5 pt-4">
                            {upcomingTournaments.map((item) => (
                                <Link key={item.id} href={`/tournaments/${item.id}`} className="flex gap-3 text-xs leading-snug group cursor-pointer">
                                    <strong className="text-[#ffc545] font-black shrink-0 drop-shadow-[0_0_5px_rgba(255,197,69,0.3)]">{format(new Date(item.date), 'M/d (E)', { locale: ja })}</strong>
                                    <span className="text-[#9eb2d0] group-hover:text-white transition-colors line-clamp-1">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </article>

                    {/* Host Card */}
                    <article className="relative flex flex-col justify-center rounded-2xl p-6 border border-white/10 overflow-hidden h-full group bg-[#0a1224] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2b87ff]/20 to-[#e335d7]/20 mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#7d35ff] opacity-20 blur-[50px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-white text-xl font-black mb-2 tracking-tight">大会を主催する方へ</h2>
                            <p className="text-[#dceaff] text-xs font-semibold mb-6 leading-relaxed">
                                <span className="inline-block">全国のボウラーに向けて、</span>
                                <span className="inline-block">あなたの大会を掲載しませんか？</span>
                            </p>
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {[
                                    { icon: "#icon-spark", text: "簡単登録で\nすぐに掲載" },
                                    { icon: "#icon-users", text: "多くのボウラー\nにアプローチ" },
                                    { icon: "#icon-shield", text: "運営サポートで\n安心" }
                                ].map((p, idx) => (
                                    <span key={idx} className="flex flex-col items-center text-center gap-2">
                                        <i className="grid place-items-center w-8 h-8 rounded-full bg-white/10 text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                                            <svg className="w-4 h-4"><use href={p.icon} /></svg>
                                        </i>
                                        <span className="text-[#9eb2d0] text-[10px] font-bold leading-tight whitespace-pre-line group-hover:text-white transition-colors">{p.text}</span>
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto space-y-3">
                                <Link className="flex items-center justify-center gap-2 w-full h-11 text-white border-0 rounded-xl bg-gradient-to-r from-[#2b87ff] to-[#7d35ff] shadow-[0_8px_20px_rgba(43,135,255,0.4)] font-black hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(43,135,255,0.6)] transition-all duration-300 text-[13px]" href="/organizers">
                                    大会を掲載する <svg className="w-3.5 h-3.5"><use href="#icon-arrow" /></svg>
                                </Link>
                                <Link className="flex items-center justify-center gap-1.5 w-full text-[#9eb2d0] text-xs font-bold hover:text-white transition-colors" href="/organizers">
                                    主催者向けページを見る <svg className="w-3 h-3"><use href="#icon-arrow" /></svg>
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Premium CTA Band */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#0f2142] via-[#16123a] to-[#250d30] shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-[10%] w-[400px] h-[400px] bg-[#e335d7] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
                        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-3 tracking-tight drop-shadow-lg leading-snug">
                            あなたにぴったりの大会が<br className="sm:hidden" />きっと見つかる
                        </h2>
                        <p className="text-[#dceaff] text-sm sm:text-base font-bold drop-shadow-md">今すぐ検索して、次の一投につなげよう。</p>
                    </div>
                    
                    <Link className="relative z-10 flex items-center justify-center gap-2.5 h-14 px-10 text-white rounded-full bg-gradient-to-r from-[#e335d7] to-[#7d35ff] shadow-[0_10px_30px_rgba(227,53,215,0.4)] font-black hover:scale-105 hover:shadow-[0_15px_40px_rgba(227,53,215,0.6)] transition-all duration-300 text-[15px] tracking-wide" href="/tournaments">
                        大会を探す <svg className="w-4 h-4"><use href="#icon-arrow" /></svg>
                    </Link>
                    
                    <div className="absolute inset-y-0 right-0 w-[80%] md:w-[60%] pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_30%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_30%)]">
                        <img className="w-full h-full object-cover object-right opacity-30 md:opacity-50 mix-blend-screen group-hover:scale-105 group-hover:-translate-x-2 transition-transform duration-700 ease-out" src="/assets/cta-bowling.png" alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}
