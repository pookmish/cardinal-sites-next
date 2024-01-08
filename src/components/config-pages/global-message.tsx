
import {GlobalMessageConfigPageType} from "@lib/drupal/drupal-jsonapi.types";
import {BellIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import {clsx} from "clsx";

const GlobalMessage = ({configPage}:{configPage?:GlobalMessageConfigPageType}) => {
  if (!configPage || !configPage.su_global_msg_enabled) return;

  const wrapperClasses = clsx({
    'bg-digital-blue-dark': configPage.su_global_msg_type === 'info',
    'bg-illuminating-dark': configPage.su_global_msg_type === 'warning',
    'bg-digital-green': configPage.su_global_msg_type === 'success',
    'bg-foggy-light': configPage.su_global_msg_type === 'plain',
    'bg-digital-red': configPage.su_global_msg_type === 'error',
    'text-white': ['error', 'info', 'success'].includes(configPage.su_global_msg_type)
  });
  return (
    <div className={wrapperClasses + " py-10"}>
      <div className="centered flex flex-col lg:flex-row gap-10">
        <div className="flex items-center leading-none shrink-0">
          <MessageIcon messageType={configPage.su_global_msg_type}/>
          {configPage.su_global_msg_label}:
        </div>
        <div className="[&_a]:text-white [&_a.btn]:bg-transparent [&_a.btn]:border-2 [&_a.btn]:border-white">
          {configPage.su_global_msg_header && <H2>{configPage.su_global_msg_header}</H2>}
          {configPage.su_global_msg_message &&
            <Wysiwyg html={configPage.su_global_msg_message}/>
          }
          {configPage.su_global_msg_link?.url &&
            <Link href={configPage.su_global_msg_link.url} className="text-white">
              {configPage.su_global_msg_link.title}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

const MessageIcon = ({messageType}: { messageType: GlobalMessageConfigPageType['su_global_msg_type'] }) => {
  switch (messageType) {
    case 'info':
      return <InformationCircleIcon width={40}/>
    case 'success':
      return <CheckCircleIcon width={40}/>
    case 'plain':
      return <BellIcon width={40}/>;
  }
  return <ExclamationTriangleIcon width={40}/>;
}

export default GlobalMessage;