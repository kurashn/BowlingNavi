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
        <div className="rounded-2xl border border-white/5 bg-[#061124]/80 backdrop-blur-md p-4 sm:p-6 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                    onClick={prevMonth}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                    {format(currentMonth, 'yyyy年 MMMM', { locale: ja })}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 custom-scrollbar">
                <div className="min-w-[600px] grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    {/* Weekday Headers */}
                    {weekDays.map((day, i) => (
                        <div
                            key={day}
                            className={`bg-[#0a1224]/80 backdrop-blur-sm p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold
                                ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}
                        >
                            {day}
                        </div>
                    ))}

                    {/* Days */}
                    {daysInMonth.map((day) => {
                        const dayTournaments = tournaments.filter(t => isSameDay(new Date(t.date), day));
                        const isCurrentMonth = isSameMonth(day, currentMonth);

                        return (
                            <div
                                key={day.toString()}
                                className={`min-h-[90px] sm:min-h-[120px] bg-[#0a1224]/50 backdrop-blur-sm p-1 sm:p-2 transition-colors
                                    ${!isCurrentMonth ? 'opacity-40' : ''}
                                    ${isToday(day) ? 'bg-[#2b87ff]/10 ring-1 ring-inset ring-[#2b87ff]/50' : ''}
                                    hover:bg-white/5`}
                            >
                                <div className="flex items-center justify-between mb-1 sm:mb-2 px-0.5">
                                    <span className={`text-xs sm:text-sm font-black w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full
                                        ${isToday(day) ? 'bg-gradient-to-r from-[#2b87ff] to-[#7d35ff] text-white shadow-[0_0_10px_rgba(43,135,255,0.5)]' : 'text-slate-300'}`}>
                                        {format(day, 'd')}
                                    </span>
                                    {dayTournaments.length > 0 && (
                                        <span className="text-[10px] sm:text-xs text-[#ffc545] font-bold">
                                            {dayTournaments.length}件
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1 overflow-y-auto max-h-[60px] sm:max-h-[80px] custom-scrollbar pr-1">
                                    {dayTournaments.map(t => (
                                        <Link key={t.id} href={`/tournaments/${t.id}`}>
                                            <div className="group flex flex-col gap-0.5 p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5 hover:border-[#2b87ff]/50 hover:bg-[#2b87ff]/10 transition-all cursor-pointer">
                                                <div className="flex items-center gap-1 sm:gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_5px_rgba(255,255,255,0.5)]
                                                        ${t.status === '開催予定' ? 'bg-yellow-400' :
                                                            t.status === '受付中' ? 'bg-green-400' :
                                                                t.status === '開催終了' ? 'bg-slate-500' :
                                                                    'bg-[#2b87ff]'}`}>
                                                    </div>
                                                    <div className="text-[10px] sm:text-xs text-white font-bold truncate group-hover:text-[#2b87ff]">
                                                        {t.title}
                                                    </div>
                                                </div>
                                                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate pl-2 sm:pl-3">
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
