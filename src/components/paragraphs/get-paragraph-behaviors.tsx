import {ParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.types";
import {ParagraphUnion} from "@lib/gql/__generated__/drupal";

export const getParagraphBehaviors = (paragraph: ParagraphUnion): ParagraphBehaviors => {
  if (paragraph.behaviors) return JSON.parse(paragraph.behaviors)
  return {}
}