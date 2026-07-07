"use client";

import React from "react";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

export function NotePromotionBanner() {
    return (
        <div className="w-full my-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d114d] to-[#4c1d85] shadow-[0_20px_50px_rgba(76,29,133,0.3)] relative group">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e335d7] opacity-20 blur-[80px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#3b69ff] opacity-20 blur-[80px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-10 gap-6 md:gap-10">
                {/* Image / Icon Side */}
                <div className="w-full sm:w-[280px] md:w-[340px] aspect-[16/9] shrink-0 rounded-2xl overflow-hidden shadow-2xl rotate-[-1deg] group-hover:rotate-[1deg] transition-transform duration-500 bg-white/10 p-2 flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                     <img 
                        src="/images/note_banner_thumb.jpg" 
                        alt="初心者がゼロからプロボウラーを目指す完全ロードマップ" 
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                     />
                     <div className="absolute bottom-2.5 left-0 w-full text-center z-20">
                         <span className="inline-flex items-center gap-1 bg-[#e335d7] text-white text-[11px] md:text-xs font-black px-3 py-1.5 rounded-md shadow-md">
                             <BookOpen className="w-3.5 h-3.5" />
                             Brain記事
                         </span>
                     </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
                    <div className="inline-flex items-center gap-1.5 bg-[#ffd700] text-[#8a6a1c] text-[11px] md:text-xs font-black px-3 py-1 rounded-full mb-4 shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse-slow">
                        <Sparkles className="w-3.5 h-3.5" />
                        【期間限定】7月31日まで半額セール実施中！
                    </div>
                    
                    <h3 className="text-white text-[19px] sm:text-2xl md:text-[28px] font-black leading-tight tracking-tight mb-3 drop-shadow-md">
                        初心者がゼロから<br className="sm:hidden" />プロボウラーを目指す<br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-[#ffea75] to-[#ffd700] bg-clip-text text-transparent">完全ロードマップ</span>
                    </h3>
                    
                    <p className="text-[#dceaff] text-xs sm:text-sm md:text-[15px] font-semibold leading-relaxed mb-6 max-w-[500px] drop-shadow-sm">
                        つい2ヶ月前に過酷なプロテストを突破した新人プロが、実体験に基づく「絶対に知っておくべき最短ルート」を赤裸々に公開！
                    </p>

                    <a 
                        href="https://brain-market.com/u/bownavi/a/b2YDO0UjMgoTZsNWa0JXY" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e335d7] to-[#8a34ff] text-white h-12 md:h-14 px-6 md:px-8 rounded-full font-black text-sm md:text-[15px] shadow-[0_10px_25px_rgba(227,53,215,0.4)] hover:shadow-[0_15px_35px_rgba(227,53,215,0.6)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group/btn"
                    >
                        Brainで記事を読む
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
