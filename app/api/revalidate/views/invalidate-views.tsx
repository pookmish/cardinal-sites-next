import {NextRequest, NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export const InvalidateViews = (request: NextRequest, tags: string | string[]) => {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid token'}, {status: 403});
  }
  if (typeof tags === 'string') tags = [tags];
  tags.forEach(tag => revalidateTag(tag));
  return NextResponse.json({revalidated: true, tags});
}