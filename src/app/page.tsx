'use client';

import Modal from '@/components/Modal'
import { ImageProps } from '@/lib/types'
import { useLastViewedPhoto } from '@/lib/useLastViewedPhoto'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const searchParams = useSearchParams()
  const photoId = searchParams.get('photoId')
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  const [images, setImages] = useState<ImageProps[]>([])

  useEffect(() => {
    async function doGetData() {
      const { data } = await getData();
      setImages(data)
    }
    doGetData();
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])
  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId)
          }}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map(({ idx, aircraft, thumbnail }) => {
          return (
            <Link
              key={idx}
              href={aircraft.href}
              as={`/p/${idx}`}
              ref={idx === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                unoptimized
                placeholder="blur"
                blurDataURL={thumbnail.source}
                src={`${thumbnail.source}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
              />
            </Link>
          )
        })}
      </div>
    </main>
  )
}

async function getData() {
  const res = await fetch('/api/cloudinary')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
