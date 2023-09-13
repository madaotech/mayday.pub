import { type ImageLoaderProps } from "next/image";

export default function myImageLoader({ src, width }: ImageLoaderProps) {
    // TODO: default get from local, if not found, get from wikipedia
    return src
}