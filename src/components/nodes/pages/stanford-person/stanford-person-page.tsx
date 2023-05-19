import {PersonNodeType} from "@/lib/types";
import Image from "next/image";
import Wysiwyg from "@/components/elements/wysiwyg";
import Rows from "@/components/paragraphs/rows/rows";
import Button from "@/components/elements/button";
import {LinkIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Telephone from "@/components/elements/telephone";
import Email from "@/components/elements/email";
import Link from "@/components/elements/link";

const StanfordPersonPage = ({node}: { node: PersonNodeType }) => {
  const imageUrl = node.su_person_photo?.field_media_image.image_style_uri.square_956
  const imagePlaceholder = node.su_person_photo?.field_media_image.uri.base64;
  return (
    <div className="cc mt-32">
      <div className="flex flex-col lg:flex-row gap-20 mb-32">
        {imageUrl &&
          <div className="relative aspect-[1/1] w-[250px] shrink-0 mx-auto lg:mx-0">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="rounded-full"
              placeholder={imagePlaceholder ? 'blur' : 'empty'}
              blurDataURL={imagePlaceholder}
            />
          </div>
        }

        <div className="flex flex-col">
          <h1 className="order-2">{node.title}</h1>

          {node.su_person_short_title &&
            <div className="order-1 mb-10">
              {node.su_person_short_title}
            </div>
          }
          {node.su_person_full_title &&
            <div className="order-3 text-m1">
              {node.su_person_full_title}
            </div>
          }
        </div>
      </div>

      <section className="flex flex-col lg:flex-row">
        <div>
          {node.body && <Wysiwyg html={node.body}/>}

          {node.su_person_components &&
            <Rows components={node.su_person_components}/>
          }

          {node.su_person_education &&
            <div className="mb-10">
              <h2 className="text-m1">Education</h2>
              {node.su_person_education.map((education, i) =>
                <div key={`${node.id}-education-${i}`}>
                  {education}
                </div>
              )}
            </div>
          }

          {node.su_person_research &&
            <div className="mb-10">
              <h2 className="text-m1">Research</h2>
              <div className="grid grid-cols-2 gap-10">
                {node.su_person_research.map((research, i) =>
                  <div key={`${node.id}-research-${i}`}>
                    {research}
                  </div>
                )}
              </div>
            </div>
          }

          {node.su_person_affiliations &&
            <div className="mb-10">
              <h2 className="text-m1">Stanford Affiliations</h2>
              <div className="grid grid-cols-2 gap-10">
                {node.su_person_affiliations.map((affiliation, i) =>
                  <div key={`${node.id}-affiliation-${i}`}>
                    <Button href={affiliation.url}>
                      {affiliation.title}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          }

        </div>
        <aside className="w-1/3 shrink-0">
          {(node.su_person_mobile_phone || node.su_person_fax || node.su_person_email || node.su_person_mail_code) &&

            <div className="flex items-start gap-10 mb-20">
              <PhoneIcon width={30} className="shrink-0"/>
              <div>
                <h2 className="text-m1">Contact</h2>

                {node.su_person_telephone &&
                  <div className="mb-10">
                    p: <Telephone tel={node.su_person_telephone}/>
                  </div>
                }
                {node.su_person_mobile_phone &&
                  <div className="mb-10">
                    m: <Telephone tel={node.su_person_mobile_phone}/>
                  </div>
                }

                {node.su_person_fax &&
                  <div className="mb-10">
                    f: <Telephone tel={node.su_person_fax}/>
                  </div>
                }

                {node.su_person_email &&
                  <div className="mb-10">
                    <Email email={node.su_person_email}/>
                  </div>
                }

                {node.su_person_mail_code &&
                  <div className="mb-10">
                    Mail Code: {node.su_person_mail_code}
                  </div>
                }

              </div>
            </div>
          }

          {(node.su_person_location_address || node.su_person_map_url) &&
            <div className="flex items-start gap-10 mb-20">
              <MapPinIcon width={30} className="shrink-0"/>
              <div>
                <h2 className="text-m1">Location</h2>
                {node.su_person_location_address &&
                  <Wysiwyg html={node.su_person_location_address}/>
                }

                {node.su_person_map_url &&
                  <div>
                    Map URL: <Link
                    href={node.su_person_map_url.url}>{node.su_person_map_url.title || node.su_person_map_url.url}</Link>
                  </div>
                }
              </div>
            </div>
          }

          {node.su_person_links?.length > 0 &&
            <div className="flex items-start gap-10 mb-20">
              <LinkIcon width={30} className="shrink-0"/>
              <div>
                <h2 className="text-m1">Links</h2>
                {node.su_person_links.map((link, i) =>

                  <Link key={`${node.id}-link-${i}`} href={link.url}>
                    {link.title}
                  </Link>
                )}
              </div>
            </div>
          }

          {node.su_person_profile_link &&
            <Button href={node.su_person_profile_link.url}>
              {node.su_person_profile_link.title}
            </Button>
          }
        </aside>
      </section>
    </div>
  )
}
export default StanfordPersonPage;