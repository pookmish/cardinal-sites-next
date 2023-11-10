import {
  DrupalFile,
  DrupalMedia,
  DrupalNode,
  DrupalParagraph,
  JsonApiResource,
  DrupalTaxonomyTerm as NextDrupalTaxonomyTerm,
} from "next-drupal";

export type Params = {
  slug: string | string[]
}

export type PageProps = {
  params: Params
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type DrupalTaxonomyTerm = NextDrupalTaxonomyTerm & {
  parent: [{ id: string }]
  below?: DrupalTaxonomyTerm[]
}

export type StanfordNode =
  BasicPageNodeType
  | CourseNodeType
  | PersonNodeType
  | EventNodeType
  | EventSeriesNodeType
  | PublicationNodeType
  | NewsNodeType
  | PolicyNodeType

// Node Types.
export type BasicPageNodeType = DrupalNode & {
  type: "node--stanford_page"
  su_basic_page_type?: DrupalTaxonomyTerm[]
  su_page_banner?: BannerParagraphType
  su_page_components?: StanfordParagraph[]
  su_page_description?: string
  su_page_image?: DrupalImageMediaType
  su_shared_tags?: DrupalTaxonomyTerm[]
  layout_selection?: DrupalLayoutSelectionType
}

export type CourseNodeType = DrupalNode & {
  type: "node--stanford_course"
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

export type EventNodeType = DrupalNode & {
  type: "node--stanford_event"
  body?: string
  su_event_alt_loc?: string
  su_event_audience?: DrupalTaxonomyTerm[]
  su_event_components?: StanfordParagraph[]
  su_event_cta?: DrupalLinkFieldType
  su_event_date_time: DrupalSmartDateFieldType
  su_event_dek?: string
  su_event_email?: string
  su_event_groups?: DrupalTaxonomyTerm[]
  su_event_keywords?: DrupalTaxonomyTerm[]
  su_event_location?: DrupalAddressFieldType
  su_event_map_link?: DrupalLinkFieldType
  su_event_schedule?: EventScheduleParagraphType[]
  su_event_source?: DrupalLinkFieldType
  su_event_sponsor?: string[]
  su_event_subheadline?: string
  su_event_subject?: DrupalTaxonomyTerm[]
  su_event_telephone?: string
  su_event_type?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export type EventSeriesNodeType = DrupalNode & {
  type: "node--stanford_event_series"
  su_event_series_components: StanfordParagraph[]
  su_event_series_dek: string
  su_event_series_event: DrupalNode[]
  su_event_series_subheadline: string
  su_event_series_type: DrupalTaxonomyTerm[]
  su_event_series_weight: number
  su_shared_tags: DrupalTaxonomyTerm[]
}

export type NewsNodeType = DrupalNode & {
  type: "node--stanford_news"
  su_news_banner?: DrupalImageMediaType | DrupalVideoMediaType
  su_news_banner_media_caption?: string
  su_news_byline?: string
  su_news_components?: StanfordParagraph[]
  su_news_dek?: string
  su_news_featured_media?: DrupalImageMediaType
  su_news_publishing_date?: string
  su_news_source?: DrupalLinkFieldType
  su_news_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
  su_news_hide_social?: boolean
}

export type PersonNodeType = DrupalNode & {
  type: "node--stanford_person"
  body?: string
  su_person_academic_appt?: string
  su_person_address?: string
  su_person_admin_appts?: string
  su_person_affiliations?: DrupalLinkFieldType[]
  su_person_components?: StanfordParagraph[]
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

export type PublicationNodeType = DrupalNode & {
  type: "node--stanford_publication"
  su_publication_author_ref: DrupalNode[]
  su_publication_citation: DrupalPublicationCitationType
  su_publication_components?: StanfordParagraph[]
  su_publication_cta?: DrupalLinkFieldType
  su_publication_image?: DrupalImageMediaType
  su_publication_topics?: DrupalTaxonomyTerm[]
  su_shared_tags?: DrupalTaxonomyTerm[]
}

export type PolicyNodeType = DrupalNode & {
  type: "node--stanford_policy"
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

export type PolicyChangeLogType = JsonApiResource & {
  type: 'su_policy_log--su_policy_log'
  su_policy_public: boolean
  su_policy_date: string
  su_policy_notes: string
  su_policy_title: string
}

// Paragraph Types.

export type StanfordParagraph = BannerParagraphType
  | CardParagraphType
  | ImageGalleryParagraphType
  | ListParagraphType
  | EntityTeaserParagraphType
  | MediaCaptionParagraphType
  | WysiwygParagraphType
  | SpacerParagraphType
  | LayoutParagraphType

export type LayoutParagraphsBehaviorsType = {
  layout?: string
  parent_uuid: string
  region: string
  config?: {
    [key: string]: any
  }

}

export type LayoutParagraphsBehavior = {
  layout_paragraphs?: LayoutParagraphsBehaviorsType
}

export type BannerParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_banner"
  behavior_settings?: LayoutParagraphsBehavior & {
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

export type CardParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_card"
  behavior_settings?: LayoutParagraphsBehavior & {
    su_card_styles?: { link_style?: 'action' | 'button' }
  }
  su_card_body?: string
  su_card_header?: string
  su_card_link?: DrupalLinkFieldType
  su_card_media?: DrupalImageMediaType | DrupalVideoMediaType
  su_card_super_header?: string
}

export type ImageGalleryParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_gallery"
  behavior_settings?: LayoutParagraphsBehavior
  su_gallery_button?: DrupalLinkFieldType
  su_gallery_description?: string
  su_gallery_headline?: string
  su_gallery_images: DrupalGalleryImageMediaType[]
}

export type ListParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_lists"
  behavior_settings?: LayoutParagraphsBehavior & {
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

export type EntityTeaserParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_entity"
  behavior_settings?: LayoutParagraphsBehavior
  su_entity_button?: DrupalLinkFieldType
  su_entity_description?: string
  su_entity_headline?: string
  su_entity_item?: DrupalNode[]
}

export type MediaCaptionParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_media_caption"
  behavior_settings?: LayoutParagraphsBehavior
  su_media_caption_caption?: string
  su_media_caption_link?: DrupalLinkFieldType
  su_media_caption_media?: DrupalImageMediaType | DrupalVideoMediaType
}

export type WysiwygParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_wysiwyg"
  behavior_settings?: LayoutParagraphsBehavior
  su_wysiwyg_text?: string
}

export type EventScheduleParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_schedule"
  su_schedule_date_time?: DrupalSmartDateFieldType
  su_schedule_description?: string
  su_schedule_headline?: string
  su_schedule_location?: DrupalAddressFieldType
  su_schedule_url?: DrupalLinkFieldType
  su_schedule_speaker?: SpeakerParagraphType[]
}

export type SpeakerParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_person_cta"
  behavior_settings?: LayoutParagraphsBehavior
  su_person_cta_image?: DrupalImageMediaType
  su_person_cta_link?: DrupalLinkFieldType
  su_person_cta_name?: string
  su_person_cta_title?: string
}

export type SpacerParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_spacer"
  behavior_settings?: LayoutParagraphsBehavior
}

export type LayoutParagraphType = DrupalParagraph & {
  type: "paragraph--stanford_layout"
  behavior_settings: LayoutParagraphsBehavior
}

export type DrupalImageFileType = DrupalFile & {
  type: 'file--file'
  uri: {
    value: string
    url: string
    base64?: string
  }
  image_style_uri: { [key: string]: string }
}

// Media Types.
export type DrupalImageMediaType = DrupalMedia & {
  type: 'media--image'
  field_media_image: DrupalImageFileType
}

export type DrupalVideoMediaType = DrupalMedia & {
  type: 'media--video'
  field_media_oembed_video: string
}

export type DrupalFileMediaType = DrupalMedia & {
  type: 'media--file'
  field_media_file: DrupalFile
}

export type DrupalGalleryImageMediaType = DrupalMedia & {
  type: 'media--stanford_gallery_images'
  su_gallery_caption?: string
  su_gallery_image: DrupalImageFileType
}

export type DrupalEmbeddableMediaType = DrupalMedia & {
  type: 'media--embeddable'
  field_media_embeddable_code?: string
  field_media_embeddable_oembed?: string
}

// Config Pages
export type StanfordConfigPage = GlobalMessageConfigPageType
  | SiteSettingsConfigPageType
  | LockupSettingsConfigPageType
  | LocalFooterConfigPageType
  | SuperFooterConfigPageType

export type GlobalMessageConfigPageType = ErrorMessageConfigPage
  | PlainMessageConfigPage
  | WarningMessageConfigPage
  | InfoMessageConfigPage
  | SuccessMessageConfigPage;

type GlobalMessageConfig = JsonApiResource & {
  type: 'config_pages--stanford_global_message'
  su_global_msg_enabled: boolean
  su_global_msg_link?: DrupalLinkFieldType
  su_global_msg_header?: string
  su_global_msg_label?: string
  su_global_msg_message?: string
}

export type ErrorMessageConfigPage = GlobalMessageConfig & {
  su_global_msg_type: 'error'
}

export type PlainMessageConfigPage = GlobalMessageConfig & {
  su_global_msg_type: 'plain'
}

export type WarningMessageConfigPage = GlobalMessageConfig & {
  su_global_msg_type: 'warning'
}

export type InfoMessageConfigPage = GlobalMessageConfig & {
  su_global_msg_type: 'info'
}

export type SuccessMessageConfigPage = GlobalMessageConfig & {
  su_global_msg_type: 'success'
}

export type SiteSettingsConfigPageType = JsonApiResource & {
  type: 'config_pages--stanford_basic_site_settings'
  su_google_analytics?: string
  su_site_dropdowns?: boolean
  su_site_email?: string
  su_site_menu_levels?: number
  su_site_name?: string
}

export type LockupSettingsConfigPageType = JsonApiResource & {
  type: 'config_pages--lockup_settings',
  su_lockup_enabled?: boolean
  su_line_1?: string
  su_line_2?: string
  su_line_3?: string
  su_line_4?: string
  su_line_5?: string
  su_lockup_options?: 'a' | 'b' | 'd' | 'e' | 'h' | 'i' | 'm' | 'o' | 'p' | 'r' | 's' | 't' | 'none'
  su_upload_logo_image?: DrupalImageFileType
  su_use_theme_logo?: boolean
}

export type LocalFooterConfigPageType = JsonApiResource & {
  type: 'config_pages--stanford_local_footer'
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
  su_local_foot_loc_op?: string
}

export type SuperFooterConfigPageType = JsonApiResource & {
  type: 'config_pages--stanford_super_footer'
  su_super_foot_enabled?: boolean
  su_super_foot_intranet?: DrupalLinkFieldType
  su_super_foot_link?: DrupalLinkFieldType[]
  su_super_foot_text?: string
  su_super_foot_title?: string
}

// Field Structures.
export type DrupalLayoutSelectionType = {
  id: string
  resourceIdObjMeta: {
    drupal_internal__target_id: string
  }
}

export type DrupalWysiwygFieldType = {
  format: string
  processed: string;
  summary?: string;
  value: string;
}

export type DrupalLinkFieldType = {
  options?: object
  title: string
  uri: string;
  url: string
}

export type DrupalSmartDateFieldType = {
  duration: string
  end_value: number
  rrule?: number
  rrule_index?: number
  timezone?: string
  value: number
}

export type DrupalAddressFieldType = {
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

export type DrupalNameFieldType = {
  credentials?: string
  family?: string
  generational?: string
  given?: string
  middle?: string
  title?: string
}

export type DrupalViewFieldType = {
  id: string
  resourceIdObjMeta: {
    arguments?: string
    display_id: string
    drupal_internal__target_id: string
    items_to_display?: string | number
  }
}

// Publication Citation entities.
export type DrupalPublicationCitationType = ArticlePublicationType
  | NewspaperPublicationType
  | BookPublicationType
  | OtherPublicationType
  | ThesisPublicationType

export type ArticlePublicationType = PublicationCitationType & {
  type: 'citation--su_article_journal'
  su_day?: number
  su_doi?: string
  su_issue?: string
  su_month?: number
  su_page?: string
  su_volume?: string

}

export type NewspaperPublicationType = PublicationCitationType & {
  type: 'citation--su_article_newspaper'
  su_day?: number
  su_month?: number
}

export type BookPublicationType = PublicationCitationType & {
  type: 'citation--su_book'
  su_doi?: string
  su_edition?: number
  su_page?: string
  su_publisher_place?: string
  su_subtitle?: string
}

export type OtherPublicationType = PublicationCitationType & {
  type: 'citation--su_other'
  su_day?: number
  su_month?: number
  su_subtitle?: string
}

export type ThesisPublicationType = PublicationCitationType & {
  type: 'citation--su_thesis'
  su_day?: number
  su_doi?: string
  su_genre?: any
  su_month?: number
}

export type PublicationCitationType = JsonApiResource & {
  changed: string
  created: string
  drupal_internal__id: string
  su_author?: DrupalNameFieldType[]
  su_publisher?: string
  su_url?: DrupalLinkFieldType
  su_year?: number
}
