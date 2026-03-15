"use client";

import { FilterSidebar } from "@/components/FilterSidebar";
import { TournamentCard } from "@/components/TournamentCard";
import { CalendarView } from "@/components/CalendarView";
import { getTournaments } from "@/data/mockTournaments";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Calendar as CalendarIcon } from "lucide-react";

function TournamentsContent() {
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
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

    const handleStatusChange = (status: string) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    const allTournaments = useMemo(() => getTournaments(), []);

    const filteredTournaments = useMemo(() => {
        return allTournaments.filter((tournament) => {
            // Search filter
            const matchesSearch =
                tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tournament.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tournament.organizer.toLowerCase().includes(searchQuery.toLowerCase());

            // Type filter
            const matchesType =
                selectedTypes.length === 0 || selectedTypes.includes(tournament.type);

            // Status filter
            const matchesStatus =
                selectedStatuses.length === 0 || selectedStatuses.includes(tournament.status);

            // Location filter
            const matchesLocation =
                selectedLocation === "" || tournament.location.includes(selectedLocation);

            // Date filter
            const tournamentDate = new Date(tournament.date);
            const matchesStartDate = startDate === "" || tournamentDate >= new Date(startDate);
            const matchesEndDate = endDate === "" || tournamentDate <= new Date(endDate);

            return matchesSearch && matchesType && matchesStatus && matchesLocation && matchesStartDate && matchesEndDate;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [searchQuery, selectedTypes, selectedStatuses, selectedLocation, startDate, endDate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">大会一覧</h1>
                    <p className="text-slate-400">開催予定のボウリング大会を探してエントリーしよう。</p>
                </div>
                
                {/* View Toggle */}
                <div className="flex bg-slate-900 border border-white/10 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium
                            ${viewMode === 'list' 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <LayoutGrid className="size-4" />
                        リスト
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium
                            ${viewMode === 'calendar' 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <CalendarIcon className="size-4" />
                        カレンダー
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <FilterSidebar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedTypes={selectedTypes}
                            onTypeChange={handleTypeChange}
                            selectedStatuses={selectedStatuses}
                            onStatusChange={handleStatusChange}
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
                    {viewMode === 'calendar' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <CalendarView tournaments={filteredTournaments} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    )}
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
