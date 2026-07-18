import { MetadataRoute } from 'next'
import { getTournaments } from '@/data/mockTournaments'
import { getWPPosts } from '@/lib/wordpress'
import { MOCK_PLAYERS } from '@/data/mockPlayers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.bowlingnavi.com'

    // Static pages
    const routes = [
        '',
        '/about',
        '/tournaments',
        '/columns',
        '/organizers',
        '/contact',
        '/terms',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic tournament pages
    const tournaments = getTournaments().map((tournament) => ({
        url: `${baseUrl}/tournaments/${tournament.id}`,
        lastModified: new Date(tournament.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Dynamic article pages（全記事を取得。デフォルトは9件のみのため perPage を明示）
    const wpArticles = await getWPPosts({ perPage: 100 });
    const articles = wpArticles.posts.map((article) => ({
        url: `${baseUrl}/${article.id}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic player pages
    const players = MOCK_PLAYERS.map((player) => ({
        url: `${baseUrl}/players/${player.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...routes, ...tournaments, ...articles, ...players]
}
