import { Tournament, TournamentStatus } from "@/types";

/**
 * 大会の終了日を推定する。
 * displayDate に「〜16」のような終了日が含まれていれば、それを使用。
 * なければ date（開始日）の翌日を終了日とみなす。
 */
function getEndDate(tournament: Tournament): Date {
    if (tournament.displayDate) {
        // 「2026/1/12〜16」 → 終了日 = 同月の16日
        // 「2026/9/9〜12」 → 終了日 = 同月の12日
        const match = tournament.displayDate.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})〜(\d{1,2})/);
        if (match) {
            const [, year, month, , endDay] = match;
            return new Date(Number(year), Number(month) - 1, Number(endDay), 23, 59, 59);
        }
    }
    // 単日開催 → 当日の23:59を終了とする
    const d = new Date(tournament.date);
    d.setHours(23, 59, 59);
    return d;
}

/**
 * 日付ベースでステータスを自動計算する。
 * - 「受付中」は手動設定のみ（日付からは判定不能）のため、そのまま維持
 * - 終了日を過ぎていれば「開催終了」
 * - それ以外は元のステータスを維持
 */
function computeStatus(tournament: Tournament): TournamentStatus {
    // 「受付中」は運営が手動で設定するステータスなので自動変更しない
    if (tournament.status === '受付中') {
        return '受付中';
    }

    const now = new Date();
    const endDate = getEndDate(tournament);

    if (now > endDate) {
        return '開催終了';
    }

    return tournament.status;
}

/** ステータスが自動計算されたトーナメント一覧 */
export function getTournaments(): Tournament[] {
    return MOCK_TOURNAMENTS.map((t) => ({
        ...t,
        status: computeStatus(t),
    }));
}

const MOCK_TOURNAMENTS: Tournament[] = [
    // 11. ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 JPBA決勝大会
    {
        id: "11",
        title: "ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 JPBA決勝大会",
        date: "2026-10-08T09:00:00Z",
        displayDate: "2026/10/8〜9",
        location: "ラウンドワンスタジアム 堺中央環状店 (大阪)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "要確認（プロ会員向け）",
        organizer: "JPBA、ラウンドワン",
        description: "2026年度のJPBA決勝大会。",
        imageUrl: "/images/tournament_championship.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "JPBA公式サイトまたは各予選会場からエントリー",
        entryRequirements: "プロボウラーまたはアマチュア予選通過者",
        entryStatus: "公式サイトで要確認",
    },
    // 12. ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 FINAL
    {
        id: "12",
        title: "ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 FINAL",
        date: "2026-11-14T09:00:00Z",
        location: "ラウンドワンスタジアム 堺中央環状店 (大阪)",
        type: "プロ公式戦",
        prizePool: "総額1,800万円",
        entryFee: "要確認",
        organizer: "ラウンドワン、JPBA、JAPAN BOWLING",
        description: "2026年度の全国決勝大会。賞金はプロ・アマ問わず全員に贈呈される。",
        imageUrl: "/images/tournament_championship.png",
        status: "受付中",
        maxParticipants: 200,
        currentParticipants: 0,
        sourceUrl: "https://www.round1.co.jp/",
        entryMethod: "JB公式ホームページまたはNBF公式からエントリー（アマチュア予選）",
        entryRequirements: "JPBAプロボウラー資格保持者は不可（プロは別枠）。JB/NBF会員でなくても参加可能",
        entryStatus: "オンライン予選・フリータイム予選にて順次受付",
    },
    // 13. 第19回 MKチャリティカップ 2026
    {
        id: "13",
        title: "第19回 MKチャリティカップ 2026",
        date: "2026-09-26T09:00:00Z",
        displayDate: "2026/9/26〜27",
        location: "MKボウル上賀茂 (京都)",
        type: "プロアマ",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "MKグループ、JPBA",
        description: "2026年度のMKチャリティカップ。",
        imageUrl: "/images/tournament_charity.png",
        status: "開催予定",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/information/tournament/tournament2025/PDF/2026_TournamentSchedule_251128.pdf",
        entryMethod: "大会事務局（075-721-5030）へ問い合わせ、またはJPBA/MKグループ特設サイトから",
        entryRequirements: "アマチュアは事前の予選会を通過した者",
        entryStatus: "要確認（開催時期が近づくと要項公開）",
    },


    // 24. ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 JPBA予選ラウンドJ（滋賀会場）
    {
        id: "24",
        title: "R1 GCB 2026 JPBA予選ラウンドJ（滋賀会場）",
        date: "2026-07-08T09:00:00Z",
        location: "R1スタジアム浜大津アーカス店 (滋賀)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "JPBA",
        description: "R1全国大会のJPBA予選（滋賀予選J）。",
        imageUrl: "/images/tournament_championship.png",
        status: "受付中",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "JB公式またはNBF公式からのアマチュア予選エントリー",
        entryRequirements: "プロ資格を持たないアマチュアボウラー",
        entryStatus: "公式サイトで要確認",
    },
    // 25. 第42回 六甲クイーンズオープンボウリングトーナメント
    {
        id: "25",
        title: "第42回 六甲クイーンズオープントーナメント",
        date: "2026-07-10T09:00:00Z",
        displayDate: "2026/7/10〜11",
        location: "神戸六甲ボウル (兵庫)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "観戦入場料 1,500円(予定)",
        organizer: "JPBA関西・六甲場協会",
        description: "伝統ある女子プロボウリングトーナメント。競技後の丁寧なファンサービスが特徴。",
        imageUrl: "/images/tournament_ladies.png",
        status: "受付中",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "アマチュア予選会からエントリー（本戦は予選通過者のみ）",
        entryRequirements: "プロボウラーまたはアマチュア予選通過者",
        entryStatus: "予選会は別途要確認",
    },
    // 26. ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 JPBA予選ラウンドL（大阪会場）
    {
        id: "26",
        title: "R1 GCB 2026 JPBA予選ラウンドL（大阪会場）",
        date: "2026-09-15T09:00:00Z",
        location: "R1スタジアム堺中央環状店 (大阪)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "JPBA",
        description: "JPBA予選の大阪会場。",
        imageUrl: "/images/tournament_championship.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "JB公式またはNBF公式からのアマチュア予選エントリー",
        entryRequirements: "プロ資格を持たないアマチュアボウラー",
        entryStatus: "公式サイトで要確認",
    },
    // 28. 第59回 全日本新人ボウリング選手権大会
    {
        id: "28",
        title: "第59回 全日本新人ボウリング選手権大会",
        date: "2026-05-29T09:00:00Z",
        displayDate: "2026/5/29〜31",
        location: "MKボウル上賀茂 (京都)",
        type: "JB",
        prizePool: "なし（表彰）",
        entryFee: "要確認",
        organizer: "JAPAN BOWLING",
        description: "各都道府県予選代表が出場する新人戦。",
        imageUrl: "/images/tournament_rookie.png",
        status: "受付中",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
        entryMethod: "各都道府県のボウリング連盟を通じて申し込み",
        entryRequirements: "当該年度のJB登録会員で、入会初年度から3年間（規定あり）",
        entryStatus: "各都道府県連盟にて要確認",
    },
    // 30. 第38回 オールジャパンレディスボウリングトーナメント with MEN
    {
        id: "30",
        title: "第38回 オールジャパンレディス with MEN",
        date: "2026-12-11T09:00:00Z",
        displayDate: "2026/12/11〜13",
        location: "神戸六甲ボウル (兵庫)",
        type: "JB",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "JAPAN BOWLING",
        description: "オールジャパンレディス大会。",
        imageUrl: "/images/tournament_ladies.png",
        status: "開催予定",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
        entryMethod: "各都道府県のボウリング連盟および学生連合を通じて申し込み",
        entryRequirements: "当該年度のJB登録会員（女性、または女性1名+男性1名のペア）",
        entryStatus: "要確認",
    },
    // 31. 文部科学大臣杯 第33回全国高等学校対抗ボウリング選手権大会
    {
        id: "31",
        title: "第33回 全国高校対抗選手権",
        date: "2026-12-19T09:00:00Z",
        displayDate: "2026/12/19〜20",
        location: "MKボウル上賀茂 (京都)",
        type: "JB",
        prizePool: "なし（表彰）",
        entryFee: "要確認",
        organizer: "JAPAN BOWLING",
        description: "高校生ボウラーの頂点を決める団体戦。",
        imageUrl: "/images/tournament_rookie.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
        entryMethod: "所属校のボウリング部（顧問）および都道府県連盟へ申し込み",
        entryRequirements: "当該年度のJB高等学校登録会員またはジュニア会員（満18歳未満）で、同一校の生徒2名でチーム編成",
        entryStatus: "要確認",
    },
    // ジュニアジャパン認定会（西日本地区）
    {
        id: "33",
        title: "ジュニアジャパン認定会（西日本地区）",
        date: "2026-08-17T09:00:00Z",
        displayDate: "2026/8/17〜18",
        location: "神崎川ダイドーボウル (大阪)",
        type: "JB",
        prizePool: "なし",
        entryFee: "要確認",
        organizer: "JB",
        description: "将来のアジア選手権や世界選手権への道が開かれる、次世代選抜事業。",
        imageUrl: "/images/tournament_rookie.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
        entryMethod: "各都道府県連盟からの推薦・選考",
        entryRequirements: "JB会員で中1〜高3（満12歳〜17歳）、連盟代表者の推薦が必要",
        entryStatus: "要確認",
    },
    // 第58回全国大学個人ボウリング選手権
    {
        id: "34",
        title: "第58回 全国大学個人ボウリング選手権",
        date: "2026-09-09T09:00:00Z",
        displayDate: "2026/9/9〜11",
        location: "神戸六甲ボウル (兵庫)",
        type: "JB",
        prizePool: "なし（表彰）",
        entryFee: "要確認",
        organizer: "JB",
        description: "大学ボウラーの個人日本一を決定する大会。",
        imageUrl: "/images/tournament_japan_open.png",
        status: "開催予定",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
        entryMethod: "所属する学生連合や各加盟団体を通じてE-mail等で申し込み",
        entryRequirements: "当該年度の全日本学生ボウリング連合会員または大学在学の個人正会員",
        entryStatus: "要確認",
    },
    // 35. i.o.LEAGUE 2026 (Finished)
    {
        id: "35",
        title: "i.o.LEAGUE 2026",
        date: "2026-01-24T09:00:00Z",
        displayDate: "2026/1/24〜25",
        location: "MKボウル上賀茂 (京都)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "JPBA",
        description: "新時代のチーム対抗プロボウリングリーグ「i.o.LEAGUE」。京都での熱戦。",
        imageUrl: "/images/tournament_japan_open.png",
        status: "開催予定", // computeStatusにより自動的に「開催終了」になります
        maxParticipants: 50,
        currentParticipants: 50,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "一般エントリー不可（選抜プロのみ）",
        entryRequirements: "i.o.LEAGUE所属のプロボウラー",
        entryStatus: "受付終了",
    },
    // 36. スカイAカップ 2026 プロボウリングレディース新人戦 (Upcoming)
    {
        id: "36",
        title: "スカイAカップ 2026 プロボウリングレディース新人戦",
        date: "2026-06-13T09:00:00Z",
        displayDate: "2026/6/13〜14",
        location: "関西エリアボウリング場 (未定)",
        type: "プロ公式戦",
        prizePool: "優勝賞金あり",
        entryFee: "要確認",
        organizer: "JPBA / スカイA",
        description: "次世代のスター候補生たちがぶつかり合う、若手女子プロボウラーの登竜門。",
        imageUrl: "/images/tournament_ladies.png",
        status: "受付中",
        maxParticipants: 120,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
        entryMethod: "JPBA公式サイトより",
        entryRequirements: "規定の年度内にプロ入りした女子プロボウラー、および選抜アマチュア",
        entryStatus: "受付中",
    },
    // 37. 関西アマチュアボウリング選手権 2026
    {
        id: "37",
        title: "関西アマチュアボウリング選手権 2026",
        date: "2026-08-05T09:00:00Z",
        displayDate: "2026/8/5",
        location: "桜橋ボウル (大阪)",
        type: "アマチュア",
        prizePool: "優勝賞品（ボウリング用品一式）および表彰",
        entryFee: "3,000円",
        organizer: "関西ボウリング連盟",
        description: "関西エリアのアマチュアボウラーNo.1を決定する大会。初心者から上級者まで幅広く参加可能。",
        imageUrl: "/images/tournament_amateur.png",
        status: "受付中",
        maxParticipants: 100,
        currentParticipants: 45,
        sourceUrl: "https://example.com/",
        entryMethod: "公式サイトの専用フォームより",
        entryRequirements: "プロ資格を持たないボウラー",
        entryStatus: "絶賛受付中！",
    },
    // 38. NBF 全日本アマチュア選手権 予選会
    {
        id: "38",
        title: "NBF 全日本アマチュア選手権 予選会",
        date: "2026-10-15T09:00:00Z",
        displayDate: "2026/10/15",
        location: "ラウンドワンスタジアム 堺中央環状店 (大阪)",
        type: "アマチュア",
        prizePool: "なし（本戦出場権付与）",
        entryFee: "5,000円",
        organizer: "NBF 日本ボウラーズ連盟",
        description: "全国大会への切符をかけた熱き予選会。各ブロックの上位3名が本戦出場。",
        imageUrl: "/images/tournament_japan_open.png",
        status: "開催予定",
        maxParticipants: 80,
        currentParticipants: 20,
        sourceUrl: "https://example.com/",
        entryMethod: "NBF加盟の各センターにて申し込み",
        entryRequirements: "NBF会員であること",
        entryStatus: "要確認",
    },
];
