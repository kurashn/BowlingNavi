import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'linear-gradient(to bottom right, #2563eb, #9333ea)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '6px',
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: '20px', height: '20px' }}
                >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="10" cy="9" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="14" cy="9" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}
