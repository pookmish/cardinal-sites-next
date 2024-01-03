import React, {HtmlHTMLAttributes} from "react";
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {Image, ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
}

const BannerParagraph: React.FC<Props> = ({paragraph, ...props}: Props) => {
  const image = getMediaFromEntityField<Image>(paragraph.suBannerImage);
  const imageUrl = image?.url
  const imageAlt = image?.alt || '';

  return (
    <div {...props}>
      <BannerParagraphDisplay
        media={imageUrl ? {imageUrl, imageAlt} : undefined}
        header={paragraph.suBannerHeader}
        supHeader={paragraph.suBannerSupHeader}
        body={paragraph.suBannerBody?.processed}
        link={paragraph.suBannerButton}
      />
    </div>
  )
}
export default BannerParagraph