import Wysiwyg from "@/components/elements/wysiwyg";
import Link from "@/components/elements/link";
import {DrupalLinkFieldType} from "@/lib/types";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {H2} from "@/components/elements/headers";

interface Props {
  header?: string
  label?: string
  message?: string
  link?: DrupalLinkFieldType
}

const InfoMessage = ({header, label, message, link}: Props) => {

  return (
    <div className="bg-digital-green text-white">
      <div className="max-w-1500 w-full mx-auto flex gap-20">
        <div className="flex items-center leading-none shrink-0">
          <CheckCircleIcon width={40}/>
          {label}:
        </div>
        <div>
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