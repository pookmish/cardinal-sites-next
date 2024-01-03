import {TermUnion} from "@lib/gql/__generated__/drupal";

export type TermTree = TermUnion & {
  below?: TermUnion[]
}

export const getTaxonomyTree = (terms: TermUnion[]): TermTree[] => {
  const {below} = buildTaxonomyTree(terms);
  return below || terms;
}

export const buildTaxonomyTree = (
  terms: TermUnion[],
  parent: TermUnion["id"] = ""
): { below?: TermUnion[] } => {

  if (!terms?.length) return {below: []}

  const children = terms.filter((term) => term.parent?.id && term.parent?.id === parent)

  return children.length ? {
    below: children.map((link) => ({
      ...link,
      ...buildTaxonomyTree(terms, link.id),
    })),
  } : {}
}
