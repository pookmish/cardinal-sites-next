import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getResourceCollection} from "@/lib/drupal/get-resource";
import {notFound} from "next/navigation";
import {DrupalFile} from "next-drupal";
import {DrupalGalleryImageMediaType} from "@/lib/types";

const Page = async ({params: {filename}}) => {

  const fileParams = new DrupalJsonApiParams();
  fileParams.addFilter('filename', filename);
  const files = await getResourceCollection<DrupalFile[]>('file--file', {params: fileParams.getQueryObject()});
  if (files.length === 0) {
    notFound();
  }

  const file: DrupalFile = files.at(0);

  const mediaParams = new DrupalJsonApiParams();
  mediaParams.addFilter('su_gallery_image.id', file.id);

  const mediaList = await getResourceCollection<DrupalGalleryImageMediaType[]>('media--stanford_gallery_images', {params: mediaParams.getQueryObject()})
  const media = mediaList.at(0)

  return (
    <div className="cc mt-32">
      <h1>{media.name}</h1>
      <img
        src={file.image_style_uri.responsive_large}
        alt={media.su_gallery_image.resourceIdObjMeta?.alt}
      />
    </div>
  )
}

export default Page