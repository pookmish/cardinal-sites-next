import {NodeStanfordPublication} from "@lib/gql/__generated__/drupal";

export const StanfordPublicationData = () => {
  return {
    __typename: "NodeStanfordPublication",
    id: "66fcad17-6c9d-457e-b5fe-e5d8ed365c8e",
    title: "Journal Article Example Publication",
    status: true,
    path: "/publications/journal-article-example-publication",
    changed: {timezone: "America/Los_Angeles", time: "2023-07-21T10:33:31-07:00"},
    created: {timezone: "America/Los_Angeles", time: "2023-07-21T10:31:38-07:00"},
    suPublicationAuthorRef: [{
      __typename: "NodeStanfordPerson",
      id: "62957556-fb66-4fab-9e8d-eaab24c6cdf3",
      title: "Dena N DeBry",
      status: true,
      path: "/people/dena-debry",
      changed: {timezone: "America/Los_Angeles", time: "2023-10-03T10:42:12-07:00"},
      created: {timezone: "America/Los_Angeles", time: "2023-07-21T09:38:01-07:00"},
      suPersonPhoto: {
        __typename: "MediaImage",
        id: "57291474-4abf-4387-ba0d-cdbca677a507",
        name: "Dena N DeBry",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/person/dena-debry1606158101967.jpg",
          alt: "Dena N DeBry",
          height: 522,
          width: 350
        }
      },
      suPersonFullTitle: "Senior Manager, Client Solutions, Stanford Web Services\n",
      suPersonShortTitle: "Senior Manager, Client Solutions"
    }],
    suPublicationComponents: [{
      __typename: "ParagraphStanfordLayout",
      id: "3ea4b8d3-817d-41a6-9f7e-24fc4713d5bb",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_1_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "67eebadc-fccc-4ea0-8d9d-4f85a060b9b4",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"3ea4b8d3-817d-41a6-9f7e-24fc4713d5bb\",\"region\":\"main\"}}",
      suWysiwygText: {processed: "<p>Nulla consequat massa quis enim. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Etiam imperdiet imperdiet orci.</p><p>Integer tincidunt. Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>"}
    }],
    suPublicationCta: null,
    suPublicationImage: null,
    suPublicationTopics: null
  } as unknown as NodeStanfordPublication;
}