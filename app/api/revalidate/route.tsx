import {NextRequest, NextResponse} from "next/server"
import {revalidateTag} from "next/cache"
import {getEntityFromPath, getHomePagePath} from "@lib/gql/gql-queries"
import {secretsMatch} from "@lib/utils/security"

export const GET = async (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get("secret")
  if (!(await secretsMatch(secret, process.env.DRUPAL_REVALIDATE_SECRET)))
    return NextResponse.json({message: "Invalid token"}, {status: 403})

  let path = request.nextUrl.searchParams.get("path")
  if (!path) return NextResponse.json({message: "Invalid Path"}, {status: 400})

  if (path.startsWith("/node/")) {
    // Fetch the teaser data to avoid the possibly cached page fetch.
    const {entity} = await getEntityFromPath(path, false, true)
    path = entity?.path || null
    if (!path) return NextResponse.json({message: "Invalid Path"}, {status: 400})
  }

  const tagsInvalidated = path.includes("/tags/") ? [] : [`paths:${path}`]
  if (path.startsWith("/tags/"))
    path
      .substring(6)
      .split("/")
      .map(tag => tagsInvalidated.push(tag))

  // When the home page is saved, it's url slug might be like `/home`. If the home page matches the slug, invalidate
  // the home page path.
  // If Drupal is unreachable the home alias can't be checked, but the path's own tags are still cleared.
  const homePagePath = await getHomePagePath().catch(() => undefined)
  if (homePagePath === path) tagsInvalidated.push("paths:/")

  tagsInvalidated.map(tag => revalidateTag(tag, "max"))

  return NextResponse.json({revalidated: true, tags: tagsInvalidated})
}

export const POST = async (request: NextRequest) => {
  const auth = request.headers.get("Authorization")

  // Check the secret is set first, or this would accept the literal header `Bearer undefined`.
  const secret = process.env.DRUPAL_REVALIDATE_SECRET
  if (!secret || !(await secretsMatch(auth, `Bearer ${secret}`)))
    return NextResponse.json({message: "Invalid token"}, {status: 403})

  // Parse the incoming JSON body
  const {paths, tags} = (await request.json()) as {paths?: string[]; tags?: string[]}
  paths?.map(path => revalidateTag(`paths:${path}`, "max"))
  tags?.map(tag => revalidateTag(tag, "max"))
  return NextResponse.json({revalidated: true, paths, tags})
}
