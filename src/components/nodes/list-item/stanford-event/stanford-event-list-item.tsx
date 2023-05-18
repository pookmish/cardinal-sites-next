import {EventNodeType} from "@/lib/types";
import Link from "@/components/elements/link";
import {CalendarDaysIcon, MapPinIcon} from "@heroicons/react/20/solid";
import Address from "@/components/elements/address";

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
    return start.toLocaleDateString('en-us',{
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

const StanfordEventListItem = ({node}: { node: EventNodeType }) => {

  const timezone: string = node.su_event_date_time?.timezone ?? 'America/Los_Angeles';
  const start = new Date(node.su_event_date_time?.value as string);
  const end = new Date(node.su_event_date_time?.end_value as string);

  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: timezone})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: timezone}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateTimeString = getEventTimeString(start, end, timezone).replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');
  const goToPath = node.su_event_source?.url ?? node.path as string

  return (
    <div className="w-full mx-auto py-10 flex gap-10">
      <div aria-hidden className="flex flex-col items-start w-fit">
        <div className="text-m0 font-semibold mb-4 w-full text-center">
          {startMonth.toUpperCase()}
        </div>
        <div className="text-m4 font-bold w-full text-center">
          {startDay}
        </div>
      </div>
      <div>
        {node.su_event_type?.length > 0 &&
          <div className="su-digital-red">
            {node.su_event_type.at(0).name}
          </div>
        }

        <Link
          href={goToPath}
          className="text-digital-red no-underline hocus:text-black hocus:underline"
        >
          <h3 className="text-m2">{node.title}</h3>
        </Link>

        {node.su_event_subheadline &&
          <div className="text-m1 font-bold mb-5">
            {node.su_event_subheadline}
          </div>
        }

        <div className="flex items-center gap-5 mb-5">
          <CalendarDaysIcon width={30} className="shrink-0"/>
          {dateTimeString}
        </div>

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
    </div>
  )
}
export default StanfordEventListItem;