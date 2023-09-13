import {ListParagraphType} from "@lib/types";
import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import View from "@components/views/view";
import {H2} from "@components/elements/headers";

const ListParagraph = async ({paragraph}: { paragraph: ListParagraphType }) => {
  const viewId: string = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id;
  const displayId: string = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
  let args: string = paragraph.su_list_view?.resourceIdObjMeta?.arguments ?? '';
  const itemsToDisplay: number = parseInt(paragraph.su_list_view?.resourceIdObjMeta?.items_to_display as string) > 0 ? parseInt(paragraph.su_list_view?.resourceIdObjMeta?.items_to_display as string) : 99999;

  const view = <View
    viewId={viewId}
    displayId={displayId}
    itemsToDisplay={itemsToDisplay}
    args={args}
    emptyMessage={paragraph.behavior_settings?.list_paragraph?.empty_message}
    headingLevel={paragraph.su_list_headline ? 'h3' : 'h2'}
  />

  if (paragraph.behavior_settings?.list_paragraph?.hide_empty && view.type() === null) {
    return null;
  }

  return (
    <div className="centered lg:max-w-[980px] flex flex-col gap-10 mb-20">
      {paragraph.su_list_headline &&
        <H2>{paragraph.su_list_headline}</H2>
      }
      {paragraph.su_list_description &&
        <Wysiwyg html={paragraph.su_list_description}/>
      }

      {view}

      {paragraph.su_list_button &&
        <div>
          <Button centered href={paragraph.su_list_button.url}>
            {paragraph.su_list_button.title}
          </Button>
        </div>
      }
    </div>
  )
}


export default ListParagraph;