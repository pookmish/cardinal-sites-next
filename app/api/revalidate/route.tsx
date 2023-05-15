import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export const GET = async (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid token'}, {status: 403});
  }
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({message: 'Missing slug'}, {status: 400});
  }
  revalidatePath(slug)
  return NextResponse.json({revalidated: true});
}