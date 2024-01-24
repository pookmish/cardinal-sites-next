import {NextRequest, NextResponse} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";

export const revalidate = 0;

export const GET = async (request: NextRequest) => {

  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) return NextResponse.json({message: 'Invalid token'}, {status: 403});

  let path = request.nextUrl.searchParams.get('slug');
  if (!path) return NextResponse.json({message: 'Missing slug'}, {status: 400});

  revalidatePath(path);

  const tagsInvalidated = ['paths', `paths:${path}`];
  if (path.startsWith('/views/')) tagsInvalidated.push(path.substring(1).replaceAll('/', ':'))

  tagsInvalidated.map(tag => revalidateTag(tag));

  return NextResponse.json({revalidated: true, path, tags: tagsInvalidated});
}