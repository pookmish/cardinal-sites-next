import {NextApiRequest, NextApiResponse} from "next";

// The app router revalidation doesn't work on Vercel, but the pages router does.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  const slug = decodeURIComponent(req.query.slug as string);
  try {
    await res.revalidate(slug)
  } catch (err: unknown) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error('Error revalidating: ' + (err instanceof Error ? err.message : ''));
  }
  return res.json({revalidated: true, path: slug})
}