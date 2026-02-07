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
        <div className="space-y-8">
            <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">検索</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="キーワード..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-900 py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">大会タイプ</h3>
                <div className="space-y-2">
                    {['プロ公式戦', 'アマチュア', 'プロアマ', 'JB', 'NBF'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                                className="rounded border-white/10 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">ステータス</h3>
                <div className="space-y-2">
                    {['開催予定', '開催終了'].map((status) => (
                        <label key={status} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedStatuses.includes(status)}
                                onChange={() => onStatusChange(status)}
                                className="rounded border-white/10 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
                            />
                            <span className={`text-sm group-hover:text-white transition-colors ${status === '開催予定' ? 'text-yellow-400' :
                                status === '受付中' ? 'text-green-400' :
                                    'text-slate-400'
                                }`}>{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">開催地</h3>
                <select
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-900 py-2 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                <h3 className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">日程</h3>
                <div className="space-y-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-900 py-2 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-900 py-2 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]"
                    />
                </div>
            </div>
        </div>
    );
}
