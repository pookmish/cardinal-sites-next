import InterceptionModal from "@components/elements/interception-modal";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {File, DrupalGalleryImageMediaType} from "@lib/types";
import {randomUUID} from "crypto";


const Page = async ({params: {filename}}: { params: { filename: string } }) => {
  const captionId = randomUUID();
  const fileParams = new DrupalJsonApiParams();
  fileParams.addFilter('filename', filename);
  const files = await getResourceCollection<File[]>('file--file', {params: fileParams.getQueryObject()});
  if (!files || files.length === 0) return null;

  const file: File = files[0];

  const mediaParams = new DrupalJsonApiParams();
  mediaParams.addFilter('su_gallery_image.id', file.id);

  const mediaList = await getResourceCollection<DrupalGalleryImageMediaType[]>('media--stanford_gallery_images', {params: mediaParams.getQueryObject()})
  if (!mediaList || mediaList.length === 0) return null;

  const media = mediaList[0]

  return (
    <InterceptionModal aria-labelledby={captionId}>
      <figure className="h-full w-fit mx-auto table">
        <picture>
          <img
            src={file.image_style_uri.responsive_large}
            alt={media.su_gallery_image.resourceIdObjMeta?.alt ?? ''}
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