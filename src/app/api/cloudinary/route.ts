import { NextRequest, NextResponse } from 'next/server'
import data from './data.json'

export async function GET(request: NextRequest) {
  const idx = request.nextUrl.searchParams.get('idx')
  let photoId = Number(idx)
  if (!!photoId && !isNaN(photoId)) {
    return NextResponse.json({ data: data[photoId]})
  }
  return NextResponse.json({ data: data, now: Date.now() })
}