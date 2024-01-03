import Wysiwyg from "@components/elements/wysiwyg";
import Address from "@components/elements/address";
import {H3} from "@components/elements/headers";
import PersonCtaParagraph from "@components/paragraphs/stanford-person-cta/person-cta-paragraph";
import {HtmlHTMLAttributes} from "react";
import {EventScheduleParagraphType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: EventScheduleParagraphType
}

const ScheduleParagraph = ({paragraph, ...props}: Props) => {
  let start
  if (paragraph.su_schedule_date_time?.value) {
    start = new Date(paragraph.su_schedule_date_time.value * 1000).toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: paragraph.su_schedule_date_time.timezone || 'America/Los_Angeles',
    })
  }

  return (
    <div className="centered" {...props}>
      {start &&
        <H3>{start}</H3>
      }
      {paragraph.su_schedule_headline &&
        <div>
          {paragraph.su_schedule_headline}
        </div>
      }

      {paragraph.su_schedule_description &&
        <Wysiwyg html={paragraph.su_schedule_description}/>
      }

      {paragraph.su_schedule_location &&
        <Address {...paragraph.su_schedule_location}/>
      }
      {paragraph.su_schedule_speaker &&
        <div>
          {paragraph.su_schedule_speaker.map(speaker =>
            <PersonCtaParagraph paragraph={speaker} key={speaker.id}/>
          )}
        </div>
      }

    </div>
  )
}
export default ScheduleParagraph