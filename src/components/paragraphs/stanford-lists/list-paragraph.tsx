import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import View from "@components/views/view";
import {H2} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {ListParagraphType, StanfordNode} from "@lib/types";
import {getView} from "@lib/drupal/get-view";
import {getResources} from "@lib/drupal/get-resource";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ListParagraphType
}

const ListParagraph = async ({paragraph, ...props}: Props) => {
  const behaviors = paragraph.behavior_settings;
  const viewId = paragraph.su_list_view.resourceIdObjMeta.drupal_internal__target_id;
  const displayId = paragraph.su_list_view.resourceIdObjMeta.display_id

  let viewItems = await getViewItems(viewId, displayId, paragraph.su_list_view.resourceIdObjMeta.arguments, paragraph.su_list_view.resourceIdObjMeta.items_to_display);

  if (behaviors?.list_paragraph?.hide_empty && viewItems.length === 0) return null;

  return (
    <div className="centered lg:max-w-[980px] flex flex-col gap-10 mb-20" {...props}>
      {paragraph.su_list_headline &&
        <H2 className="text-center">{paragraph.su_list_headline}</H2>
      }
      {paragraph.su_list_description &&
        <Wysiwyg html={paragraph.su_list_description}/>
      }

      {(viewId && displayId && viewItems.length > 0) &&
        <View
          viewId={viewId}
          displayId={displayId}
          items={viewItems}
          headingLevel={paragraph.su_list_headline ? 'h3' : 'h2'}
        />
      }

      {(viewItems.length === 0 && behaviors?.list_paragraph?.empty_message) &&
        <div>{behaviors.list_paragraph.empty_message}</div>
      }

      {paragraph.su_list_button?.url &&
        <div>
          <Button centered href={paragraph.su_list_button.url}>
            {paragraph.su_list_button.title}
          </Button>
        </div>
      }
    </div>
  )
}

const getViewItems = async <T extends StanfordNode,>(viewId: string, displayId: string, args?: string, itemsToDisplay = 0): Promise<T[]> => {
  const view = `${viewId}--${displayId}`
  const drupalParams = new DrupalJsonApiParams();

  args = args ? args + '/0/0/0' : '0/0/0';
  drupalParams.addCustomParam({'views-argument': args.split('/')});

  if (itemsToDisplay > 0) {
    // Find new way to add the item limit since this throws errors.
    drupalParams.addPageLimit(itemsToDisplay);
  }
  let items: StanfordNode[] = [];
  try {
    const viewData = await getView<T[]>(view, {params: drupalParams.getQueryObject()});
    items = viewData.results ?? [];
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Unable to fetch view ${view}: ${e.message}`)
    }
  }
  return getResources<T>(items);
}

export default ListParagraph;