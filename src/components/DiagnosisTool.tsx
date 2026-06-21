/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, CheckCircle2, ArrowRight, Target, Footprints, Zap, Settings, ShieldCheck, ChevronLeft } from "lucide-react";

type QuestionId = 'q1' | 'q2' | 'q3' | 'q4';
type ResultId = 'res1' | 'res2' | 'res3' | 'res4';

interface Answer {
    text: string;
    next: QuestionId | ResultId;
    icon?: React.ReactNode;
}

interface Question {
    id: QuestionId;
    title: string;
    description: string;
    answers: Answer[];
}

interface ResultData {
    id: ResultId;
    title: string;
    subtitle: string;
    description: string;
    products: {
        name: string;
        affiliateLink: string;
        imageUrl: string;
        reason: string;
    }[];
    nextArticleUrl: string;
    nextArticleText: string;
}

const QUESTIONS: Record<QuestionId, Question> = {
    q1: {
        id: 'q1',
        title: 'あなたの現在の平均スコアは？',
        description: 'まずは現在のレベルを教えてください。大体の目安でOKです！',
        answers: [
            { text: '100点未満（これから上手くなりたい）', next: 'q2', icon: <Target className="w-5 h-5 text-blue-500" /> },
            { text: '100〜140点（脱初心者を目指す）', next: 'q3', icon: <Zap className="w-5 h-5 text-amber-500" /> },
            { text: '150点以上（中級者レベル）', next: 'q4', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
        ]
    },
    q2: {
        id: 'q2',
        title: 'ボウリング専用の「マイシューズ」は持っていますか？',
        description: 'ボウリング場で毎回靴をレンタルしていますか？',
        answers: [
            { text: '持っていない（毎回レンタルしている）', next: 'res1', icon: <Footprints className="w-5 h-5 text-slate-500" /> },
            { text: 'すでにマイシューズを持っている', next: 'res2', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
        ]
    },
    q3: {
        id: 'q3',
        title: 'カッコいい「カーブ（フック）」を投げてみたいですか？',
        description: 'これからのプレイスタイルや目標を教えてください。',
        answers: [
            { text: 'はい！プロみたいに曲げてみたい', next: 'res2', icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
            { text: 'いいえ。まずは真っ直ぐ安定させたい', next: 'res1', icon: <ArrowRight className="w-5 h-5 text-slate-500" /> },
        ]
    },
    q4: {
        id: 'q4',
        title: '「マイボール」はすでに持っていますか？',
        description: '自分専用のボールを作って投げていますか？',
        answers: [
            { text: '持っていない（ハウスボールを使っている）', next: 'res3', icon: <Settings className="w-5 h-5 text-slate-500" /> },
            { text: 'すでにマイボールを持っている', next: 'res4', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
        ]
    }
};

const RESULTS: Record<ResultId, ResultData> = {
    res1: {
        id: 'res1',
        title: 'まずは足元から！',
        subtitle: 'マイシューズデビューが最優先',
        description: 'レンタルシューズは滑りやすさが毎回違うため、フォームが安定しません。実は、3,000円台のマイシューズを買うだけで「ピタッと止まれる」ようになり、スコアが劇的に上がります！10回行けば元が取れる圧倒的コスパも魅力です。',
        products: [
            {
                name: 'ABS S-380',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Fs-380%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fb-primeiro%2Fi%2F10000040%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【初心者シェアNo.1】最も安くて基本性能がしっかりした王道シューズ。まずはこれを買えば間違いありません。'
            }
        ],
        nextArticleUrl: '/bowling-shoes-recommendation-2026',
        nextArticleText: '他のシューズも見てみる'
    },
    res2: {
        id: 'res2',
        title: 'カーブへの第一歩！',
        subtitle: '入門用マイボールがおすすめ',
        description: 'ボウリング場の備え付けボール（ハウスボール）は構造上、曲がらないように作られています。入門用のマイボール（リアクティブ素材）を作れば、力まなくても面白いように曲がり始めます！ストライクの爽快感が倍増しますよ。',
        products: [
            {
                name: 'Storm トロピカルサージ',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fajimura4861%2Fb07q3m2hm6%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fajimura4861%2Fi%2F12086770%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【世界一売れてる入門ボール】良い香りがするのも特徴！最初の1球目に最適です。'
            },
            {
                name: '1個用ボールバッグ',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Fsb24-df%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fb-primeiro%2Fi%2F10004213%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【必須アイテム】マイボールはボウリング場に置いて帰れないため、持ち運び用のバッグが必ず必要になります。'
            }
        ],
        nextArticleUrl: '/bowling-ball-recommendation-2026',
        nextArticleText: 'マイボールの選び方を詳しく読む'
    },
    res3: {
        id: 'res3',
        title: 'さらにスコアを伸ばす！',
        subtitle: 'ステップアップ用ボールがおすすめ',
        description: 'すでに平均150点を出せるあなたは、基礎がしっかりできています。ハウスボールのままではストライク率に限界が来ます。オイルに強い「リアクティブ素材」のボールに変えれば、ピンアクションが激変し、アベレージ200も夢ではありません！',
        products: [
            {
                name: 'Brunswick ライノ',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Frhino%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fb-primeiro%2Fi%2F10002581%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【コスパ最強】安定した曲がりで暴れない、初心者〜中級者のためのステップアップボール。'
            }
        ],
        nextArticleUrl: '/bowling-ball-recommendation-2026',
        nextArticleText: 'マイボールの選び方を詳しく読む'
    },
    res4: {
        id: 'res4',
        title: 'より快適なプレイを！',
        subtitle: 'メンテナンス＆小物アイテムが必須',
        description: 'すでにマイボールをお持ちのあなたには、スコアを「維持・微調整」するための小物がおすすめです。特にボールクリーナーを使わないと数ヶ月でボールが曲がらなくなってしまいます。',
        products: [
            {
                name: 'ボールクリーナー',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fb-primeiro%2Fbowl-clean%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fb-primeiro%2Fi%2F10000247%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【ボールの寿命を延ばす】レーンの油を取り除き、ボールの寿命（曲がり）を復活させます。'
            },
            {
                name: 'フィッティングテープ',
                affiliateLink: '//af.moshimo.com/af/c/click?a_id=5285587&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbowling-shoes%2F4102%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbowling-shoes%2Fi%2F10000031%2F',
                imageUrl: '//i.moshimo.com/af/i/impression?a_id=5285587&p_id=54&pc_id=54&pl_id=616',
                reason: '【アベレージアップの秘訣】親指の抜けをミリ単位で調整し、失投を防ぐ必須アイテム。'
            }
        ],
        nextArticleUrl: '/how-to-throw-curve-2026',
        nextArticleText: '正しいリリースのコツをおさらいする'
    }
};

export default function DiagnosisTool() {
    const [currentStep, setCurrentStep] = useState<QuestionId | ResultId>('q1');
    const [history, setHistory] = useState<QuestionId[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnswer = (nextStep: QuestionId | ResultId) => {
        setIsAnimating(true);
        setTimeout(() => {
            if (currentStep.startsWith('q')) {
                setHistory([...history, currentStep as QuestionId]);
            }
            setCurrentStep(nextStep);
            setIsAnimating(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    const handleBack = () => {
        if (history.length === 0) return;
        setIsAnimating(true);
        setTimeout(() => {
            const newHistory = [...history];
            const prevStep = newHistory.pop()!;
            setHistory(newHistory);
            setCurrentStep(prevStep);
            setIsAnimating(false);
        }, 300);
    };

    const handleReset = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setHistory([]);
            setCurrentStep('q1');
            setIsAnimating(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    const isResult = currentStep.startsWith('res');

    return (
        <div className="max-w-2xl mx-auto min-h-[400px]">
            {/* Header / Progress */}
            <div className="mb-8 flex items-center justify-between">
                {history.length > 0 && !isResult ? (
                    <button
                        onClick={handleBack}
                        className="flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        前の質問へ戻る
                    </button>
                ) : (
                    <div className="h-6" />
                )}
                {!isResult && (
                    <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Q{history.length + 1}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div
                className={`transition-all duration-300 transform ${
                    isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
                {!isResult ? (
                    // --- QUESTION VIEW ---
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight leading-snug">
                            {QUESTIONS[currentStep as QuestionId].title}
                        </h2>
                        <p className="text-slate-600 mb-10">
                            {QUESTIONS[currentStep as QuestionId].description}
                        </p>
                        <div className="space-y-4">
                            {QUESTIONS[currentStep as QuestionId].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(answer.next)}
                                    className="w-full group relative flex items-center justify-between p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300 text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                            {answer.icon || <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />}
                                        </div>
                                        <span className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                            {answer.text}
                                        </span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // --- RESULT VIEW ---
                    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 md:p-12 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Target className="w-32 h-32" />
                            </div>
                            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold tracking-wider mb-4 border border-white/30">
                                診断結果
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-3">
                                {RESULTS[currentStep as ResultId].title}
                            </h2>
                            <p className="text-xl md:text-2xl font-bold text-blue-50">
                                {RESULTS[currentStep as ResultId].subtitle}
                            </p>
                        </div>
                        
                        <div className="p-6 md:p-10">
                            <div className="bg-slate-50 p-6 rounded-2xl mb-10 border border-slate-100">
                                <p className="text-slate-700 leading-relaxed font-medium">
                                    {RESULTS[currentStep as ResultId].description}
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                                ▼ あなたにおすすめのアイテム ▼
                            </h3>

                            <div className="space-y-6">
                                {RESULTS[currentStep as ResultId].products.map((product, idx) => (
                                    <div key={idx} className="border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all bg-white relative overflow-hidden">
                                        {/* Badge */}
                                        <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-xl">
                                            おすすめ
                                        </div>
                                        <div className="flex items-start gap-4 mb-5 mt-2">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-black text-lg">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h4>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">{product.reason}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="affiliate-wrapper mt-5 flex flex-col items-center">
                                            <a href={product.affiliateLink} target="_blank" rel="nofollow noopener noreferrer" className="btn-affiliate w-full justify-center">
                                                最安値をチェック
                                            </a>
                                            <p className="text-[11px] text-slate-400 mt-2 font-medium">※楽天ポイントが貯まります・人気のサイズはすぐ売り切れます</p>
                                            <img src={product.imageUrl} alt="" loading="lazy" width="1" height="1" style={{ border: "0px" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 space-y-4">
                                <Link
                                    href={RESULTS[currentStep as ResultId].nextArticleUrl}
                                    className="flex items-center justify-center w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors gap-2"
                                >
                                    {RESULTS[currentStep as ResultId].nextArticleText}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <button
                                    onClick={handleReset}
                                    className="flex items-center justify-center w-full px-6 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-600 font-bold rounded-xl transition-colors gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    診断をやり直す
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
