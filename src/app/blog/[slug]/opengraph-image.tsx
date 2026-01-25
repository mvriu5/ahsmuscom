import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import type { SanityDocument } from 'next-sanity'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Blog Post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{title}`

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params)
  // Font
  const neutonFont = fetch(
    new URL('../../../../public/Neuton-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
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
          textAlign: 'center',
          padding: '60px'
        }}
      >
        <p style={{ fontSize: 36, color: '#a3a3a3', margin: 0, marginBottom: 30 }}>Marius Ahsmus | Blog</p>
        <p style={{ margin: 0, letterSpacing: -2 }}>{post.title}</p>
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
