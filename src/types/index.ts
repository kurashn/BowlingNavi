export type TournamentType = string;
export type TournamentStatus = '開催予定' | '受付中' | '受付終了' | '完了' | '開催終了';

export interface TournamentResult {
    rank: number;
    playerName: string;
    score: string;
    prize?: number;
}

export interface Tournament {
    id: string;
    title: string;
    date: string; // ISO date string
    displayDate?: string; // Custom display string (e.g., "2025/9/11〜13")
    location: string;
    type: TournamentType;
    entryFee?: string | number;
    prizePool?: string | number;
    organizer: string;
    description: string;
    imageUrl: string;
    status: TournamentStatus;
    maxParticipants?: number;
    currentParticipants?: number;
    results?: TournamentResult[];
    sourceUrl?: string;
}


export interface RecommendedItem {
    id: string;
    name: string;
    price: string;
    description: string;
    affiliateLinks: {
        amazon?: string;
        rakuten?: string;
        moshimo?: string;
    };
    imageUrl: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML content for now
    category: 'Guide' | 'Report' | 'Gear' | 'Technique';
    publishedAt: string;
    thumbnailUrl: string;
    recommendedItems?: RecommendedItem[];
}
