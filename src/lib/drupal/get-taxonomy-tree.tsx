import {DrupalTaxonomyTerm} from "next-drupal";

export const getTaxonomyTree = (terms: DrupalTaxonmYTerm[]) => {
  const {below} = buildTaxonomyTree(terms);
  return below;
}

export function buildTaxonomyTree(
  terms: DrupalTaxonomyTerm[],
  parent: DrupalTaxonomyTerm["id"] = "virtual"
) {
  if (!terms?.length) {
    return {
      below: [],
    }
  }

  const children = terms.filter((term) => term.parent[0].id === parent)

  return children.length ? {
    below: children.map((link) => ({
      ...link,
      ...buildTaxonomyTree(terms, link.id),
    })),

  } : {}
}
