import { RecommendedItem } from "@/types";
import { ShoppingCart } from "lucide-react";

interface AffiliateProductCardProps {
    item: RecommendedItem;
}

export default function AffiliateProductCard({ item }: AffiliateProductCardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
            {/* Product Image */}
            <div className="flex-shrink-0 w-full md:w-48 h-48 bg-[#F7F9FC] rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 group">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="size-12 text-slate-300" />
                        <span className="text-xs text-slate-400 font-medium">商品画像</span>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-[#0A1C3A] mb-2 line-clamp-2 leading-snug">
                        {item.name}
                    </h3>
                    <p className="text-xl font-bold text-[#D4AF37] mb-4">{item.price}</p>
                    <p className="text-[#4A4A4A] text-sm leading-[1.8] mb-6">
                        {item.description}
                    </p>
                </div>

                {/* Affiliate Button */}
                <div>
                    {item.affiliateLinks.rakuten && (
                        <a
                            href={item.affiliateLinks.rakuten}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#BF0000] hover:bg-[#d60000] text-white font-bold text-sm transition-colors shadow-sm"
                        >
                            <ShoppingCart className="size-4" />
                            楽天市場で見る
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
