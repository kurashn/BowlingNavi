"use client";

import React from "react";
import { ArrowRight, Sparkles, BookOpen, ChevronRight, Zap } from "lucide-react";

export function ArticleNoteCTA() {
    return (
        <div className="w-full relative mt-16 mb-8 group">
            {/* Top Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-[#ff007f] to-[#7d35ff] text-white text-[11px] md:text-xs font-black px-6 py-1.5 rounded-full shadow-[0_4px_15px_rgba(255,0,127,0.4)] flex items-center gap-1.5 border border-white/20 whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    この記事を読んだあなたに特別なお知らせ
                </div>
            </div>

            {/* Main Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a1224] to-[#1a0b2e] border-2 border-[#3b69ff]/30 shadow-[0_15px_40px_rgba(0,0,0,0.15)] group-hover:border-[#e335d7]/50 transition-colors duration-500">
                
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3b69ff]/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e335d7]/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col p-6 md:p-8 pt-10">
                    
                    {/* Thumbnail Image */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative mb-6 md:mb-8 group/img border border-white/10 bg-black">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                        <img 
                            src="/images/note_banner_thumb.jpg" 
                            alt="初心者がゼロからプロボウラーを目指す完全ロードマップ" 
                            className="w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 right-3 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-lg">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#ffd700]/20 to-[#ffaa00]/20 border border-[#ffd700]/50 text-[#ffd700] text-xs font-black px-4 py-1.5 rounded-full mb-4 animate-pulse-slow">
                            <Sparkles className="w-3.5 h-3.5" />
                            【期間限定】7月31日まで半額セール実施中！
                        </div>
                        
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black leading-snug tracking-tight mb-4 drop-shadow-md">
                            初心者がゼロから<br className="sm:hidden" />プロボウラーを目指す<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffea75] via-[#ffd700] to-[#ffaa00]">
                                完全ロードマップ
                            </span>
                        </h3>
                        
                        <p className="text-[#9eb2d0] text-sm md:text-[15px] font-medium leading-relaxed mb-8 max-w-lg">
                            つい2ヶ月前に過酷なプロテストを突破した新人プロが、実体験に基づく<strong className="text-white">「絶対に知っておくべき最短ルート」</strong>を赤裸々に公開！もう無駄な練習や道具選びで損をしたくない方へ。
                        </p>

                        {/* CTA Button */}
                        <a 
                            href="https://brain-market.com/u/bownavi/a/b2YDO0UjMgoTZsNWa0JXY" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="relative flex items-center justify-center w-full sm:w-auto min-w-[280px] h-14 md:h-16 rounded-full group/btn overflow-hidden shadow-[0_10px_30px_rgba(227,53,215,0.3)] hover:shadow-[0_15px_40px_rgba(227,53,215,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Button Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#e335d7] via-[#8a34ff] to-[#3b69ff] group-hover/btn:scale-105 transition-transform duration-500"></div>
                            
                            {/* Button Shine Effect */}
                            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover/btn:left-[200%] transition-all duration-1000 ease-in-out"></div>
                            
                            <span className="relative z-10 flex items-center gap-2 text-white text-[15px] md:text-base font-black tracking-wide">
                                Brainで詳しく見る
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <span className="mt-4 text-[#5877ae] text-[11px] font-bold">※Brainのサイトへ移動します</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
