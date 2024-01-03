import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";
import {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordCard} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordCard
}

const CardParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph);

  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined

  if (paragraph.suCardMedia?.__typename === 'MediaImage') {
    imageUrl = paragraph.suCardMedia?.mediaImage.url
    imageAlt = paragraph.suCardMedia?.mediaImage.alt || '';
  }

  if (paragraph.suCardMedia?.__typename == 'MediaVideo') {
    videoUrl = paragraph.suCardMedia?.mediaOembedVideo
  }

  return (
    <div {...props}>
      <CardParagraphDisplay
        media={imageUrl || videoUrl ? {imageUrl, imageAlt, videoUrl} : undefined}
        header={paragraph.suCardHeader}
        supHeader={paragraph.suCardSuperHeader}
        body={paragraph.suCardBody?.processed}
        link={{
          url: paragraph.suCardLink?.url,
          title: paragraph.suCardLink?.title,
          style: behaviors.su_card_styles?.link_style
        }}
      />
    </div>
  )
}

export default CardParagraph
