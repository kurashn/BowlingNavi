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
    },
    // 12. ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 FINAL
    {
        id: "12",
        title: "ROUND1 GRAND CHAMPIONSHIP BOWLING 2026 FINAL",
        date: "2026-11-14T09:00:00Z",
        location: "ラウンドワンスタジアム 堺中央環状店 (大阪)",
        type: "プロ公式戦",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "ラウンドワン、JPBA、JAPAN BOWLING",
        description: "2026年度の全国決勝大会。男子・女子・各3部門実施。",
        imageUrl: "/images/tournament_championship.png",
        status: "開催予定",
        maxParticipants: 200,
        currentParticipants: 0,
        sourceUrl: "https://www.round1.co.jp/",
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
    },
    // 17. 京都府北部オープン競技大会
    {
        id: "17",
        title: "京都府北部オープン競技大会",
        date: "2026-03-22T09:00:00Z",
        location: "サンケイボウル (京都)",
        type: "JB",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "京都府ボウリング連盟",
        description: "京都府北部のオープン競技大会。",
        imageUrl: "/images/tournament_japan_open.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "", // http://bowling-kyoto.com/ (Temporarily removed due to site down)
    },
    // 20. 京都府ジュニアチャンピオン決定戦
    {
        id: "20",
        title: "京都府ジュニアチャンピオン決定戦",
        date: "2026-03-15T09:00:00Z",
        location: "キョーイチアミューズメントパーク吉祥院 (京都)",
        type: "JB",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "京都府ボウリング連盟",
        description: "京都府のジュニアNo.1を決める大会。",
        imageUrl: "/images/tournament_rookie.png",
        status: "開催予定",
        maxParticipants: 50,
        currentParticipants: 0,
        sourceUrl: "", // http://bowling-kyoto.com/ (Temporarily removed due to site down)
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
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
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
        entryFee: "要確認",
        organizer: "JPBA関西・六甲場協会",
        description: "伝統ある女子プロボウリングトーナメント。",
        imageUrl: "/images/tournament_ladies.png",
        status: "開催予定",
        maxParticipants: 100,
        currentParticipants: 0,
        sourceUrl: "https://www.jpba.or.jp/",
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
        status: "開催予定",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
    },
    // 30. 第38回 オールジャパンレディスボウリングトーナメント with MEN
    {
        id: "30",
        title: "第38回 オールジャパンレディス with MEN",
        date: "2026-12-11T09:00:00Z",
        displayDate: "2026/12/11〜13",
        location: "要確認（2025年大会は川崎グランドボウルで開催）",
        type: "JB",
        prizePool: "要確認",
        entryFee: "要確認",
        organizer: "JAPAN BOWLING",
        description: "オールジャパンレディス大会。会場は未確定（例年12月開催）。",
        imageUrl: "/images/tournament_ladies.png",
        status: "開催予定",
        maxParticipants: 150,
        currentParticipants: 0,
        sourceUrl: "https://www.japan-bowling.or.jp/",
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
    },
    // 32. B-lax CUP KADOMA DOUBLES TOURNAMENT
    {
        id: "32",
        title: "B-lax CUP KADOMA DOUBLES TOURNAMENT",
        date: "2026-03-21T09:00:00Z",
        location: "LOUNGE&BOWL B-lax (大阪府門真市速見町9-9)",
        type: "プロアマ",
        prizePool: "優勝チーム: 記念品・賞金(アマチュアは商品券)、各種景品 / 全員表彰",
        entryFee: "1名 10,000円 (チーム 20,000円)",
        organizer: "LOUNGE&BOWL B-lax",
        description: "予選5ゲーム(Aシフト9:00/Bシフト13:00)、シングルエリミネーション、決勝ステップラダー方式。プロボウラー参加予定。HDCPあり。",
        imageUrl: "/images/tournament_championship.png",
        status: "受付中",
        maxParticipants: 48,
        currentParticipants: 0,
        sourceUrl: "tel:06-6909-2311",
    },
];
