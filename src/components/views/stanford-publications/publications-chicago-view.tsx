import LoadMoreList from "@components/elements/load-more-list"
import StanfordPublicationListItem from "@components/nodes/list-item/stanford-publication/stanford-publication-list-item"
import {NodeStanfordPublication} from "@lib/gql/__generated__/drupal.d"

interface Props {
  /**
   * List of nodes to display.
   */
  items: NodeStanfordPublication[]
  /**
   * If those nodes titles should display as <h2> or <h3>
   */
  headingLevel?: "h2" | "h3"
  /**
   * Total number of items on all pages.
   */
  totalItems: number
}

const PublicationsChicagoView = async ({items = [], headingLevel, totalItems}: Props) => {
  return (
    <LoadMoreList
      ulProps={{className: "list-unstyled mb-20"}}
      liProps={{
        className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0",
      }}
      totalItems={totalItems}
    >
      {items.map(item => (
        <StanfordPublicationListItem key={item.id} node={item} headingLevel={headingLevel} />
      ))}
    </LoadMoreList>
  )
}
export default PublicationsChicagoView
