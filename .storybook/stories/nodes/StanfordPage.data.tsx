import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";

export const StanfordPageData = () => {
  return {
    __typename: "NodeStanfordPage",
    id: "72f0069b-f1ec-4122-af73-6aa841faea90",
    title: "Home",
    status: true,
    path: "/home",
    changed: {timezone: "America/Los_Angeles", time: "2024-01-29T15:37:02-08:00"},
    created: {timezone: "America/Los_Angeles", time: "2019-08-27T14:16:24-07:00"},
    layoutSelection: null,
    suBasicPageType: null,
    suPageBanner: {
      __typename: "ParagraphStanfordBanner",
      id: "6fb3c99e-ea77-405e-9eaf-49ed685385a0",
      behaviors: "{\"hero_pattern\":{\"overlay_position\":\"left\"}}",
      suBannerHeader: "Welcome to the Stanford Sites User Guide!",
      suBannerBody: {processed: "<p>Use this guide to learn about how to request and manage a Stanford Site, how to create and manage content, launch your website, and get support.</p>"},
      suBannerSupHeader: "Stanford Sites 5.1",
      suBannerButton: null,
      suBannerImage: {
        __typename: "MediaImage",
        id: "ab332d12-565a-402f-ae88-a25e4a877007",
        name: "Yellow sweater typing on laptop",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/christin-hume-hcfwew744z4-unsplash_0.jpg",
          alt: "Yellow sweater typing on laptop",
          height: 3744,
          width: 5616
        }
      }
    },
    suPageComponents: [{
      __typename: "ParagraphStanfordLayout",
      id: "364c8a32-6665-4a06-908c-dc734c3e3376",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_2_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "b7abb133-a21b-4a1a-a13c-f630aad2ce7e",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"364c8a32-6665-4a06-908c-dc734c3e3376\",\"region\":\"left\"}}",
      suWysiwygText: {processed: "<h2 id=\"quick-start\">Get Started with a Stanford Site</h2>\n\n<p>Depending on your needs, we have different ways for you to get started with Stanford Sites. Learn about our service options and tools within Stanford Sites to help you request and manage your website.</p>\n\n<p class=\"text-align-right\"><a class=\"su-link--action\" data-entity-substitution=\"canonical\" data-entity-type=\"node\" data-entity-uuid=\"e24c3128-e669-4b1e-b69a-5559132aaa2e\" href=\"/get-started\" title=\"Get Started\">Request a site</a></p>"}
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "1d105ee8-179b-4132-abe0-72ebb1d19dea",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"364c8a32-6665-4a06-908c-dc734c3e3376\",\"region\":\"right\"}}",
      suWysiwygText: {processed: "<h2 id=\"introduction\">Get&nbsp;Acquainted with Stanford Sites</h2>\n\n<p>Whether you're experienced or new to site-building, take time to get familiar with the terminology, common tasks, and other resources for building your site with our introductory session.</p>\n\n<p class=\"text-align-right\"><a class=\"su-link--action\" data-entity-substitution=\"canonical\" data-entity-type=\"node\" data-entity-uuid=\"98055942-5f43-4c20-92ee-cc7b7cf262a8\" href=\"/support/introduction-stanford-sites-syllabus\" title=\"Introduction to Stanford Sites Syllabus\">Introduction to Stanford Sites</a></p>"}
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "8ce3a7b4-016f-4e50-b8b3-d443a847c093",
      behaviors: "{\"layout_paragraphs\":{\"move_items\":{\"main\":\"left\"},\"layout\":\"layout_paragraphs_2_column\",\"config\":{\"label\":\"\",\"column_widths\":\"50-50\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordList",
      id: "2f718482-7403-47ed-b517-d6b9d96f659a",
      behaviors: "{\"list_paragraph\":{\"empty_message\":\"There are no upcoming sessions\"},\"layout_paragraphs\":{\"parent_uuid\":\"8ce3a7b4-016f-4e50-b8b3-d443a847c093\",\"region\":\"left\"}}",
      suListHeadline: "Stanford Sites Events",
      suListDescription: null,
      suListButton: {url: "/events", title: "All Events"},
      suListView: {view: "stanford_events", display: "cards", contextualFilter: null, pageSize: 1}
    }, {
      __typename: "ParagraphStanfordList",
      id: "477af1ec-660d-4a8f-bfad-8dccad414fdc",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"8ce3a7b4-016f-4e50-b8b3-d443a847c093\",\"region\":\"right\"}}",
      suListHeadline: "Stanford Sites News",
      suListDescription: null,
      suListButton: {url: "/news", title: "All Stanford Sites News"},
      suListView: {view: "stanford_news", display: "block_1", contextualFilter: null, pageSize: 1}
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "7b9c52c3-f6aa-41b6-b4df-d5d021b41b75",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_1_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordEntity",
      id: "815de025-7595-4c0e-872e-87a1f665344f",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"7b9c52c3-f6aa-41b6-b4df-d5d021b41b75\",\"region\":\"main\"}}",
      suEntityHeadline: "Essentials of Building and Designing",
      suEntityDescription: {processed: "<p>Stanford Sites combines the advantages of Drupal with a streamlined and simplified user experience provided by Stanford Web Services. We hope it will allow you to build and design your website quickly, with little to no training required.</p>"},
      suEntityButton: {url: "/build", title: "All Site Building Resources"},
      suEntityItem: [{
        __typename: "NodeStanfordPage",
        id: "0f8bcc94-2c43-4bf7-ae10-423effe59ce1",
        title: "Basic Page Content Type",
        status: true,
        path: "/build/page-types/basic-page-content-type",
        changed: {timezone: "America/Los_Angeles", time: "2023-07-20T10:24:38-07:00"},
        created: {timezone: "America/Los_Angeles", time: "2020-02-04T10:36:28-08:00"},
        suPageDescription: "Basic Pages are the most flexible content type on Stanford Sites. ",
        suPageImage: {
          __typename: "MediaImage",
          id: "34041fb0-77b7-4559-b6e8-1bd28e122225",
          name: "Photo by Florian Klauer on Unsplash",
          mediaImage: {
            url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/florian-klauer-mk7d-4ucfmg-unsplash_2.jpg",
            alt: "type writer ",
            height: 2816,
            width: 1920
          }
        },
        suPageBanner: null
      }, {
        __typename: "NodeStanfordPage",
        id: "5a11974e-28c0-4e5b-a58f-349cea0e8c15",
        title: "Adding Content to a Page",
        status: true,
        path: "/build/adding-content-page",
        changed: {timezone: "America/Los_Angeles", time: "2023-07-18T14:03:30-07:00"},
        created: {timezone: "America/Los_Angeles", time: "2020-02-06T07:22:55-08:00"},
        suPageDescription: "Learn how you can add and lay out your content using different Paragraph tools. ",
        suPageImage: {
          __typename: "MediaImage",
          id: "7ef2733b-282e-47d0-b672-5ada31048bea",
          name: "Photo by Kelly Sikkema on Unsplash",
          mediaImage: {
            url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/kelly-sikkema-ml1igjv8ovy-unsplash.jpg",
            alt: "wireframe sketches with post-its",
            height: 3521,
            width: 5281
          }
        },
        suPageBanner: null
      }, {
        __typename: "NodeStanfordPage",
        id: "b7c8998f-6148-440f-8820-390f9272a97e",
        title: "Menus & Other Sitewide Features",
        status: true,
        path: "/manage-your-site/menus-other-sitewide-features",
        changed: {timezone: "America/Los_Angeles", time: "2023-09-12T09:27:34-07:00"},
        created: {timezone: "America/Los_Angeles", time: "2020-02-06T07:57:27-08:00"},
        suPageDescription: "Learn how to manage the navigation, menu structure, logo options, global alerts, and more.",
        suPageImage: {
          __typename: "MediaImage",
          id: "1d519430-d02b-4951-87f5-391c125bda76",
          name: "Photo by Nick Seagrave on Unsplash",
          mediaImage: {
            url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/nick-seagrave-1tpldmxki-c-unsplash_0.jpg",
            alt: "woman looking at a roap-map",
            height: 2667,
            width: 4000
          }
        },
        suPageBanner: null
      }]
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "9b6331ea-7c98-40ed-88c0-b514b9e1dc51",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_1_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordBanner",
      id: "43e00c1c-7744-4e8e-a8da-d5f32a041a97",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"9b6331ea-7c98-40ed-88c0-b514b9e1dc51\",\"region\":\"main\"}}",
      suBannerHeader: "Text Area Paragraph",
      suBannerBody: {processed: "<p>Learn about one of the most flexible tools you have with Text Area Paragraph. It provides a variety of typography, image and link styles for your content.&nbsp;</p>"},
      suBannerSupHeader: null,
      suBannerButton: {url: "/tour/paragraphs/text-area", title: "Text Area "},
      suBannerImage: {
        __typename: "MediaImage",
        id: "34f34e34-6b81-41de-8ed1-1d8d35b303d3",
        name: "Photo by Jeff Sheldon on Unsplash",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/jeff-sheldon-9syokyrq-re-unsplash.jpg",
          alt: "desk step with different typography elements ",
          height: 1440,
          width: 1920
        }
      }
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "4fd09c5f-ab67-4b62-a68f-59ed4dd93ba3",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_3_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "a96f3f45-717a-45d2-9317-c85347445152",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"4fd09c5f-ab67-4b62-a68f-59ed4dd93ba3\",\"region\":\"left\"}}",
      suWysiwygText: {processed: "<h3>Analytics Tools&nbsp; &nbsp;</h3>\n\n<p>Stanford Sites provides support for many third-party marketing and analytics tools, including social media sharing, Google Analytics and more.</p>\n\n<p class=\"text-align-right\"><a class=\"su-link--action\" data-entity-substitution=\"canonical\" data-entity-type=\"node\" data-entity-uuid=\"59a32c7a-c884-4cff-8f82-1bb1eb40ffde\" href=\"/manage-your-site/marketing-and-analytics\" title=\"Marketing and Analytics\">Add analytics</a></p>"}
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "4ee81aa2-ddf0-45cf-89f0-51623007b5f6",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"4fd09c5f-ab67-4b62-a68f-59ed4dd93ba3\",\"region\":\"main\"}}",
      suWysiwygText: {processed: "<h3>Create content</h3>\n\n<p>Paragraphs are the tools to help you create content on your website! Create, organize and order your content in multiple ways.</p>\n\n<p class=\"text-align-right\"><a class=\"su-link--action\" data-entity-substitution=\"canonical\" data-entity-type=\"node\" data-entity-uuid=\"40dfbaf5-e933-4877-be60-2d1c66cc62ed\" href=\"/build/paragraphs\" title=\"Paragraphs\">Learn about Paragraphs</a></p>"}
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "46340a6b-2a09-4d85-acbe-4e4fda476f44",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"4fd09c5f-ab67-4b62-a68f-59ed4dd93ba3\",\"region\":\"right\"}}",
      suWysiwygText: {processed: "<h3>Image Gallery&nbsp;</h3>\n\n<p>Organize and display galleries of photos throughout your site. Up to 30 images can be displayed with the Image Gallery.</p>\n\n<p class=\"text-align-right\"><a class=\"su-link--action\" data-entity-substitution=\"canonical\" data-entity-type=\"node\" data-entity-uuid=\"7705faef-bb4c-4353-912e-e5ff98839b0d\" href=\"/build/paragraphs/image-gallery-paragraph\" title=\"Image Gallery Paragraph\">Use Image Gallery</a></p>"}
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "07a0691b-2bb6-4afc-9d9a-c6591cb82661",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_1_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordCard",
      id: "76f1c636-767a-4d18-af4c-cdca648fc7f1",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"07a0691b-2bb6-4afc-9d9a-c6591cb82661\",\"region\":\"main\"}}",
      suCardHeader: "Essentials for a Successful Launch",
      suCardSuperHeader: "Ready to launch your site? ",
      suCardBody: {processed: "<p>Launching a website is exciting... and at times, stressful. You can make sure your site is launch-ready by reviewing our checklist and logistics that will support a successful launch.</p>"},
      suCardLink: {url: "/support/launching-your-site", title: "Site Launch Checklist"},
      suCardMedia: {
        __typename: "MediaImage",
        id: "c77b8209-7037-400c-aeef-63f95d7f05fc",
        name: "felipe-santana-ura-1wblfym-unsplash.jpg",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/felipe-santana-ura-1wblfym-unsplash_0.jpg",
          alt: "balloons floating to sky",
          height: 1280,
          width: 1920
        }
      }
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "4477735b-693c-49ad-be0f-c966bf09c972",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_3_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordCard",
      id: "ef021e82-7f2b-4855-a08d-a485132a3ae3",
      behaviors: "{\"su_card_styles\":{\"link_style\":\"action\"},\"layout_paragraphs\":{\"parent_uuid\":\"4477735b-693c-49ad-be0f-c966bf09c972\",\"region\":\"left\"}}",
      suCardHeader: "Have Feedback? ",
      suCardSuperHeader: null,
      suCardBody: {processed: "<p>Please share your experience and thoughts on Stanford Sites.&nbsp;</p>"},
      suCardLink: {
        url: "https://stanford.service-now.com/it_services?id=sc_cat_item&sys_id=83daed294f4143009a9a97411310c70a",
        title: "Give us feedback!"
      },
      suCardMedia: null
    }, {
      __typename: "ParagraphStanfordCard",
      id: "dc48765f-5b9b-4f5a-908a-7ec97c78f3cc",
      behaviors: "{\"su_card_styles\":{\"link_style\":\"action\"},\"layout_paragraphs\":{\"parent_uuid\":\"4477735b-693c-49ad-be0f-c966bf09c972\",\"region\":\"main\"}}",
      suCardHeader: "Found a bug? ",
      suCardSuperHeader: null,
      suCardBody: {processed: "<p>Report a bug you've encountered on Stanford Sites.</p>"},
      suCardLink: {
        url: "https://stanford.service-now.com/it_services?id=sc_cat_item&sys_id=83daed294f4143009a9a97411310c70a",
        title: "Report a bug"
      },
      suCardMedia: null
    }, {
      __typename: "ParagraphStanfordCard",
      id: "2cce76a6-369c-4fd1-a851-21fcb6b219cb",
      behaviors: "{\"su_card_styles\":{\"link_style\":\"action\"},\"layout_paragraphs\":{\"parent_uuid\":\"4477735b-693c-49ad-be0f-c966bf09c972\",\"region\":\"right\"}}",
      suCardHeader: "Can't find something?",
      suCardSuperHeader: null,
      suCardBody: {processed: "<p>Tell us what you're looking for or how this user guide can better support you.&nbsp;</p>"},
      suCardLink: {
        url: "https://stanford.service-now.com/it_services?id=sc_cat_item&sys_id=83daed294f4143009a9a97411310c70a",
        title: "Suggest User Guide content"
      },
      suCardMedia: null
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "36cf3ee6-eb7a-4b0b-a4f5-3e6a65a86cf5",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_2_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordMediaCaption",
      id: "2d9719da-d193-4ea9-8567-a1d868a699d1",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"36cf3ee6-eb7a-4b0b-a4f5-3e6a65a86cf5\",\"region\":\"left\"}}",
      suMediaCaptionMedia: {
        __typename: "MediaImage",
        id: "13f6496b-1565-401d-a3c6-c1ef6ae4af46",
        name: "User Guide Services Card",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/user-guide-services-card.jpg",
          alt: "Web Services team members in a meeting with remote employees",
          height: 1000,
          width: 2000
        }
      }
    }, {
      __typename: "ParagraphStanfordWysiwyg",
      id: "39932638-81c6-4c6b-8bad-8e51027503b5",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"36cf3ee6-eb7a-4b0b-a4f5-3e6a65a86cf5\",\"region\":\"right\"}}",
      suWysiwygText: {processed: "<h2>Need Support?</h2>\n\n<p>Stanford Web Services can provide additional support and consultation. If you have questions about adopting our Stanford Sites Drupal CMS Platform, you can <a href=\"https://go.oncehub.com/SWSOfficeHours\">book an appointment for office hours</a>&nbsp;or&nbsp;<a href=\"https://docs.google.com/forms/d/e/1FAIpQLSdZ8N06DW8LOKdGlcCfUIF8q8rQILh4A697qR5SoZ6-eWfG7g/viewform?usp=sf_link\">submit a consultation request</a>.</p>"}
    }, {
      __typename: "ParagraphStanfordLayout",
      id: "ae2005a2-0189-4343-ac68-2aca9dd345ff",
      behaviors: "{\"layout_paragraphs\":{\"layout\":\"layout_paragraphs_2_column\",\"config\":{\"label\":\"\"},\"parent_uuid\":null,\"region\":null}}"
    }, {
      __typename: "ParagraphStanfordCard",
      id: "92cc92c6-b901-4b67-8df6-c4b88fa32f4c",
      behaviors: "{\"layout_paragraphs\":{\"parent_uuid\":\"ae2005a2-0189-4343-ac68-2aca9dd345ff\",\"region\":\"left\"},\"su_card_styles\":[]}",
      suCardHeader: "Drupal resources at Stanford",
      suCardSuperHeader: null,
      suCardBody: {processed: "<p>Stanford has a very active and engaged Drupal community, and many centrally offered and community created resources that might help you.</p><p><a class=\"su-link--action\" href=\"/support/drupal-resources-stanford\" data-entity-type=\"node\" data-entity-uuid=\"3e82f985-eeda-46d4-baf3-be412c119636\" data-entity-substitution=\"canonical\" title=\"Drupal Resources at Stanford\">Learn more about these resources</a></p>"},
      suCardLink: null,
      suCardMedia: {
        __typename: "MediaImage",
        id: "48fd7466-53d9-4031-b1c2-ce9485299bd4",
        name: "cardinaldark.jpg",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/cardinaldark.jpg",
          alt: null,
          height: 490,
          width: 980
        }
      }
    }, {
      __typename: "ParagraphStanfordCard",
      id: "9954cc81-919b-4498-9151-bf930831fca7",
      behaviors: "{\"su_card_styles\":{\"link_style\":\"action\"},\"layout_paragraphs\":{\"parent_uuid\":\"ae2005a2-0189-4343-ac68-2aca9dd345ff\",\"region\":\"right\"}}",
      suCardHeader: "More website services",
      suCardSuperHeader: null,
      suCardBody: {processed: "<p>Stanford Web Services offers a variety of ways to partner with you —&nbsp;if you’re hoping for more assistance with building your website, visual design, customizations, sitemap building, and more.&nbsp;</p><p><a class=\"su-link--action\" href=\"https://uit.stanford.edu/sws\">Learn about our service offerings</a></p>"},
      suCardLink: null,
      suCardMedia: {
        __typename: "MediaImage",
        id: "27353b6c-cf4c-41e7-9354-1c9179d6e768",
        name: "plum.jpg",
        mediaImage: {
          url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/plum.jpg",
          alt: null,
          height: 490,
          width: 980
        }
      }
    }],
    suPageDescription: "Helpful information to build out your website using the \"Stanford Sites\" Drupal platform.",
    suPageImage: {
      __typename: "MediaImage",
      id: "ab332d12-565a-402f-ae88-a25e4a877007",
      name: "Yellow sweater typing on laptop",
      mediaImage: {
        url: "http://docroot.cardinalsites.loc/sites/default/files/media/image/christin-hume-hcfwew744z4-unsplash_0.jpg",
        alt: "Yellow sweater typing on laptop",
        height: 3744,
        width: 5616
      }
    }
  } as unknown as NodeStanfordPage
}
