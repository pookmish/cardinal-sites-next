import Link from "@components/elements/link";
import {CalendarDaysIcon, MapPinIcon} from "@heroicons/react/20/solid";
import Address from "@components/elements/address";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {getEventTimeString} from "@components/nodes/cards/stanford-event/stanford-event-card";
import {EventNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: EventNodeType
  headingLevel?: string
}

const StanfordEventListItem = ({node, headingLevel, ...props}: Props) => {

  const timezone: string = node.su_event_date_time?.timezone || 'America/Los_Angeles';
  const start = new Date(node.su_event_date_time.value);
  const end = new Date(node.su_event_date_time.end_value);

  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: timezone})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: timezone}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateTimeString = getEventTimeString(start, end, timezone).replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');
  const goToPath = node.su_event_source?.url || node.path.alias
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="w-full mx-auto py-10 flex gap-10" {...props}>
      <div aria-hidden className="flex flex-col items-start w-fit">
        <div className="text-m0 font-semibold mb-4 w-full text-center">
          {startMonth.toUpperCase()}
        </div>
        <div className="text-m4 font-bold w-full text-center">
          {startDay}
        </div>
      </div>
      <div>
        {node.su_event_type?.[0]?.name &&
          <div className="su-digital-red">
            {node.su_event_type[0].name}
          </div>
        }


        <Heading className="text-m2" id={node.id}>
          <Link
            href={goToPath}
            className="text-digital-red no-underline hocus:text-black hocus:underline"
          >
            {node.title}
          </Link>
        </Heading>

        {node.su_event_subheadline &&
          <div className="text-m1 font-bold mb-5">
            {node.su_event_subheadline}
          </div>
        }

        <time className="flex items-center gap-5 mb-5" dateTime={start.toISOString()}>
          <CalendarDaysIcon width={30} className="shrink-0"/>
          {dateTimeString}
        </time>

        {node.su_event_location &&
          <div>
            <div className="flex items-center gap-5">
              <MapPinIcon width={30} className="shrink-0"/>
              <Address {...node.su_event_location}/>
            </div>
          </div>
        }

        {node.su_event_alt_loc &&
          <div className="flex items-center gap-5">
            <MapPinIcon width={30} className="shrink-0"/>
            {node.su_event_alt_loc}
          </div>
        }
      </div>
    </article>
  )
}

export default StanfordEventListItem;