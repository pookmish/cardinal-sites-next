
export type LayoutParagraphBehaviors = {
  layout: string,
  config: { label?: string },
  parent_uuid?: string,
  region?: string
}

export type ListParagraphBehaviors = {
  hide_empty?: boolean
  empty_message?: string
}

export type CardParagraphBehaviors = {
  link_style?: 'action' | 'button'
}

export type ParagraphBehaviors = {
  layout_paragraphs?: LayoutParagraphBehaviors
  list_paragraph?: ListParagraphBehaviors
  su_card_styles?: CardParagraphBehaviors
}
