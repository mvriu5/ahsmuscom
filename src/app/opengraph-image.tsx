import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Marius Ahsmus'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    const neutonFont = fetch(
        new URL('../../public/Neuton-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse((
        <div
            style={{
            fontSize: 84,
            background: 'linear-gradient(to bottom right, #FFFFFF, #88c2f7)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            fontFamily: '"Neuton"',
            fontWeight: 400,
            letterSpacing: -2
            }}
        >
            Marius Ahsmus
            <p
                style={{
                    fontSize: 64,
                    color: '#000000',
                    margin: 0,
                    marginTop: 20
                }}
            >
                Software Engineer
            </p>
        </div>
    ), {
        ...size,
        fonts: [
            {
                name: 'Neuton',
                data: await neutonFont,
                style: 'normal',
                weight: 400,
            },
        ],
    })
}
