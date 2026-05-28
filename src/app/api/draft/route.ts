import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    // プレビュー用のシークレットキー（後でWordPress側にも設定します）
    if (secret !== 'bowlingnavi_preview_secret') {
        return new Response('Invalid token', { status: 401 });
    }

    if (!slug && !id) {
        return new Response('Missing slug or id', { status: 400 });
    }

    // Draft Modeを有効化
    const draft = await draftMode();
    draft.enable();

    // プレビューページへリダイレクト
    if (id) {
        // IDが渡された場合は動的ルーティング（プレビュー用）へリダイレクト
        redirect(`/preview/${id}`);
    } else {
        // スラッグがある場合は通常ページへリダイレクト
        redirect(`/${slug}`);
    }
}
