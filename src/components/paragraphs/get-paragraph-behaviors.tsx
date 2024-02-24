import {ParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.types";
import {ParagraphInterface} from "@lib/gql/__generated__/drupal";

export const getParagraphBehaviors = (paragraph: ParagraphInterface): ParagraphBehaviors => {
  if (paragraph.behaviors) return JSON.parse(paragraph.behaviors)
  return {}
}