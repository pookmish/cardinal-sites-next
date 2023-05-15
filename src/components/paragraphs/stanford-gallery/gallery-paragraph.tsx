import {ImageGalleryParagraphType} from "@/lib/types";

const GalleryParagraph = ({paragraph}: { paragraph: ImageGalleryParagraphType }) => {
  return (
    <div className="cc lg:max-w-[980px]">
      {paragraph.type}
    </div>
  )
}
export default GalleryParagraph