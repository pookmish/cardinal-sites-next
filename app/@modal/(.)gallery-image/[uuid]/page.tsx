import InterceptionModal from "@components/elements/interception-modal";
import {randomUUID} from "crypto";
import Image from "next/image";
import {getResource} from "@lib/drupal/get-resource";
import {DrupalGalleryImageMediaType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

const Page = async ({params: {uuid}}: { params: { uuid: string } }) => {
  const captionId = randomUUID();
  const media = await getResource<DrupalGalleryImageMediaType>('media--stanford_gallery_images', uuid);
  if (!media) return null;
  return (
    <InterceptionModal aria-labelledby={captionId}>
      <figure className="h-full w-fit mx-auto table">
        <picture>
          <Image
            src={buildUrl(media.su_gallery_image.uri.url).toString()}
            alt={media.su_gallery_image.resourceIdObjMeta?.alt || ''}
            height={media.su_gallery_image.resourceIdObjMeta?.height}
            width={media.su_gallery_image.resourceIdObjMeta?.width}
            className="max-w-full h-auto m-0 p-0"
          />
        </picture>
        {media.su_gallery_caption &&
          <figcaption
            id={captionId}
            className="bg-white text-right p-5 m-0 table-caption caption-bottom">
            {media.su_gallery_caption}
          </figcaption>
        }
      </figure>
    </InterceptionModal>
  )
}
export default Page;