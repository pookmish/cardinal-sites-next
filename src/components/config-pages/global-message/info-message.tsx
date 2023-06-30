import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import {DrupalLinkFieldType} from "@lib/types";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import {H2} from "@components/elements/headers";

interface Props {
  header?: string
  label?: string
  message?: string
  link?: DrupalLinkFieldType
}

const InfoMessage = ({header, label, message, link}: Props) => {

  return (
    <div className="bg-digital-blue-dark text-white py-10">
      <div className="centered flex flex-col lg:flex-row gap-10">
        <div className="flex items-center leading-none shrink-0">
          <InformationCircleIcon width={40}/>
          {label}:
        </div>
        <div className="[&_a]:text-white">
          {header && <H2>{header}</H2>}
          {message &&
            <Wysiwyg html={message}/>
          }
          {link &&
            <Link href={link.url} className="text-white">
              {link.title}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default InfoMessage;