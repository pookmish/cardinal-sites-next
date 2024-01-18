import {NextRequest} from "next/server";
import {InvalidateViews} from "../invalidate-views";

// Invalidate all view tags.
export const GET = async (request: NextRequest) => {
  return InvalidateViews(request, 'views:stanford_news');
}