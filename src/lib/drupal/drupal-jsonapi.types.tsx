import {Link} from "@lib/gql/__generated__/drupal";
import {DrupalFile, JsonApiResource} from "next-drupal";

export type ParagraphBehaviors = {
  layout_paragraphs?: {
    layout: string,
    config: { label?: string },
    parent_uuid?: string,
    region?: string
  }
  list_paragraph?: {
    hide_empty?: boolean
    empty_message?: string
  }
  su_card_styles?: {
    link_style?: 'action' | 'button'
  }
}

export type DrupalImageFileType = DrupalFile & {
  type: 'file--file'
  uri: {
    value: string
    url: string
    base64?: string
  }
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
  su_global_msg_link?: Link
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
  su_local_foot_action?: Link[]
  su_local_foot_address?: DrupalAddressFieldType
  su_local_foot_f_button?: string
  su_local_foot_f_intro?: string
  su_local_foot_f_method?: string
  su_local_foot_f_url?: Link
  su_local_foot_line_1?: string
  su_local_foot_line_2?: string
  su_local_foot_line_3?: string
  su_local_foot_line_4?: string
  su_local_foot_line_5?: string
  su_local_foot_loc_img?: DrupalImageFileType
  su_local_foot_loc_link?: Link
  su_local_foot_pr_co?: string
  su_local_foot_primary?: Link[]
  su_local_foot_prime_h?: string
  su_local_foot_se_co?: string
  su_local_foot_second?: Link[]
  su_local_foot_second_h?: string
  su_local_foot_social?: Link[]
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
  su_super_foot_intranet?: Link
  su_super_foot_link?: Link[]
  su_super_foot_text?: string
  su_super_foot_title?: string
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

export type DrupalRedirect = JsonApiResource & {
  redirect_source: {
    path: string,
    query: []
  },
  redirect_redirect: {
    uri: string,
    title: string,
    options: [],
    target_uuid: string,
    url: string
  },
  status_code: number
}