import {EventNodeType} from "@/lib/types";
import {redirect} from "next/navigation";
import {getEventTimeString} from "@/components/nodes/cards/stanford-event/stanford-event-card";
import {CalendarDaysIcon, MapPinIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid";
import Address from "@/components/elements/address";
import Link from "next/link";
import Button from "@/components/elements/button";
import Wysiwyg from "@/components/elements/wysiwyg";
import Paragraph from "@/components/paragraphs/paragraph";
import Rows from "@/components/paragraphs/rows/rows";
import {H1, H2, H3} from "@/components/elements/headers";

const StanfordEventPage = ({node}: { node: EventNodeType }) => {
  if (node.su_event_source?.url) redirect(node.su_event_source.url)

  const startTime = new Date(node.su_event_date_time.value);
  const endTime = new Date(node.su_event_date_time.end_value);
  const timezone = node.su_event_date_time.timezone ?? 'America/Los_Angeles';

  return (
    <div className="centered mt-32">
      <div className="flex flex-col">
        <H1 className="order-2">{node.title}</H1>

        {node.su_event_type &&
          <div className="order-1">
            {node.su_event_type[0].name}
          </div>
        }

      </div>
      {node.su_event_subheadline &&
        <div className="text-m2 font-bold mb-10">{node.su_event_subheadline}</div>
      }
      {node.su_event_dek &&
        <div className="mb-20">{node.su_event_dek}</div>
      }

      {node.su_event_sponsor &&
        <div className="mb-20">
          {node.su_event_sponsor.map((sponsor, i) =>
            <div key={`${node.id}-sponsor-${i}`}>
              {sponsor}
            </div>
          )}
        </div>
      }


      <div className="border border-black-40 py-20 px-10 lg:px-48 lg:w-3/4 mx-auto mb-32">
        <H2 className="text-m2">Event Details:</H2>
        <div className="grid items-start lg:grid-cols-2 gap-20">
          <div className="flex items-center gap-5">
            <CalendarDaysIcon width={30} className="shrink-0"/>
            {getEventTimeString(startTime, endTime, timezone)}
          </div>


          {(node.su_event_email || node.su_event_telephone) &&
            <div className="flex flex-col-2 gap-lg items-start">
              <PhoneIcon width={30} className="shrink-0"/>
              <div>
                <H3 className="text-m1">Contact</H3>

                {node.su_event_email &&
                  <Link href={`mailto:${node.su_event_email}`}
                        className="block">
                    {node.su_event_email}
                  </Link>
                }
                {node.su_event_telephone &&
                  <Link href={`tel:${node.su_event_telephone}`}
                        className="block">
                    {node.su_event_telephone}
                  </Link>
                }
              </div>
            </div>
          }

          {(node.su_event_location || node.su_event_map_link || node.su_event_alt_loc) &&
            <div className="flex flex-col-2 items-start gap-5">
              <MapPinIcon width={30} className="shrink-0"/>
              <div>
                <H3 className="text-m1">Location</H3>

                <div>
                  {node.su_event_location &&
                    <Address {...node.su_event_location}/>
                  }

                  {node.su_event_map_link &&
                    <Link href={node.su_event_map_link.url}>
                      {node.su_event_map_link.title}
                    </Link>
                  }
                </div>
              </div>
            </div>
          }


          {node.su_event_audience &&
            <div className="flex flex-col-2 items-start gap-5">
              <UserGroupIcon width={30} className="shrink-0"/>
              <div>
                <H3 className="text-m1">This event is open to:</H3>
                {node.su_event_audience.map(audience =>
                  <div key={audience.id}>
                    {audience.name}
                  </div>
                )}
              </div>
            </div>
          }
        </div>

        {node.su_event_cta &&
          <div className="mt-20">
            <Button href={node.su_event_cta.url} centered>
              {node.su_event_cta.title}
            </Button>
          </div>
        }
      </div>

      <div className="lg:w-3/4 mx-auto">
        {node.body &&
          <Wysiwyg html={node.body}/>
        }
      </div>


      {node.su_event_components &&
        <div>
          <Rows components={node.su_event_components}/>
        </div>
      }

      {node.su_event_schedule &&
        <div>
          {node.su_event_schedule.map(scheduleInstance =>
            <Paragraph paragraph={scheduleInstance} key={scheduleInstance.id}/>
          )}
        </div>
      }
    </div>
  )
}
export default StanfordEventPage;