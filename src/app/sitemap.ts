import { MetadataRoute } from 'next'
import { MOCK_TOURNAMENTS } from '@/data/mockTournaments'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bowling-navi.com' // Replace with actual domain

    // Static pages
    const routes = [
        '',
        '/about',
        '/tournaments',
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
        lastModified: new Date(tournament.date), // Or updated date if available
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...tournaments]
}
