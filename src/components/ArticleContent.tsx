"use client";

import { useEffect, useRef } from "react";

interface ArticleContentProps {
    html: string;
    className?: string;
}

export default function ArticleContent({ html, className }: ArticleContentProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const container = ref.current;

        const handleClick = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.target as HTMLElement;
            const anchor = target.closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                e.stopPropagation();
                const targetId = href.slice(1);
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        // Use capture phase to intercept before Next.js router
        container.addEventListener("click", handleClick, true);
        return () => {
            container.removeEventListener("click", handleClick, true);
        };
    }, []);

    // WordPressのショートコードをNext.js側でパースしてリッチなUIに変換する
    const processShortcodes = (rawHtml: string) => {
        if (!rawHtml) return "";
        
        // HTMLエンティティ化されたクォーテーションとブラケットを戻す
        let processed = rawHtml
            .replace(/&#91;/g, '[')
            .replace(/&#93;/g, ']')
            .replace(/=&quot;/g, '="')
            .replace(/&quot;/g, '"');
        
        // [cta_btn url="..."]...[/cta_btn] の置換
        processed = processed.replace(
            /\[cta_btn\s+url=["'”]?([^"'”\]]+)["'”]?[^\]]*\]([\s\S]*?)\[\/cta_btn\]/g,
            (match, url, btnText) => {
                return `
                    <div class="not-prose my-10 flex justify-center w-full">
                        <a href="${url}" target="_blank" rel="nofollow noopener noreferrer" class="group relative flex items-center justify-center px-8 py-4 sm:py-5 w-full max-w-md text-lg sm:text-xl font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] hover:-translate-y-1 no-underline">
                            <span class="relative flex items-center justify-center gap-2">
                                ${btnText.replace(/<[^>]*>?/gm, '').trim()}
                                <svg class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </span>
                        </a>
                    </div>
                `;
            }
        );

        // [box_XXX]...[/box_XXX] の置換（背景ボックス装飾）
        processed = processed.replace(
            /\[box_([a-zA-Z0-9]+)\]([\s\S]*?)\[\/box_\1\]/g,
            (match, type, content) => {
                let bgClass = "bg-slate-50 border-slate-200 text-slate-800";
                if (type === "gray") bgClass = "bg-slate-100 border-slate-200 text-slate-800";
                else if (type === "info" || type === "blue") bgClass = "bg-blue-50 border-blue-200 text-blue-900";
                else if (type === "alert" || type === "red") bgClass = "bg-red-50 border-red-200 text-red-900";
                else if (type === "warning" || type === "yellow") bgClass = "bg-amber-50 border-amber-200 text-amber-900";
                else if (type === "success" || type === "green") bgClass = "bg-emerald-50 border-emerald-200 text-emerald-900";

                return `
                    <div class="my-8 p-6 rounded-xl border ${bgClass} shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        ${content}
                    </div>
                `;
            }
        );

        return processed;
    };

    const finalHtml = processShortcodes(html);

    return (
        <div
            ref={ref}
            className={className}
            dangerouslySetInnerHTML={{ __html: finalHtml }}
        />
    );
}
