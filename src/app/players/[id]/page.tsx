/* eslint-disable @next/next/no-img-element */
import { MOCK_PLAYERS } from "@/data/mockPlayers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, Star, Mail, ChevronRight, Award, Briefcase, Quote } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PlayerProfilePage({ params }: PageProps) {
    const { id } = await params;
    const player = MOCK_PLAYERS.find((p) => p.id === id);

    if (!player) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section (Premium Dark Mode Style) */}
            <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#020d20]">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(43,135,255,0.15),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(41,210,243,0.1),_transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020d20]/50 to-slate-50"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    <Link href="/columns" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white group">
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        戻る
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
                        {/* Profile Image */}
                        <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover relative z-0" />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left mt-4 md:mt-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full mb-4">
                                <Award className="size-3.5" />
                                プロボウラー / JPBA {player.class} {player.licenseNo}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                                {player.name}
                            </h1>
                            <p className="text-blue-200 text-lg md:text-xl font-medium mb-6 uppercase tracking-widest opacity-80">
                                {player.nameEn}
                            </p>
                            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-8">
                                「{player.catchphrase}」
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                {player.socialLinks?.twitter && (
                                    <a href={player.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="size-12 rounded-full bg-white/5 hover:bg-[#1DA1F2] border border-white/10 flex items-center justify-center transition-colors group/social" aria-label="X (Twitter)">
                                        <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                )}
                                {player.socialLinks?.instagram && (
                                    <a href={player.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="size-12 rounded-full bg-white/5 hover:bg-[#E1306C] border border-white/10 flex items-center justify-center transition-colors group/social" aria-label="Instagram">
                                        <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                        </svg>
                                    </a>
                                )}
                                <Link href="#sponsor" className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm sm:text-base font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-1.5 sm:gap-2 leading-snug text-center">
                                    <Briefcase className="size-4 shrink-0" />
                                    <span>お問い合わせ</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Profile) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Biography & Philosophy */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                プロフィール
                            </h2>
                            <div className="space-y-4 mb-8">
                                {player.biography.map((para, i) => (
                                    <p key={i} className="text-slate-700 leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative">
                                <Quote className="absolute top-4 left-4 size-8 text-blue-100" />
                                <div className="relative z-10 pl-6">
                                    <h3 className="text-sm font-bold text-blue-600 mb-2">My Philosophy</h3>
                                    <p className="text-slate-700 font-medium leading-relaxed italic">
                                        {player.philosophy}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Achievements */}
                        {player.achievements && player.achievements.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                                    主な戦績・実績
                                </h2>
                                <div className="space-y-4">
                                    {player.achievements.map((ach, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                            <div className="text-slate-400 font-bold w-16 shrink-0">{ach.year}</div>
                                            <div className="text-slate-800 font-medium">{ach.title}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 mt-4 text-right">※上記は主な実績の一部です</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Stats & Sponsor) */}
                    <div className="space-y-8">
                        
                        {/* Player Stats */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2 text-xl">
                                <Target className="size-5 text-blue-500" />
                                プレイヤースタッツ
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {player.stats.map((stat, i) => (
                                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                        <div className="text-slate-500 text-xs font-bold mb-1">{stat.label}</div>
                                        <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                                    </div>
                                ))}
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                    <div className="text-slate-500 text-xs font-bold mb-1">利き腕</div>
                                    <div className="text-lg font-black text-slate-800 mt-1">{player.handedness}</div>
                                </div>
                            </div>
                        </div>

                        {/* Sponsor Appeal Box */}
                        <div id="sponsor" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-blue-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">スポンサーシップのご案内</h3>
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                {player.name}プロの活動をご支援いただける企業様・団体様を募集しております。ボウリングを通じた御社のPRやブランディングに貢献いたします。
                            </p>
                            
                            <div className="space-y-6 mb-8">
                                <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">スポンサー様の主なメリット</h4>
                                {player.sponsorshipBenefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <Star className="size-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm mb-1">{benefit.title}</div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact" className="w-full py-3 sm:py-4 px-2 bg-slate-900 hover:bg-blue-600 text-white text-sm sm:text-base font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 sm:gap-2 group shadow-md text-center leading-snug">
                                <Mail className="size-4 shrink-0" />
                                <span>お問い合わせ</span>
                                <ChevronRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <p className="text-[10px] text-slate-400 mt-3 text-center">
                                ※具体的なプラン（金額・露出条件など）については、お問い合わせ後に個別にご案内させていただきます。
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const player = MOCK_PLAYERS.find((p) => p.id === id);

    if (!player) {
        return {
            title: "プロボウラーが見つかりません",
        };
    }

    return {
        title: `${player.name} | ボウナビ プロボウラー名鑑`,
        description: player.catchphrase,
        alternates: {
            canonical: `/players/${player.id}`,
        },
    };
}
