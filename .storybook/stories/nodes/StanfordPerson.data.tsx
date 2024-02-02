import {NodeStanfordPerson} from "@lib/gql/__generated__/drupal";

export const StanfordPersonData = () => {
  return {
    __typename: "NodeStanfordPerson",
    id: "47a624fd-c3cf-4fb2-9aef-ed560f2ec052",
    title: "Shea Ross McKinney",
    status: true,
    path: "/people/shea-mckinney",
    changed: {timezone: "America/Los_Angeles", time: "2023-09-14T12:08:41-07:00"},
    created: {timezone: "America/Los_Angeles", time: "2023-07-21T09:38:23-07:00"},
    body: {processed: "Shea is a web developer at Stanford Web Services. He builds websites with Drupal. Shea is located just north of the border in beautiful Vancouver, BC. Please disregard the sample data that is in this profile. Thanks"},
    suPersonAcademicAppt: null,
    suPersonAdminAppts: null,
    suPersonAffiliations: null,
    suPersonComponents: null,
    suPersonEducation: ["none, Test2, nothing  (2014)", "big deal, unicorns., Magic  (1244)"],
    suPersonEmail: null,
    suPersonFax: null,
    suPersonFirstName: "Shea",
    suPersonFullTitle: "Drupal Web Developer, Stanford Web Services, Stanford Web Services\nTechnical Architect Lead, Senior Developer, Stanford Web Services\n",
    suPersonLastName: "McKinney",
    suPersonLinks: [{url: "http://www.google.com/", title: "Google"}, {
      url: "https://drupal.org/user/478028",
      title: "My Drupal Page"
    }, {url: "http://linkedin.com", title: "LinkedIn"}],
    suPersonLocationAddress: null,
    suPersonLocationName: null,
    suPersonMailCode: null,
    suPersonMapUrl: null,
    suPersonMobilePhone: null,
    suPersonPhoto: {
      __typename: "MediaImage",
      id: "ce220be2-89fc-4b49-8dc6-71089c152d5d",
      name: "Shea Ross McKinney",
      mediaImage: {
        url: "http://docroot.cardinalsites.loc/sites/default/files/media/person/shea-mckinney1601509953863.jpg",
        alt: "Shea Ross McKinney",
        height: 522,
        width: 350
      }
    },
    suPersonProfileLink: {url: "https://profiles.stanford.edu/53006", title: "View Full Stanford Profile"},
    suPersonPronouns: null,
    suPersonResearch: null,
    suPersonResearchInterests: null,
    suPersonScholarlyInterests: null,
    suPersonShortTitle: "Drupal Web Developer, Stanford Web Services",
    suPersonTelephone: null,
    suPersonTypeGroup: [{
      __typename: "TermStanfordPersonType",
      id: "87a608ef-8bf5-46c9-b567-f74f36e1e7df",
      name: "Full Stack Developer",
      path: "/people/developers/full-stack-developer",
      weight: 2,
      parent: {id: "50f0f22c-306e-4304-ba72-25cebba57b2b"}
    }]
  } as unknown as NodeStanfordPerson
}
