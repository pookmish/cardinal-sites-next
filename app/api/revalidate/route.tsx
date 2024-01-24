import {NextRequest, NextResponse} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";
import {getAllDrupalPaths} from "@lib/drupal/get-paths";

export const revalidate = 0;

export const GET = async (request: NextRequest) => {

  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) return NextResponse.json({message: 'Invalid token'}, {status: 403});

  let path = request.nextUrl.searchParams.get('slug');
  if (!path || path.startsWith('/node/')) return NextResponse.json({message: 'Invalid slug'}, {status: 400});

  console.log('invalidated', path);
  revalidatePath(path);

  const tagsInvalidated = ['paths', `paths:${path}`];
  if (path.startsWith('/views/')) tagsInvalidated.push(path.substring(1).replaceAll('/', ':'))

  tagsInvalidated.map(tag => revalidateTag(tag));

  await getAllDrupalPaths(true);
  return NextResponse.json({revalidated: true, path, tags: tagsInvalidated});
}