import React, {HtmlHTMLAttributes} from "react";
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {BannerParagraphType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: BannerParagraphType
}

const BannerParagraph: React.FC<Props> = ({paragraph, ...props}: Props) => {
  const image = paragraph.su_banner_image?.field_media_image
  const imageUrl = image?.uri.url
  const imageAlt = image?.resourceIdObjMeta?.alt || '';

  return (
    <div {...props}>
      <BannerParagraphDisplay
        media={imageUrl ? {imageUrl: buildUrl(imageUrl).toString(), imageAlt} : undefined}
        header={paragraph.su_banner_header}
        supHeader={paragraph.su_banner_sup_header}
        body={paragraph.su_banner_body}
        link={paragraph.su_banner_button}
      />
    </div>
  )
}
export default BannerParagraph