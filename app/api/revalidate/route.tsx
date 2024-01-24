import {NextRequest, NextResponse} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {addValidPath} from "@lib/drupal/get-paths";

export const revalidate = 0;

export const GET = async (request: NextRequest) => {

  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) return NextResponse.json({message: 'Invalid token'}, {status: 403});

  let path = request.nextUrl.searchParams.get('slug');
  if (!path || path.startsWith('/node/')) return NextResponse.json({message: 'Invalid slug'}, {status: 400});

  revalidatePath(path);

  const tagsInvalidated = ['paths', `paths:${path}`];
  if (path.startsWith('/views/')) tagsInvalidated.push(path.substring(1).replaceAll('/', ':'))

  tagsInvalidated.map(tag => revalidateTag(tag));

  if (!path.startsWith('/views/')) {
    const {redirect, entity} = await getEntityFromPath(path);
    if (redirect) {
      await addValidPath(path, 'redirect')
      await addValidPath(redirect.url, 'node')
    }
    if (entity) {
      await addValidPath(entity.path, 'node')
    }

  }

  return NextResponse.json({revalidated: true, path, tags: tagsInvalidated});
}