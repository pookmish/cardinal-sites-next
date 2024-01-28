import {draftMode} from 'next/headers'
import {redirect} from "next/navigation";

export const revalidate = 0;

export async function GET() {
  draftMode().disable()
  redirect('/');
}