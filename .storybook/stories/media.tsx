import {DrupalImageMediaType, DrupalVideoMediaType} from "../../src/lib/types";

export const ImageMedia = (): DrupalImageMediaType => {
  return {
    mediaImage: {
      url: "https://placekitten.com/1500/1500",
      height: 1500,
      width: 1500,
      alt: "kittens"
    }
  } as DrupalImageMediaType
}

export const VideoMedia = (): DrupalVideoMediaType => {
  return {
    mediaOembedVideo: "https://www.youtube.com/watch?v=9P8mASSREYM"
  } as DrupalVideoMediaType
}