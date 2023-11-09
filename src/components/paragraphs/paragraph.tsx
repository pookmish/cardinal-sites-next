import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph";
import EntityParagraph from "@components/paragraphs/stanford-entity/entity-paragraph";
import GalleryParagraph from "@components/paragraphs/stanford-gallery/gallery-paragraph";
import MediaCaptionParagraph from "@components/paragraphs/stanford-media-caption/media-caption-paragraph";
import PersonCtaParagraph from "@components/paragraphs/stanford-person-cta/person-cta-paragraph";
import ScheduleParagraph from "@components/paragraphs/stanford-schedule/schedule-paragraph";
import SpacerParagraph from "@components/paragraphs/stanford-spacer/spacer-paragraph";
import WysiwygParagraph from "@components/paragraphs/stanford-wysiwyg/wysiwyg-paragraph";
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph";
import {getResource} from "@lib/drupal/get-resource";
import ListParagraph from "@components/paragraphs/stanford-lists/list-paragraph";
import {StanfordParagraph} from "@lib/types";
import {JSX} from "react";
import {isDraftMode} from "@lib/drupal/utils";

interface Props {
  paragraph: StanfordParagraph
}

const Paragraph = async ({paragraph}: Props): Promise<JSX.Element | undefined> => {
  const draftMode = isDraftMode()
  paragraph = await getResource<StanfordParagraph>(paragraph.type, paragraph.id, {draftMode});

  switch (paragraph.type) {
    case 'paragraph--stanford_banner':
      return <BannerParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_card':
      return <CardParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_entity':
      return <EntityParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_gallery':
      return <GalleryParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_lists':
      return <ListParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_media_caption':
      return <MediaCaptionParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_person_cta':
      return <PersonCtaParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_schedule':
      return <ScheduleParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_spacer':
      return <SpacerParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_wysiwyg':
      return <WysiwygParagraph paragraph={paragraph}/>
  }
}
export default Paragraph;