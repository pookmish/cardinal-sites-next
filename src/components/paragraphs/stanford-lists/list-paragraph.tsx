import {ListParagraphType} from "@/lib/types";

const ListParagraph = ({paragraph}:{paragraph:ListParagraphType}) => {
  return (
    <div>
      {paragraph.id}
    </div>
  )
}

export default ListParagraph;