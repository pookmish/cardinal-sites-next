import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import {DrupalLinkFieldType} from "@lib/types";
import {BellIcon} from "@heroicons/react/20/solid";
import {H2} from "@components/elements/headers";

interface Props {
  header?: string
  label?: string
  message?: string
  link?: DrupalLinkFieldType
}

const PlainMessage = ({header, label, message, link}: Props) => {

  return (
    <div className="bg-foggy-light py-10">
      <div className="centered flex flex-col lg:flex-row gap-10">
        <div className="flex items-center leading-none shrink-0">
          <BellIcon width={40}/>
          {label}:
        </div>
        <div className="[&_a]:text-black">
          {header && <H2>{header}</H2>}
          {message &&
            <Wysiwyg html={message}/>
          }
          {link &&
            <Link href={link.url} className="text-black">
              {link.title}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default PlainMessage;