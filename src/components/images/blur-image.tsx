import Image, {ImageProps} from "next/image"
import {Suspense} from "react"
import {getImagePlaceholder} from "@lib/utils/get-image-placeholder"

type Props = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  /**
   * Absolute image url path.
   */
  src: string
  /**
   * Url of the image's `tiny_blur` style derivative, used to build the placeholder.
   */
  blurSrc?: string | null
}

/**
 * `next/image` with a blur placeholder derived from the image's `tiny_blur` derivative.
 *
 * Deriving the placeholder fetches from Drupal, which can hold up the server component rendering
 * it. Putting that behind Suspense lets the surrounding page stream with a plain image immediately
 * and swap in the blurred variant once it resolves. Without a `blurSrc` the image renders without
 * a placeholder.
 */
// `alt` is pulled out of the props rather than spread so jsx-a11y can see it on the element.
const BlurImage = ({alt, blurSrc, ...props}: Props) => {
  if (!blurSrc) return <Image alt={alt} {...props} />

  return (
    <Suspense fallback={<Image alt={alt} {...props} />}>
      <ImageWithPlaceholder alt={alt} blurSrc={blurSrc} {...props} />
    </Suspense>
  )
}

const ImageWithPlaceholder = async ({alt, blurSrc, ...props}: Props) => (
  <Image alt={alt} {...props} {...await getImagePlaceholder(blurSrc || undefined)} />
)

export default BlurImage
