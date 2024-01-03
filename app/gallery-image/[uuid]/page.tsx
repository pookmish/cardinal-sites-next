import {notFound} from "next/navigation";
import {H1} from "@components/elements/headers";
import Image from "next/image";
import {getResource} from "@lib/drupal/get-resource";
import {DrupalGalleryImageMediaType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

export const metadata = {
  title: 'Gallery Image',
  robots: {
    index: false
  }
}

const Page = async ({params: {uuid}}: { params: { uuid: string } }) => {
  const media = await getResource<DrupalGalleryImageMediaType>('media--stanford_gallery_images', uuid);
  if (!media || !media.su_gallery_image.uri.url) notFound();

  return (
    <div className="centered mt-32">
      <H1>{media.su_gallery_image.resourceIdObjMeta?.alt || "Media"}</H1>

      <figure className="h-full w-fit mx-auto table">
        <picture>
          <Image
            src={buildUrl(media.su_gallery_image.uri.url).toString()}
            alt=""
            width={media.su_gallery_image.resourceIdObjMeta?.width}
            height={media.su_gallery_image.resourceIdObjMeta?.height}
            className="max-w-full h-auto m-0 p-0"
          />
        </picture>
        {media.su_gallery_caption &&
          <figcaption
            className="bg-white text-right p-5 m-0 table-caption caption-bottom">
            {media.su_gallery_caption}
          </figcaption>
        }
      </figure>
    </div>
  )
}

export default Page