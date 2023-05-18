import {DrupalParagraph} from "next-drupal";
import CardParagraph from "@/components/paragraphs/stanford-card/card-paragraph";
import EntityParagraph from "@/components/paragraphs/stanford-entity/entity-paragraph";
import GalleryParagraph from "@/components/paragraphs/stanford-gallery/gallery-paragraph";
import MediaCaptionParagraph from "@/components/paragraphs/stanford-media-caption/media-caption-paragraph";
import PersonCtaParagraph from "@/components/paragraphs/stanford-person-cta/person-cta-paragraph";
import ScheduleParagraph from "@/components/paragraphs/stanford-schedule/schedule-paragraph";
import SpacerParagraph from "@/components/paragraphs/stanford-spacer/spacer-paragraph";
import WysiwygParagraph from "@/components/paragraphs/stanford-wysiwyg/wysiwyg-paragraph";
import BannerParagraph from "@/components/paragraphs/stanford-banner/banner-paragraph";
import {getResource} from "@/lib/drupal/get-resource";
import ListParagraph from "@/components/paragraphs/stanford-lists/list-paragraph";
import {BannerParagraphType, CardParagraphType, EntityTeaserParagraphType, EventScheduleParagraphType, ImageGalleryParagraphType, ListParagraphType, MediaCaptionParagraphType, SpeakerParagraphType, WysiwygParagraphType} from "@/lib/types";

interface Props {
  paragraph: DrupalParagraph
}

const Paragraph = async ({paragraph}: Props) => {
  paragraph = await getResource(paragraph.type, paragraph.id);

  switch (paragraph.type) {
    case 'paragraph--stanford_banner':
      return <BannerParagraph paragraph={paragraph as BannerParagraphType}/>
    case 'paragraph--stanford_card':
      return <CardParagraph paragraph={paragraph as CardParagraphType}/>
    case 'paragraph--stanford_entity':
      return <EntityParagraph paragraph={paragraph as EntityTeaserParagraphType}/>
    case 'paragraph--stanford_gallery':
      return <GalleryParagraph paragraph={paragraph as ImageGalleryParagraphType}/>
    case 'paragraph--stanford_lists':
      return <ListParagraph paragraph={paragraph as ListParagraphType}/>
    case 'paragraph--stanford_media_caption':
      return <MediaCaptionParagraph paragraph={paragraph as MediaCaptionParagraphType}/>
    case 'paragraph--stanford_person_cta':
      return <PersonCtaParagraph paragraph={paragraph as SpeakerParagraphType}/>
    case 'paragraph--stanford_schedule':
      return <ScheduleParagraph paragraph={paragraph as EventScheduleParagraphType}/>
    case 'paragraph--stanford_spacer':
      return <SpacerParagraph paragraph={paragraph}/>
    case 'paragraph--stanford_wysiwyg':
      return <WysiwygParagraph paragraph={paragraph as WysiwygParagraphType}/>
  }
}
export default Paragraph;