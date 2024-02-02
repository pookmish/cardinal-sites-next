import {NodeStanfordNews} from "@lib/gql/__generated__/drupal";

export const StanfordNewsData = () => {
  return {
    __typename: "NodeStanfordNews",
    id: "f6113f95-effe-4b73-8f41-c5a8c42aa6c3",
    title: "Stanford Sites v5.1.0 Released – 12/7/2023",
    status: true,
    path: "/news/stanford-sites-v510-released-1272023",
    changed: {timezone: "America/Los_Angeles", time: "2023-12-08T08:00:00-08:00"},
    created: {timezone: "America/Los_Angeles", time: "2023-12-05T14:55:01-08:00"},
    suNewsBanner: null,
    suNewsBannerMediaCaption: null,
    suNewsByline: null,
    suNewsComponents: [{
      __typename: "ParagraphStanfordLayout",
      id: "8fb3edda-785d-4359-8219-36de5090b648",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_1_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "71ab9220-3980-46f4-84f4-d91c33159eed",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"8fb3edda-785d-4359-8219-36de5090b648\",\"region\":\"main\"}}",
      suWysiwygText: {processed: "<p class=\"su-intro-text\">Stanford Sites 5.1.0 release was focused around a 3rd party search pilot.</p><h2>Search</h2><ul><li>Option to add an Algolia search enabled</li><li>Pilot program to test 3rd-party search started</li></ul><h2>Image Gallery</h2><ul><li>Accessibility fixes made to Image Gallery</li></ul><p>&nbsp;</p>"}
    }],
    suNewsDek: null,
    suNewsFeaturedMedia: null,
    suNewsHideSocial: false,
    suNewsPublishingDate: {timezone: "UTC", time: "2023-12-08T00:00:00+00:00"},
    suNewsSource: null,
    suNewsTopics: [{
      __typename: "TermStanfordNewsTopic",
      id: "d11016ef-5cf4-4ab4-9fb5-52a63350d952",
      name: "Release notes",
      path: "/news/release-notes",
      weight: 5,
      parent: null
    }]
  } as unknown as NodeStanfordNews;
}