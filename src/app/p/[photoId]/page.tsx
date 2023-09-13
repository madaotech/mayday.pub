"use client";

import Head from 'next/head'
import Carousel from '@/components/Carousel'
import type { ImageProps } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function PhotoId({ params }: { params: { photoId: string } }) {
  const photoId = params.photoId
  let index = Number(photoId)
  const [currentPhoto, setCurrentPhoto] = useState<ImageProps>()
  useEffect(() => {
    async function doGetData(idx: number) {
      const { data } = await getData(idx)
      setCurrentPhoto(data)
    }
    doGetData(index)
  }, [index])
  // TODO add loading
  if (currentPhoto === undefined) return (<div>Loading...</div>)
  return (
    <>
      <Head>
        <title>{currentPhoto?.aircraft.name}</title>
        <meta property="og:image" content={currentPhoto?.thumbnail.source} />
        <meta name="twitter:image" content={currentPhoto?.thumbnail.source} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

async function getData(idx: number) {
  const res = await fetch(`/api/cloudinary?idx=${idx}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

