import {ListParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import Button from "@/components/elements/button";
import {getView} from "@/lib/drupal/get-view";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {DrupalNode, DrupalView} from "next-drupal";
import View from "@/components/views/view";

const ListParagraph = async ({paragraph}: { paragraph: ListParagraphType }) => {
  const viewId: string = paragraph.su_list_view?.resourceIdObjMeta?.drupal_internal__target_id;
  const displayId: string = paragraph.su_list_view?.resourceIdObjMeta?.display_id;
  let args: string = paragraph.su_list_view?.resourceIdObjMeta?.arguments ?? '';
  const itemsToDisplay: number = paragraph.su_list_view?.resourceIdObjMeta?.items_to_display;

  const drupalParams = new DrupalJsonApiParams();

  args += '/0/0/0/0/0/0';
  drupalParams.addCustomParam({'views-argument': args.replace(/^\//, '').split('/')});

  if (itemsToDisplay) {
    drupalParams.addPageLimit(itemsToDisplay);
  }
  const view: DrupalView = await getView<Promise<DrupalView<DrupalNode>>>(`${viewId}--${displayId}`, {params: drupalParams.getQueryObject()});
  const results: DrupalNode[] = view.results ?? [];

  if (paragraph.behavior_settings?.list_paragraph?.hide_empty && results.length === 0) {
    return null;
  }

  const emptyMessage = results.length === 0 && paragraph.behavior_settings?.list_paragraph?.empty_message;

  return (
    <div className="w-full max-w-[980px] mx-auto">

      {paragraph.su_list_headline &&
        <h2>{paragraph.su_list_headline}</h2>
      }
      {paragraph.su_list_description &&
        <Wysiwyg html={paragraph.su_list_description}/>
      }


      {paragraph.su_list_view &&
        <div className="mb-20">
          {emptyMessage}
          <View viewId={viewId} displayId={displayId} items={results}/>
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