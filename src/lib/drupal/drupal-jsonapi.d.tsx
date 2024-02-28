
export type LayoutParagraphBehaviors = {
  layout: "layout_paragraphs_1_column" | "layout_paragraphs_2_column" | "layout_paragraphs_3_column" | string
  config: { label?: string }
  parent_uuid?: string
  region?: string
}

export type ListParagraphBehaviors = {
  hide_empty?: boolean
  empty_message?: string
}

export type CardParagraphBehaviors = {
  heading?: string
  hide_heading?: boolean
  link_style?: 'action' | 'button'
}

export type ParagraphBehaviors = {
  layout_paragraphs?: LayoutParagraphBehaviors
  list_paragraph?: ListParagraphBehaviors
  su_card_styles?: CardParagraphBehaviors
}
