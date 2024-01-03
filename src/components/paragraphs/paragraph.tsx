import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph";
import EntityParagraph from "@components/paragraphs/stanford-entity/entity-paragraph";
import GalleryParagraph from "@components/paragraphs/stanford-gallery/gallery-paragraph";
import MediaCaptionParagraph from "@components/paragraphs/stanford-media-caption/media-caption-paragraph";
import SpacerParagraph from "@components/paragraphs/stanford-spacer/spacer-paragraph";
import WysiwygParagraph from "@components/paragraphs/stanford-wysiwyg/wysiwyg-paragraph";
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph";
import ListParagraph from "@components/paragraphs/stanford-lists/list-paragraph";
import {isDraftMode} from "@lib/drupal/utils";
import {StanfordParagraph} from "@lib/types";

const Paragraph = async ({paragraph}: { paragraph: StanfordParagraph }) => {
  const draftMode = isDraftMode()

  const itemProps: Record<string, string> = {}
  if (draftMode) {
    itemProps['data-type'] = paragraph.type || 'unknown';
    itemProps['data-id'] = paragraph.id;
  }

  switch (paragraph.type) {
    case 'paragraph--stanford_banner':
      return <BannerParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_card':
      return <CardParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_entity':
      return <EntityParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_gallery':
      return <GalleryParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_lists':
      return <ListParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_media_caption':
      return <MediaCaptionParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_spacer':
      return <SpacerParagraph paragraph={paragraph} {...itemProps}/>
    case 'paragraph--stanford_wysiwyg':
      return <WysiwygParagraph paragraph={paragraph} {...itemProps}/>
  }
}
export default Paragraph;