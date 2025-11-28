"use client";

import { FilterSidebar } from "@/components/FilterSidebar";
import { TournamentCard } from "@/components/TournamentCard";
import { MOCK_TOURNAMENTS } from "@/data/mockTournaments";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TournamentsContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            setSearchQuery(query);
        }

        const typeParam = searchParams.get("type");
        if (typeParam) {
            setSelectedTypes([typeParam]);
        }
    }, [searchParams]);

    const handleTypeChange = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const filteredTournaments = useMemo(() => {
        return MOCK_TOURNAMENTS.filter((tournament) => {
            // Search filter
            const matchesSearch =
                tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tournament.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tournament.organizer.toLowerCase().includes(searchQuery.toLowerCase());

            // Type filter
            const matchesType =
                selectedTypes.length === 0 || selectedTypes.includes(tournament.type);

            // Location filter
            const matchesLocation =
                selectedLocation === "" || tournament.location.includes(selectedLocation);

            // Date filter
            const tournamentDate = new Date(tournament.date);
            const matchesStartDate = startDate === "" || tournamentDate >= new Date(startDate);
            const matchesEndDate = endDate === "" || tournamentDate <= new Date(endDate);

            return matchesSearch && matchesType && matchesLocation && matchesStartDate && matchesEndDate;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [searchQuery, selectedTypes, selectedLocation, startDate, endDate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">大会一覧</h1>
                <p className="text-slate-400">開催予定のボウリング大会を探してエントリーしよう。</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <FilterSidebar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedTypes={selectedTypes}
                            onTypeChange={handleTypeChange}
                            selectedLocation={selectedLocation}
                            onLocationChange={setSelectedLocation}
                            startDate={startDate}
                            onStartDateChange={setStartDate}
                            endDate={endDate}
                            onEndDateChange={setEndDate}
                        />
                    </div>
                </aside>

                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTournaments.length > 0 ? (
                            filteredTournaments.map((tournament) => (
                                <TournamentCard key={tournament.id} tournament={tournament} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-500">
                                条件に一致する大会が見つかりませんでした。
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TournamentsPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8 text-white">Loading...</div>}>
            <TournamentsContent />
        </Suspense>
    );
}
