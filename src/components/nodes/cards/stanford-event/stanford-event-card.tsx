import Link from "@components/elements/link";
import {CalendarDaysIcon, MapPinIcon} from "@heroicons/react/20/solid";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {EventNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: EventNodeType
  headingLevel?: string
}

const StanfordEventCard = ({node, headingLevel, ...props}: Props) => {

  const timezone: string = node.su_event_date_time?.timezone || 'America/Los_Angeles';

  const start = new Date(node.su_event_date_time.value);
  const end = new Date(node.su_event_date_time.end_value);

  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: timezone})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: timezone}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateTimeString = getEventTimeString(start, end, timezone).replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');
  const goToPath = node.suEventSource?.url || node.path
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id}
      className="mx-auto shadow-lg border border-black-20 p-10 flex flex-col gap-10 overflow-hidden" {...props}>
      <div aria-hidden className="flex flex-col items-start w-fit">
        <div className="text-m0 font-semibold mb-4 w-full text-center">
          {startMonth.toUpperCase()}
        </div>
        <div className="text-m4 font-bold w-full text-center">
          {startDay}
        </div>
      </div>

      {(node.su_event_type && node.su_event_type?.length > 0) &&
        <div className="su-digital-red">
          {node.su_event_type[0].name}
        </div>
      }


      <Heading className="text-m2 [&_a]:text-black [&_a]:hocus:text-digital-red" id={node.id}>
        <Link href={goToPath}>
          {node.title}
        </Link>
      </Heading>


      <time className="flex items-center gap-5" dateTime={start.toISOString()}>
        <CalendarDaysIcon width={30} className="shrink-0"/>
        {dateTimeString}
      </time>

      {node.su_event_alt_loc &&
        <div className="flex items-center gap-5">
          <MapPinIcon width={30} className="shrink-0"/>
          {node.su_event_alt_loc}
        </div>
      }
    </article>
  )
}


export const getEventTimeString = (start: Date, end: Date, timezone: string): string => {
  const startHour = parseInt(start.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone
  }))
  const startMinute = parseInt(start.toLocaleTimeString("en-US", {
    minute: "numeric",
    hour12: false,
    timeZone: timezone
  }))

  const endHour = parseInt(end.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone
  }))
  const endMinute = parseInt(end.toLocaleTimeString("en-US", {
    minute: "numeric",
    hour12: false,
    timeZone: timezone
  }))

  let dateTimeString: string;

  // Multiple days.
  if (start.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) != end.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'})) {
    dateTimeString = start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timezone
    }) + ' - ' + end.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timezone
    })
    return dateTimeString;
  }

  // All Day display.
  if (
    (startHour === 24 || startHour === 0) &&
    startMinute === 0 &&
    endHour === 23 &&
    endMinute === 59
  ) {
    return start.toLocaleDateString('en-us', {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timezone
    });
  }


  // Different start and end times.
  if (startHour !== endHour || startMinute !== endMinute) {
    dateTimeString = start.toLocaleDateString('en-US', {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timezone
    });
    dateTimeString += " | " + start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: timezone
    });
    dateTimeString += ' - ';
    dateTimeString += end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: timezone
    })
    return dateTimeString;
  }

  // Start and end times are the same, just display the start time.
  return start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: timezone
  })
}

export default StanfordEventCard;