// route handler with secret and slug
import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {NextRequest, NextResponse} from "next/server";
import {getResourceByPath} from "@lib/drupal/get-resource";
import {StanfordNode} from "@lib/types";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const slug = request.nextUrl.searchParams.get('slug')

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.DRUPAL_PREVIEW_SECRET) {
    return NextResponse.json({message: 'Invalid token'}, {status: 401})
  }

  if (!slug) {
    return NextResponse.json({message: 'Invalid slug path'}, {status: 401})
  }

  const node = await getResourceByPath<StanfordNode>(slug, {draftMode: true})

  // If the slug doesn't exist prevent disable draft mode and return
  if (!node) {
    return NextResponse.json({message: 'Invalid slug'}, {status: 401})
  }

  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(slug)
}