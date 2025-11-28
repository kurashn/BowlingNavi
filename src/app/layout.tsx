import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "BowlingNavi -ボウナビ- | 関西のボウリング大会情報サイト",
        template: "%s | BowlingNavi -ボウナビ-",
    },
    description: "関西エリア（大阪・京都・兵庫など）のボウリング大会情報を網羅。プロ公式戦からアマチュア大会まで、日程やレベルに合わせて検索・エントリーできます。",
    keywords: ["ボウリング", "大会", "関西", "大阪", "京都", "アマチュア", "プロボウラー", "スケジュール"],
    openGraph: {
        type: "website",
        locale: "ja_JP",
        url: "https://bowling-navi.com/", // Replace with actual domain
        title: "BowlingNavi -ボウナビ- | 関西のボウリング大会情報サイト",
        description: "関西エリアのボウリング大会情報を網羅。あなたにぴったりの大会が見つかります。",
        siteName: "BowlingNavi -ボウナビ-",
        images: [
            {
                url: "/og-image.png", // Needs to be created or added
                width: 1200,
                height: 630,
                alt: "BowlingNavi -ボウナビ-",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "BowlingNavi -ボウナビ-",
        description: "関西エリアのボウリング大会情報を網羅。",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className="dark">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
