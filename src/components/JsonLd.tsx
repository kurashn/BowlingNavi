import { Tournament } from "@/types";

export function JsonLd({ tournament }: { tournament: Tournament }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: tournament.title,
        startDate: tournament.date,
        endDate: tournament.date, // Assuming single day if no end date provided, or calculate if needed
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: tournament.location,
            address: {
                "@type": "PostalAddress",
                addressRegion: "Kansai", // Simplified, ideally parse from location
                addressCountry: "JP",
            },
        },
        image: [tournament.imageUrl],
        description: tournament.description,
        organizer: {
            "@type": "Organization",
            name: tournament.organizer,
            url: tournament.sourceUrl,
        },
        offers: {
            "@type": "Offer",
            price: "0", // Placeholder or parse from entryFee
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
            url: `https://bowlingnavi.com/tournaments/${tournament.id}`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
