import { useState, useMemo } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tournament } from '@/types';
import Link from 'next/link';

interface CalendarViewProps {
    tournaments: Tournament[];
}

export function CalendarView({ tournaments }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const daysInMonth = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [currentMonth]);

    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <h2 className="text-xl font-bold text-white">
                    {format(currentMonth, 'yyyy年 MMMM', { locale: ja })}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-white/10 rounded-xl overflow-hidden">
                {/* Weekday Headers */}
                {weekDays.map((day, i) => (
                    <div
                        key={day}
                        className={`bg-slate-900 p-3 text-center text-sm font-semibold
                            ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}
                    >
                        {day}
                    </div>
                ))}

                {/* Days */}
                {daysInMonth.map((day, idx) => {
                    const dayTournaments = tournaments.filter(t => isSameDay(new Date(t.date), day));
                    const isCurrentMonth = isSameMonth(day, currentMonth);

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[120px] bg-slate-900 p-2 transition-colors
                                ${!isCurrentMonth ? 'opacity-40' : ''}
                                ${isToday(day) ? 'bg-slate-800/80 ring-1 ring-inset ring-blue-500/50' : ''}
                                hover:bg-slate-800/50`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                                    ${isToday(day) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>
                                    {format(day, 'd')}
                                </span>
                                {dayTournaments.length > 0 && (
                                    <span className="text-xs text-slate-500 font-medium">
                                        {dayTournaments.length}件
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
                                {dayTournaments.map(t => (
                                    <Link key={t.id} href={`/tournaments/${t.id}`}>
                                        <div className="group flex flex-col gap-0.5 p-1.5 rounded-md bg-slate-800/50 border border-white/5 hover:border-blue-500/30 hover:bg-blue-900/20 transition-all cursor-pointer">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0
                                                    ${t.status === '開催予定' ? 'bg-yellow-400' :
                                                        t.status === '受付中' ? 'bg-green-400' :
                                                            t.status === '開催終了' ? 'bg-slate-500' :
                                                                'bg-blue-400'}`}>
                                                </div>
                                                <div className="text-xs text-slate-300 font-medium truncate group-hover:text-blue-300">
                                                    {t.title}
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-slate-500 truncate px-3">
                                                {t.location}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
