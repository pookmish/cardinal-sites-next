import {BannerParagraphType} from "@lib/types";
import React from "react";
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";

type Props = {
  paragraph: BannerParagraphType
}

const BannerParagraph: React.FC<Props> = ({paragraph}: Props) => {
  const imageUrl = paragraph.su_banner_image?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = paragraph.su_banner_image?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.su_banner_image?.field_media_image?.uri?.base64

  return (
    <BannerParagraphDisplay
      media={imageUrl ? {imageUrl, imageAlt, placeholder} : undefined}
      header={paragraph.su_banner_header}
      supHeader={paragraph.su_banner_sup_header}
      body={paragraph.su_banner_body}
      link={paragraph.su_banner_button}
    />
  )
}
export default BannerParagraph