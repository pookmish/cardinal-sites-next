import {ListParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import Button from "@/components/elements/button";
import View from "@/components/views/view";

const ListParagraph = async ({paragraph}: { paragraph: ListParagraphType }) => {
  const viewId: string = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id;
  const displayId: string = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
  let args: string = paragraph.su_list_view?.resourceIdObjMeta?.arguments ?? '';
  const itemsToDisplay: number = paragraph.su_list_view?.resourceIdObjMeta?.items_to_display;

  const view = <View
    viewId={viewId}
    displayId={displayId}
    itemsToDisplay={itemsToDisplay}
    args={args}
    emptyMessage={paragraph.behavior_settings?.list_paragraph?.empty_message}
  />

  if (paragraph.behavior_settings?.list_paragraph?.hide_empty && view.type() === null) {
    return null;
  }

  return (
    <div className="cc lg:max-w-[980px] mx-auto">
      {paragraph.su_list_headline &&
        <h2>{paragraph.su_list_headline}</h2>
      }
      {paragraph.su_list_description &&
        <Wysiwyg html={paragraph.su_list_description} className="mb-20"/>
      }

      {(viewId && displayId) &&
        <div className="mb-20">
          {view}
        </div>
      }

      {paragraph.su_list_button &&
        <Button centered href={paragraph.su_list_button.url}>
          {paragraph.su_list_button.title}
        </Button>
      }
    </div>
  )
}


export default ListParagraph;