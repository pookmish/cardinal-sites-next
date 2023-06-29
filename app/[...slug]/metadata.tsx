import {DrupalNode, DrupalParagraph} from "next-drupal";
import {
  BasicPageNodeType,
  EventNodeType,
  NewsNodeType,
  PersonNodeType,
  PolicyNodeType,
  WysiwygParagraphType
} from "@lib/types";
import {decode} from 'html-entities';

export const getNodeMetadata = (node: DrupalNode) => {
  const defaultData = {
    title: node.title,
  }
  switch (node.type) {
    case 'node--stanford_page':
      return {
        ...getBasicPageMetaData(node as BasicPageNodeType),
        ...defaultData
      }

    case 'node--stanford_news':
      return {
        ...getNewsMetaData(node as NewsNodeType),
        ...defaultData
      }

    case 'node--stanford_event':
      return {
        ...getEventMetaData(node as EventNodeType),
        ...defaultData
      }

    case 'node--stanford_person':
      return {
        ...getPersonMetaData(node as PersonNodeType),
        ...defaultData
      }

    case 'node--stanford_policy':
      return {
        ...getPolicyMetaData(node as PolicyNodeType),
        ...defaultData
      }
  }

  return defaultData;
}

const getBasicPageMetaData = (node: BasicPageNodeType) => {
  const imageUrl = node.su_page_image?.field_media_image?.image_style_uri?.card_956x478 || node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.card_956x478;
  const imageAlt = node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt || node.su_page_banner?.su_banner_image?.field_media_image?.resourceIdObjMeta?.alt;
  const description = node.su_page_description ?? getFirstText(node.su_page_components);

  return {
    description: description,
    openGraph: {
      type: 'website',
      title: node.title,
      description: description,
      images: getOpenGraphImage(imageUrl, imageAlt)
    }
  }
}

const getNewsMetaData = (node: NewsNodeType) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri?.card_956x478 || node.su_news_banner?.field_media_image?.image_style_uri?.card_956x478;
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt || node.su_news_banner?.field_media_image?.resourceIdObjMeta?.alt;
  const description = node.su_news_dek ?? getFirstText(node.su_news_components);

  let publishTime;
  if (node.su_news_publishing_date) {
    publishTime = new Date(node.su_news_publishing_date).toISOString()
  }

  return {
    description: description,
    openGraph: {
      type: 'article',
      title: node.title,
      description: description,
      publishedTime: publishTime ?? null,
      tag: node.su_news_topics?.map(term => term.name) ?? [],
      images: getOpenGraphImage(imageUrl, imageAlt)
    }
  }
}

const getPersonMetaData = (node: PersonNodeType) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.card_956x478;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt;
  const description = node.su_person_full_title ?? getCleanDescription(node.body);

  return {
    description: description,
    openGraph: {
      type: 'profile',
      title: node.title,
      description: description,
      firstName: node.su_person_first_name,
      lastName: node.su_person_last_name,
      images: getOpenGraphImage(imageUrl, imageAlt)
    }
  }
}

const getEventMetaData = (node: EventNodeType) => {
  const description = node.su_event_subheadline ?? getCleanDescription(node.body);

  return {
    description: description,
    openGraph: {
      type: 'website',
      title: node.title,
      description: description,
    }
  }
}

const getPolicyMetaData = (node: PolicyNodeType) => {
  const description = getCleanDescription(node.body?.processed);

  return {
    description: description,
    openGraph: {
      type: 'website',
      title: node.title,
      description: description,
    }
  }
}

const getFirstText = (components: DrupalParagraph[] = []) => {
  const firstWysiwyg: WysiwygParagraphType | undefined = components.find(component => component.type === 'paragraph--stanford_wysiwyg');
  if (firstWysiwyg) {
    return getCleanDescription(firstWysiwyg.su_wysiwyg_text);
  }
}

const getCleanDescription = (description: string = ''): string | undefined => {
  const text = description.replace(/(<([^>]+)>)/gi, " ").replace('/ +/', ' ').split('.').slice(0, 1).join('.') + '.';
  return text.length > 1 ? decode(text) : undefined;
}


const getOpenGraphImage = (imageUrl: string | undefined, imageAlt: string | undefined) => {
  if (imageUrl) {
    return [
      {
        url: imageUrl,
        width: 956,
        height: 478,
        alt: imageAlt,
      }
    ]
  }
  return [];
}