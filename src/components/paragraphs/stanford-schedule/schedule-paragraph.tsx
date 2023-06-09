import {EventScheduleParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import Address from "@/components/elements/address";
import Paragraph from "@/components/paragraphs/paragraph";
import {H3} from "@/components/elements/headers";

const ScheduleParagraph = ({paragraph}: { paragraph: EventScheduleParagraphType }) => {
  let start
  if (paragraph.su_schedule_date_time?.value) {

    start = new Date(paragraph.su_schedule_date_time.value).toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: paragraph.su_schedule_date_time.timezone || 'America/Los_Angeles',
    })
  }

  return (
    <div className="centered">
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
            <Paragraph paragraph={speaker} key={speaker.id}/>
          )}
        </div>
      }

    </div>
  )
}
export default ScheduleParagraph