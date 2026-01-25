import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Marius Ahsmus'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  const neutonFont = fetch(
    new URL('../../public/Neuton-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: 'linear-gradient(to bottom right, #171717, #262626)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e5e5e5',
          fontFamily: '"Neuton"',
          fontWeight: 400,
          letterSpacing: -2
        }}
      >
        Marius Ahsmus
        <p
          style={{
            fontSize: 42,
            color: '#a3a3a3',
            margin: 0,
            marginTop: 20
          }}
        >
          Designer & Developer
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Neuton',
          data: await neutonFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
