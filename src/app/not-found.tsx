import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020d20] flex items-center justify-center relative overflow-hidden selection:bg-[#3b69ff] selection:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(43,135,255,0.15),_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(227,53,215,0.1),_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020d20]/50 to-[#020d20]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-2xl text-center">
        {/* 404 Text Effect */}
        <div className="relative mb-8 inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl rounded-full"></div>
          <h1 className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tighter">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          お探しのページが見つかりません
        </h2>
        
        <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          申し訳ありません。アクセスしようとしたページは削除されたか、URLが変更されたか、現在利用できない可能性があります。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(43,135,255,0.3)] hover:shadow-[0_10px_25px_rgba(43,135,255,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            トップページへ戻る
          </Link>
          
          <Link 
            href="/tournaments"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Search className="size-4" />
            大会を探す
          </Link>
        </div>
      </div>
    </div>
  );
}
