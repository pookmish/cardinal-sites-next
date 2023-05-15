import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import {notFound, redirect} from "next/navigation";
import NodePage from "@/components/nodes/pages/node-page";
import {GetStaticPropsContext, Metadata} from "next";
import {ReactNode} from "react";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

export const revalidate = 300;

export const generateMetadata = async (context): Promise<Metadata> => {
  let node: DrupalNode;
  try {
    node = await getPageData(context);
  } catch (e) {
    return {};
  }

  return {
    title: node.title,
  }
}

class RedirectError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

const getPageData = async (context: GetStaticPropsContext) => {
  const path = await translatePathFromContext(context);

  if (!path || !path.jsonapi) {
    throw new Error('Unable to translate path: ' + JSON.stringify(context));
  }

  // Check for redirect.
  if (path.redirect?.[0].to) {
    const currentPath = '/' + (typeof context.params.slug === 'object' ? context.params.slug.join('/') : context.params.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      throw new RedirectError(destination.to);
    }
  }

  return getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)
}


const Page = async (context: GetStaticPropsContext): Promise<ReactNode> => {
  let node;

  try {
    node = await getPageData(context);
  } catch (e) {
    if (e instanceof RedirectError) {
      redirect(e.message);
    }
    notFound();
  }

  return (
    <NodePage node={node}/>
  )
}

export default Page;