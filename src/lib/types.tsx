import {DrupalFile, DrupalMedia, DrupalNode, DrupalParagraph, DrupalTaxonomyTerm} from "next-drupal";
import {JsonApiResource} from "next-drupal/src/types";

// Node Types.
export interface BasicPageNodeType extends DrupalNode {
  su_basic_page_type?: DrupalTaxonomyTerm[]
  su_page_banner?: BannerParagraphType
  su_page_components?: DrupalParagraph[]
  su_page_description?: string
  su_page_image?: DrupalImageMediaType
  su_shared_tabs?: DrupalTaxonomyTerm[]
  layout_selection?: DrupalLayoutSelectionType
}

export interface CourseNodeType extends DrupalNode {
  body?: string
  su_course_academic_year?: string
  su_course_code?: string
  su_course_id?: number
  su_course_instructors?: string[]
  su_course_link?: DrupalLinkFieldType
  su_course_quarters?: DrupalTaxonomyTerm[]
  su_course_section_units?: string
  su_course_subject?: DrupalTaxonomyTerm
  su_course_tags?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export interface EventNodeType extends DrupalNode {
  body?: string
  su_event_alt_loc?: string
  su_event_audience?: DrupalTaxonomyTerm[]
  su_event_components?: DrupalParagraph[]
  su_event_cta?: DrupalLinkFieldType
  su_event_date_time: DrupalSmartDateFieldType
  su_event_dek?: string
  su_event_email?: string
  su_event_groups?: DrupalTaxonomyTerm[]
  su_event_keywords?: DrupalTaxonomyTerm[]
  su_event_location?: DrupalAddressFieldType
  su_event_map_link?: DrupalLinkFieldType
  su_event_schedule?: DrupalParagraph[]
  su_event_source?: DrupalLinkFieldType
  su_event_sponsor?: string[]
  su_event_subheadline?: string
  su_event_subject?: DrupalTaxonomyTerm[]
  su_event_telephone?: string
  su_event_type?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export interface EventSeriesNodeType extends DrupalNode {
  su_event_series_components: DrupalParagraph[]
  su_event_series_dek: string
  su_event_series_event: DrupalNode[]
  su_event_series_subheadline: string
  su_event_series_type: DrupalTaxonomyTerm[]
  su_event_series_weight: number
  su_shared_tags: DrupalTaxonomyTerm[]
}

export interface NewsNodeType extends DrupalNode {
  su_news_banner?: DrupalImageMediaType | DrupalVideoMediaType
  su_news_banner_media_caption?: string
  su_news_byline?: string
  su_news_components?: DrupalParagraph[]
  su_news_dek?: string
  su_news_featured_media?: DrupalMedia
  su_news_publishing_date?: string
  su_news_source?: DrupalLinkFieldType
  su_news_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
  su_news_hide_social?: boolean
}

export interface PersonNodeType extends DrupalNode {
  body?: string
  su_person_academic_appt?: string
  su_person_address?: string
  su_person_admin_appts?: string
  su_person_affiliations?: DrupalLinkFieldType[]
  su_person_components?: DrupalParagraph[]
  su_person_education?: string[]
  su_person_email?: string
  su_person_fax?: string
  su_person_first_name?: string
  su_person_full_title?: string
  su_person_last_name?: string
  su_person_links?: DrupalLinkFieldType[]
  su_person_location_address?: string
  su_person_location_name?: string
  su_person_mail_code?: string
  su_person_map_url?: DrupalLinkFieldType
  su_person_mobile_phone?: string
  su_person_photo?: DrupalImageMediaType
  su_person_profile_link?: DrupalLinkFieldType
  su_person_research?: string[]
  su_person_research_interests?: string
  su_person_scholarly_interests?: string
  su_person_short_title?: string
  su_person_telephone?: string
  su_person_type_group?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export interface PublicationNodeType extends DrupalNode {
  su_publication_author_ref: DrupalNode[]
  su_publication_citation: DrupalPublicationCitationType
  su_publication_components?: DrupalParagraph[]
  su_publication_cta?: DrupalLinkFieldType
  su_publication_image?: DrupalImageMediaType
  su_publication_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export interface PolicyNodeType extends DrupalNode {
  body?: DrupalWysiwygFieldType
  su_policy_authority?: string
  su_policy_changelog?: PolicyChangeLogType[]
  su_policy_chapter?: string
  su_policy_effective?: string
  su_policy_policy_num?: string
  su_policy_related?: PolicyNodeType[]
  su_policy_subchapter?: string
  su_policy_title?: string
  su_policy_updated?: string
}

export interface PolicyChangeLogType extends JsonApiResource {

}

// Paragraph Types.
export interface LayoutParagraphsBehaviorsType {
  layout_paragraphs: {
    layout?: string
    parent_uuid: string
    region: string
  }
}

export interface DrupalParagraphWithBehaviors extends DrupalParagraph {
  behavior_settings?: LayoutParagraphsBehaviorsType
}

export interface BannerParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
    hero_pattern?: {
      overlay_position?: string
    }
  }
  su_banner_body?: string
  su_banner_button?: DrupalLinkFieldType
  su_banner_header?: string
  su_banner_image?: DrupalImageMediaType
  su_banner_sup_header?: string
}


export interface CardParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
  }
  su_card_body?: string
  su_card_header?: string
  su_card_link?: DrupalLinkFieldType
  su_card_link_display?: string
  su_card_media?: DrupalImageMediaType | DrupalVideoMediaType
  su_card_super_header?: string
}

export interface ImageGalleryParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
  }
  su_gallery_button?: DrupalLinkFieldType
  su_gallery_description?: string
  su_gallery_headline?: string
  su_gallery_images: DrupalGalleryImageMediaType[]
}

export interface ListParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
    list_paragraph?: {
      hide_empty?: boolean
      empty_message?: string
    }
  }
  su_list_button?: DrupalLinkFieldType
  su_list_description?: string
  su_list_headline?: string
  su_list_view: DrupalViewFieldType
}

export interface EntityTeaserParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
  }
  su_entity_button?: DrupalLinkFieldType
  su_entity_description?: string
  su_entity_headline?: string
  su_entity_item?: DrupalNode[]
}

export interface MediaCaptionParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
  }
  su_media_caption_caption?: string
  su_media_caption_link?: DrupalLinkFieldType
  su_media_caption_media?: DrupalImageMediaType | DrupalVideoMediaType
}

export interface WysiwygParagraphType extends DrupalParagraph {
  behavior_settings?: {
    layout_paragraphs?: LayoutParagraphsBehaviorsType
  }
  su_wysiwyg_text?: string
}

export interface EventScheduleParagraphType extends DrupalParagraph {
  su_schedule_date_time?: DrupalSmartDateFieldType
  su_schedule_description?: string
  su_schedule_headline?: string
  su_schedule_location?: DrupalAddressFieldType
  su_schedule_url?: DrupalLinkFieldType
  su_schedule_speaker?: SpeakerParagraphType[]
}

export interface SpeakerParagraphType extends DrupalParagraph {
  su_person_cta_image?: DrupalImageMediaType
  su_person_cta_link?: DrupalLinkFieldType
  su_person_cta_name?: string
  su_person_cta_title?: string
}

export interface DrupalImageFileType extends DrupalFile {
  uri: {
    value: string
    url: string
    base64?: string
  }
  image_style_uri: {[key: string]: string}
}

// Media Types.
export interface DrupalImageMediaType extends DrupalMedia {
  field_media_image: DrupalImageFileType
}

export interface DrupalVideoMediaType extends DrupalMedia {
  field_media_oembed_video: string
}

export interface DrupalFileMediaType extends DrupalMedia {
  field_media_file: DrupalFile
}

export interface DrupalGalleryImageMediaType extends DrupalMedia {
  su_gallery_caption?: string
  su_gallery_image: DrupalImageFileType
}

export interface DrupalEmbeddableMediaType extends DrupalMedia {
  field_media_embeddable_code?: string
  field_media_embeddable_oembed?: string
}

// Config Pages
export interface GlobalMessageConfigPageType extends JsonApiResource {
  su_global_msg_type: string
  su_global_msg_enabled: boolean
  su_global_msg_link?: DrupalLinkFieldType
  su_global_msg_header?: string
  su_global_msg_label?: string
  su_global_msg_message?: string
}

export interface SiteSettingsConfigPageType extends JsonApiResource {
  su_google_analytics?: string
  su_site_dropdowns?: boolean
  su_site_email?: string
  su_site_menu_levels?: number
  su_site_name?: string
}

export interface LockupSettingsConfigPageType extends JsonApiResource {
  su_lockup_enabled?: boolean
  su_line_1?: string
  su_line_2?: string
  su_line_3?: string
  su_line_4?: string
  su_line_5?: string
  su_lockup_options?: string
  su_upload_logo_image?: DrupalImageFileType
  su_use_theme_logo?: boolean
}

export interface LocalFooterConfigPageType extends JsonApiResource {
  su_footer_enabled?: boolean
  su_local_foot_action?: DrupalLinkFieldType[]
  su_local_foot_address?: DrupalAddressFieldType
  su_local_foot_f_button?: string
  su_local_foot_f_intro?: string
  su_local_foot_f_method?: string
  su_local_foot_f_url?: DrupalLinkFieldType
  su_local_foot_line_1?: string
  su_local_foot_line_2?: string
  su_local_foot_line_3?: string
  su_local_foot_line_4?: string
  su_local_foot_line_5?: string
  su_local_foot_loc_img?: DrupalImageFileType
  su_local_foot_loc_link?: DrupalLinkFieldType
  su_local_foot_loc_open?: string
  su_local_foot_pr_co?: string
  su_local_foot_primary?: DrupalLinkFieldType[]
  su_local_foot_prime_h?: string
  su_local_foot_se_co?: string
  su_local_foot_second?: DrupalLinkFieldType[]
  su_local_foot_second_h?: string
  su_local_foot_social?: DrupalLinkFieldType[]
  su_local_foot_sunet_t?: string
  su_local_foot_tr2_co?: string
  su_local_foot_tr_co?: string
  su_local_foot_use_loc?: boolean
  su_local_foot_use_logo?: boolean
}
export interface SuperFooterConfigPageType extends JsonApiResource {
  su_super_foot_enabled?: boolean
  su_super_foot_intranet?: DrupalLinkFieldType
  su_super_foot_link?: DrupalLinkFieldType[]
  su_super_foot_text?: string
  su_super_foot_title?: string
}

// Field Structures.
export interface DrupalLayoutSelectionType {
  id: string
  resourceIdObjMeta: {
    drupal_internal__target_id: string
  }
}

export interface DrupalWysiwygFieldType {
  format: string
  processed: string;
  summary?: string;
  value: string;
}

export interface DrupalLinkFieldType {
  options: object
  title: string
  uri: string;
  url: string
}

export interface DrupalSmartDateFieldType {
  duration: string
  end_value: number
  rrule?: number
  rrule_index?: number
  timezone?: string
  value: number
}

export interface DrupalAddressFieldType {
  additional_name?: string
  address_line1?: string
  address_line2?: string
  administrative_area?: string
  country_code?: string
  family_name?: string
  given_name?: string
  locality?: string
  organization?: string
  postal_code?: string
  sorting_code?: string
}

export interface DrupalNameFieldType {
  credentials?: string
  family?: string
  generational?: string
  given?: string
  middle?: string
  title?: string
}

export interface DrupalViewFieldType{
  id: string
  resourceIdObjMeta: {
    arguments?: string
    display_id: string
    drupal_internal__target_id: string
    items_to_display?: number
  }
}

// Publication Citation entities.
export interface DrupalPublicationCitationType extends JsonApiResource {
  changed: string
  created: string
  drupal_internal__id: string
  su_author?: DrupalNameFieldType[]
  su_day?: number
  su_doi?: string
  su_edition?: number
  su_genre?: any
  su_issue?: string
  su_month?: number
  su_page?: string
  su_publisher?: string
  su_publisher_place?: string
  su_subtitle?: string
  su_url?: DrupalLinkFieldType
  su_volume?: string
  su_year?: number
}

export interface Breadcrumb {
  href: string
  text: string
}
