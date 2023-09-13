/* eslint-disable no-unused-vars */
type Aircraft = {
  href: string
  name: string
}
type ImageType = {
  source: string
  width: number
  height: number
}
export interface ImageProps {
  incident: string
  aircraft: Aircraft,
  location: string
  phase: string
  airport: string
  distance: string
  date: string
  thumbnail: ImageType
  originalimage: ImageType
  extract: string
  extract_html: string
  idx: number
}

export interface SharedModalProps {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}
