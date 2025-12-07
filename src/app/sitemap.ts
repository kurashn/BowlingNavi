import { MetadataRoute } from 'next'
import { MOCK_TOURNAMENTS } from '@/data/mockTournaments'
import { MOCK_ARTICLES } from '@/data/mockArticles'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bowlingnavi.com'

    // Static pages
    const routes = [
        '',
        '/about',
        '/tournaments',
        '/columns',
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
    const tournaments = MOCK_TOURNAMENTS.map((tournament) => ({
        url: `${baseUrl}/tournaments/${tournament.id}`,
        lastModified: new Date(tournament.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Dynamic article pages
    const articles = MOCK_ARTICLES.map((article) => ({
        url: `${baseUrl}/columns/${article.id}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...tournaments, ...articles]
}
