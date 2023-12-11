import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {notFound} from "next/navigation";
import {DrupalGalleryImageMediaType, DrupalImageFileType} from "@lib/types";
import {H1} from "@components/elements/headers";

export const metadata = {
  title: 'Gallery Image',
  robots: {
    index: false
  }
}

const Page = async ({params: {filename}}: { params: { filename: string } }) => {

  const fileParams = new DrupalJsonApiParams();
  fileParams.addFilter('filename', filename);
  const files = await getResourceCollection<DrupalImageFileType>('file--file', {params: fileParams.getQueryObject()});
  if (files.length === 0) {
    notFound();
  }

  const file = files[0];

  const mediaParams = new DrupalJsonApiParams();
  mediaParams.addFilter('su_gallery_image.id', file.id);

  const mediaList = await getResourceCollection<DrupalGalleryImageMediaType>('media--stanford_gallery_images', {params: mediaParams.getQueryObject()})
  const media = mediaList[0]

  return (
    <div className="centered mt-32">
      <H1>{media.name}</H1>

      <figure className="h-full w-fit mx-auto table">
        <picture>
          <img
            src={file.image_style_uri.responsive_large}
            alt={media.su_gallery_image.resourceIdObjMeta?.alt}
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