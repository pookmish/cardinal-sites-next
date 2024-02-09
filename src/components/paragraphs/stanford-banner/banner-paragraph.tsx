import React, {HtmlHTMLAttributes} from "react";
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  return (
    <div {...props}>
      <BannerParagraphDisplay
        imageUrl={paragraph.suBannerImage?.mediaImage.url}
        imageAlt={paragraph.suBannerImage?.mediaImage.alt}
        imageLoading={eagerLoadImage ? 'eager':'lazy'}
        header={paragraph.suBannerHeader}
        supHeader={paragraph.suBannerSupHeader}
        body={paragraph.suBannerBody?.processed}
        link={paragraph.suBannerButton}
      />
    </div>
  )
}
export default BannerParagraph