import StanfordPageListItem from "@components/nodes/list-item/stanford-page/stanford-page-list-item";
import LoadMoreList from "@components/elements/load-more-list";
import {NodeStanfordPage, Maybe} from "@lib/gql/__generated__/drupal";

interface Props {
  emptyMessage?: Maybe<string>
  headingLevel: string
  items?: NodeStanfordPage[]
}

const PageListView = async ({emptyMessage, items = [], headingLevel}: Props) => {
  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }
  return (
    <LoadMoreList
      ulProps={{className: "list-unstyled mb-20"}}
      liProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
    >
      {items.map(item =>
        <StanfordPageListItem key={item.id} node={item} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}
export default PageListView;