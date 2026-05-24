export interface PlayerProfile {
    id: string;
    name: string;
    nameEn: string;
    licenseNo: string;
    class: string;
    catchphrase: string;
    imageUrl: string;
    birthDate: string;
    hometown: string;
    handedness: string;
    turnedPro: string;
    biography: string[];
    philosophy: string;
    achievements: { year: string; title: string }[];
    stats: { label: string; value: string }[];
    sponsorshipBenefits: { title: string; description: string; icon: string }[];
    socialLinks?: {
        twitter?: string;
        instagram?: string;
        youtube?: string;
        website?: string;
    };
}

export const MOCK_PLAYERS: PlayerProfile[] = [
    {
        id: "yamashita-shuto",
        name: "山下 秀人",
        nameEn: "Shuto Yamashita",
        licenseNo: "No.1503",
        class: "64期生",
        catchphrase: "常に進化を続けるストライカー。次世代のボウリング界を牽引する。",
        imageUrl: "/images/yamashita_hideto.jpg",
        birthDate: "1997年10月15日", // 28歳
        hometown: "日本", // 仮データ
        handedness: "右投げ",
        turnedPro: "JPBA64期",
        socialLinks: {
            twitter: "https://x.com/syna1015?s=11&t=xwRfj8hkUXA3F4Vz2g-1Jg",
            instagram: "https://www.instagram.com/syuto.bowling?igsh=MTNyaDhiZWU5Mjl6bg%3D%3D&utm_source=qr"
        },
        biography: [
            "日本プロボウリング協会（JPBA）公認プロボウラー。",
            "幼少期からボウリングに親しみ、数々のアマチュア大会で成績を残したのち、JPBAプロテストに見事合格。",
            "現在は全国のトーナメントに出場しながら、SNSやメディアを通じてボウリングの楽しさを発信し、次世代のボウラー育成や業界の活性化にも尽力している。"
        ],
        philosophy: "「若手だからこそできる、常識にとらわれない挑戦でボウリングの新しい魅力を引き出したい。私の熱いプレーを通じて、同世代やこれからの若い人たちに『ボウリングってこんなにかっこいいスポーツなんだ』と感じてもらうことが目標です。応援してくださる企業様と共に、次世代のボウリング界を牽引する新しい価値を創造していくことが私の使命だと考えています。」",
        achievements: [],
        stats: [
            { label: "最高スコア", value: "300" },
            { label: "公認パーフェクト", value: "3回" },
            { label: "アベレージ", value: "220+" },
        ],
        sponsorshipBenefits: [
            {
                title: "ユニフォームへのロゴ掲出",
                description: "全国各地で開催される公式トーナメント出場時に着用するユニフォームに、貴社のロゴを掲出します。テレビ放送やボウリング専門誌での露出が期待できます。",
                icon: "shirt"
            },
            {
                title: "SNS・メディアでのPR",
                description: "プロボウラーとしての活動報告や日常を発信するSNSにて、貴社製品やサービスをPRします。ボウリングファン層へダイレクトにアプローチ可能です。",
                icon: "smartphone"
            },
            {
                title: "企業イベントへの出演",
                description: "社内レクリエーション（ボウリング大会）へのゲスト参加や、貴社主催のプロチャレンジマッチの開催など、従業員様や顧客向けの特別イベントに協力いたします。",
                icon: "users"
            }
        ]
    }
];
