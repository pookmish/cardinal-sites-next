import {NextRequest, NextResponse} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";

// The app router doesn't correctly revalidate the paths on Vercel. This file is meant for testing and future
// implementation when it actually works.
export const GET = async (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid token'}, {status: 403});
  }
  const path = request.nextUrl.searchParams.get('slug');
  if (!path) {
    return NextResponse.json({message: 'Missing slug'}, {status: 400});
  }
  const cacheTag = path.replace(/^\//, '').replaceAll('/', ':');

  revalidatePath(path);
  revalidateTag(cacheTag)
  revalidateTag('paths')
  return NextResponse.json({revalidated: true, path, tags: [cacheTag, 'paths']});
}