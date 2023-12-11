import {DrupalTaxonomyTerm} from "@lib/types";

export const getTaxonomyTree = (terms: DrupalTaxonomyTerm[]): DrupalTaxonomyTerm[] => {
  const {below} = buildTaxonomyTree(terms);
  return below || terms;
}

export const buildTaxonomyTree = (
  terms: DrupalTaxonomyTerm[],
  parent: DrupalTaxonomyTerm["id"] = "virtual"
): { below?: DrupalTaxonomyTerm[] } => {

  if (!terms?.length) return {below: []}

  const children = terms.filter((term) => term.parent[0].id === parent)

  return children.length ? {
    below: children.map((link) => ({
      ...link,
      ...buildTaxonomyTree(terms, link.id),
    })),
  } : {}
}
