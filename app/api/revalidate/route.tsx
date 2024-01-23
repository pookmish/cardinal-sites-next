import {NextRequest, NextResponse} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";
import {headers} from "next/headers";

// The app router doesn't correctly revalidate the paths on Vercel. This file is meant for testing and future
// implementation when it actually works.
export const GET = async (request: NextRequest) => {
  // Call the headers to prevent the route from getting cached.
  headers();

  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid token'}, {status: 403});
  }
  const path = request.nextUrl.searchParams.get('slug');
  if (!path) {
    return NextResponse.json({message: 'Missing slug'}, {status: 400});
  }
  revalidateTag('paths');
  revalidatePath(path);
  return NextResponse.json({revalidated: true, path, tags: ['paths']});
}