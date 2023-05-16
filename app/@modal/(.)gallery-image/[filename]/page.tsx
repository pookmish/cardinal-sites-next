import InterceptionModal from "@/components/elements/interception-modal";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getResourceCollection} from "@/lib/drupal/get-resource";
import {DrupalFile} from "next-drupal";
import {DrupalGalleryImageMediaType} from "@/lib/types";

const Page = async ({params: {filename}}) => {

  const fileParams = new DrupalJsonApiParams();
  fileParams.addFilter('filename', filename);
  const files = await getResourceCollection<DrupalFile[]>('file--file', {params: fileParams.getQueryObject()});
  if (files.length === 0) return null;

  const file: DrupalFile = files.at(0);

  const mediaParams = new DrupalJsonApiParams();
  mediaParams.addFilter('su_gallery_image.id', file.id);

  const mediaList = await getResourceCollection<DrupalGalleryImageMediaType[]>('media--stanford_gallery_images', {params: mediaParams.getQueryObject()})
  if(mediaList.length === 0) return null;

  const media = mediaList.at(0)

  return (
    <InterceptionModal>
      <div className="h-full w-full">

        <img
          src={file.image_style_uri.responsive_large}
          alt={media.su_gallery_image.resourceIdObjMeta?.alt}
          className="max-w-full h-auto"
        />

        {media.su_gallery_caption &&
          <figcaption>
            {media.su_gallery_caption}
          </figcaption>
        }
      </div>
    </InterceptionModal>
  )
}
export default Page;