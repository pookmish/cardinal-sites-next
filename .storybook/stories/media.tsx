import {MediaImage, MediaVideo} from "../../src/lib/gql/__generated__/drupal";

export const ImageMedia = (): MediaImage => {
  return {
    __typename: 'MediaImage',
    mediaImage: {
      url: "https://placekitten.com/1500/1500",
      height: 1500,
      width: 1500,
      alt: "kittens"
    }
  } as MediaImage
}

export const VideoMedia = (): MediaVideo => {
  return {
    __typename: 'MediaVideo',
    mediaOembedVideo: "https://www.youtube.com/watch?v=9P8mASSREYM"
  } as MediaVideo
}