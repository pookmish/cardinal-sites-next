import {NextRequest, NextResponse} from "next/server";

const middleware = (request: NextRequest) => {
  if (process.env.NEXT_PUBLIC_DOMAIN && process.env.NEXT_PUBLIC_DOMAIN !== request.nextUrl.host) {
    const pathName = request.nextUrl.pathname;
    const search = request.nextUrl.search;
    const protocol = request.nextUrl.protocol;
    return NextResponse.redirect(`${protocol}//${process.env.NEXT_PUBLIC_DOMAIN}${pathName}${search}`);
  }
}
export default middleware;