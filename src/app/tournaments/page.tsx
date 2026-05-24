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
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>(searchParams.get("tab") === "schedule" ? "calendar" : "list");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const initialType = searchParams.get("type");
    const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [prevQ, setPrevQ] = useState(searchParams.get("q") || "");
    if ((searchParams.get("q") || "") !== prevQ) {
        setPrevQ(searchParams.get("q") || "");
        setSearchQuery(searchParams.get("q") || "");
    }

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
    }, [allTournaments, searchQuery, selectedTypes, selectedStatuses, selectedLocation, startDate, endDate]);

    return (
        <div className="relative min-h-screen bg-[#020813] selection:bg-[#3b69ff] selection:text-white pb-24">
            {/* Premium Animated Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,105,255,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(227,53,215,0.05),transparent_40%)] mix-blend-screen pointer-events-none z-0 fixed"></div>
            
            <div className="container relative z-10 mx-auto px-4 py-8 md:py-12">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="relative">
                        <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full"></div>
                        <h1 className="relative text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 tracking-tight">大会一覧</h1>
                        <p className="relative text-slate-400 text-sm md:text-base font-medium">開催予定のボウリング大会を探してエントリーしよう。</p>
                    </div>
                    
                    {/* View Toggle (Desktop Only) */}
                    <div className="hidden sm:flex bg-[#061124]/80 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-bold
                                ${viewMode === 'list' 
                                    ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <LayoutGrid className="size-4" />
                            リスト
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-bold
                                ${viewMode === 'calendar' 
                                    ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
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
                    {/* View Toggle (Mobile Only) */}
                    <div className="flex sm:hidden mb-6 bg-[#061124]/80 backdrop-blur-md border border-white/10 rounded-xl p-1 w-full max-w-sm mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-bold
                                ${viewMode === 'list' 
                                    ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <LayoutGrid className="size-4" />
                            リスト
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-bold
                                ${viewMode === 'calendar' 
                                    ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <CalendarIcon className="size-4" />
                            カレンダー
                        </button>
                    </div>

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
