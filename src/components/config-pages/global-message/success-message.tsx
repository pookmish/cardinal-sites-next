import Wysiwyg from "@/components/elements/wysiwyg";
import Link from "@/components/elements/link";
import {DrupalLinkFieldType} from "@/lib/types";
import {CheckCircleIcon} from "@heroicons/react/20/solid";

interface Props {
  header?: string
  label?: string
  message?: string
  link?: DrupalLinkFieldType
}

const SuccessMessage = ({header, label, message, link}: Props) => {

  return (
    <div className="global-message bg-digital-green text-white">
      <div className="max-w-1500 w-full mx-auto py-10 px-10 3xl:px-0 flex flex-col lg:flex-row gap-10">
        <div className="flex items-center leading-none shrink-0">
          <CheckCircleIcon width={40}/>
          {label?.trim()}:
        </div>
        <div>
          {header && <h2>{header}</h2>}
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

export default SuccessMessage;