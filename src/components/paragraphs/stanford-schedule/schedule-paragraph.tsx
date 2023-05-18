import {EventScheduleParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import Address from "@/components/elements/address";
import Paragraph from "@/components/paragraphs/paragraph";

const ScheduleParagraph = ({paragraph}: { paragraph: EventScheduleParagraphType }) => {
  let start
  if (paragraph.su_schedule_date_time?.value) {
    console.log(paragraph.su_schedule_date_time);
    start = new Date(paragraph.su_schedule_date_time.value).toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: paragraph.su_schedule_date_time.timezone?.length > 0 ? paragraph.su_schedule_date_time.timezone.length : 'America/Los_Angeles',
    })
  }

  return (
    <div className="cc">
      {start &&
        <h3>{start}</h3>
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