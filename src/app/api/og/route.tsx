import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Load Google Font (Noto Sans JP Bold)
const font = fetch(
  new URL('https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 動的に値を受け取る（デフォルト値も設定）
    const title = searchParams.get('title') || 'ボウリングの上達を目指すあなたへ';
    const category = searchParams.get('category') || '初心者ガイド';

    const fontData = await font;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a192f',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 右側の背景画像 */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '60%',
              height: '100%',
              display: 'flex',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1543881477-742a7da306b3?q=80&w=1200&h=630&fit=crop&fm=jpg"
              width="720"
              height="630"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Bowling"
            />
          </div>

          {/* 斜め分割のマスク (SVG) */}
          <svg
            width="1200"
            height="630"
            viewBox="0 0 1200 630"
            style={{ position: 'absolute', left: 0, top: 0 }}
          >
            {/* ダークブルーの斜め背景 */}
            <polygon points="0,0 720,0 520,630 0,630" fill="#0a192f" />
            {/* アクセントライン（青） */}
            <polygon points="700,0 720,0 520,630 500,630" fill="#3b82f6" />
          </svg>

          {/* 左側のコンテンツエリア */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '55%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 60px',
            }}
          >
            {/* カテゴリピル（上部） */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                padding: '8px 24px',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              {category}
            </div>

            {/* タイトル */}
            <div
              style={{
                display: 'flex',
                color: 'white',
                fontSize: '56px',
                fontWeight: 'bold',
                lineHeight: 1.3,
                wordBreak: 'break-word',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </div>
            
            {/* ボトム装飾 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '48px',
                borderTop: '2px solid rgba(255,255,255,0.2)',
                paddingTop: '20px',
                color: '#94a3b8',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              <div style={{ display: 'flex', width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', marginRight: '12px' }}></div>
              BowlingNavi
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'NotoSansJP',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
