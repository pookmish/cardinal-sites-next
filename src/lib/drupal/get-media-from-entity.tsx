import {Maybe, MediaUnion} from "@lib/gql/__generated__/drupal";

export const getMediaFromEntityField = <T, >(field?: Maybe<MediaUnion>): T | undefined => {
  if (!field) return;

  switch (field.__typename) {
    case 'MediaImage':
      return field.mediaImage as unknown as T
    case 'MediaFile':
      return field.mediaFile as unknown as T
  }
}