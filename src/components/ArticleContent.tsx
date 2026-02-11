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

    return (
        <div
            ref={ref}
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
