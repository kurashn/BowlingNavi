import { Search } from "lucide-react";

interface FilterSidebarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedTypes: string[];
    onTypeChange: (type: string) => void;
    selectedStatuses: string[];
    onStatusChange: (status: string) => void;
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    startDate: string;
    onStartDateChange: (date: string) => void;
    endDate: string;
    onEndDateChange: (date: string) => void;
}

export function FilterSidebar({
    searchQuery,
    onSearchChange,
    selectedTypes,
    onTypeChange,
    selectedStatuses,
    onStatusChange,
    selectedLocation,
    onLocationChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
}: FilterSidebarProps) {
    const handleTypeChange = (type: string) => {
        onTypeChange(type);
    };

    return (
        <div className="space-y-8 bg-[#061124]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b87ff]/50 to-transparent"></div>
            
            <div>
                <h3 className="mb-4 text-xs font-black text-slate-400 uppercase tracking-wider">検索</h3>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-[#2b87ff] transition-colors" />
                    <input
                        type="text"
                        placeholder="キーワード..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-[#0a1224] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#2b87ff] focus:outline-none focus:ring-1 focus:ring-[#2b87ff]/50 transition-all shadow-inner"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-xs font-black text-slate-400 uppercase tracking-wider">大会タイプ</h3>
                <div className="space-y-3">
                    {['プロ公式戦', 'アマチュア', 'プロアマ', 'JB', 'NBF'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                    className="peer appearance-none w-5 h-5 rounded-md border border-white/10 bg-[#0a1224] checked:bg-[#2b87ff] checked:border-[#2b87ff] focus:outline-none focus:ring-2 focus:ring-[#2b87ff]/30 transition-all cursor-pointer"
                                />
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-xs font-black text-slate-400 uppercase tracking-wider">ステータス</h3>
                <div className="space-y-3">
                    {['受付中', '開催予定'].map((status) => (
                        <label key={status} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes(status)}
                                    onChange={() => onStatusChange(status)}
                                    className="peer appearance-none w-5 h-5 rounded-md border border-white/10 bg-[#0a1224] checked:bg-[#2b87ff] checked:border-[#2b87ff] focus:outline-none focus:ring-2 focus:ring-[#2b87ff]/30 transition-all cursor-pointer"
                                />
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-xs font-black text-slate-400 uppercase tracking-wider">開催地</h3>
                <select
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-[#0a1224] py-2.5 px-4 text-sm text-white focus:border-[#2b87ff] focus:outline-none focus:ring-1 focus:ring-[#2b87ff]/50 transition-all shadow-inner appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%2364748b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                    <option value="">すべての地域</option>
                    <option value="大阪">大阪</option>
                    <option value="京都">京都</option>
                    <option value="兵庫">兵庫</option>
                    <option value="滋賀">滋賀</option>
                    <option value="和歌山">和歌山</option>
                    <option value="奈良">奈良</option>
                </select>
            </div>

            <div>
                <h3 className="mb-4 text-xs font-black text-slate-400 uppercase tracking-wider">日程</h3>
                <div className="space-y-3">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-[#0a1224] py-2.5 px-4 text-sm text-slate-300 focus:text-white focus:border-[#2b87ff] focus:outline-none focus:ring-1 focus:ring-[#2b87ff]/50 transition-all shadow-inner [color-scheme:dark]"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-[#0a1224] py-2.5 px-4 text-sm text-slate-300 focus:text-white focus:border-[#2b87ff] focus:outline-none focus:ring-1 focus:ring-[#2b87ff]/50 transition-all shadow-inner [color-scheme:dark]"
                    />
                </div>
            </div>
        </div>
    );
}
