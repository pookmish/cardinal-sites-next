import React, {HtmlHTMLAttributes} from "react";
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  const image = paragraph.suBannerImage?.mediaImage
  const imageUrl = image?.url
  const imageAlt = image?.alt || '';

  return (
    <div {...props}>
      <BannerParagraphDisplay
        media={imageUrl ? {imageUrl, imageAlt, loading: eagerLoadImage ? 'eager' : 'lazy'} : undefined}
        header={paragraph.suBannerHeader}
        supHeader={paragraph.suBannerSupHeader}
        body={paragraph.suBannerBody?.processed}
        link={paragraph.suBannerButton}
      />
    </div>
  )
}
export default BannerParagraph