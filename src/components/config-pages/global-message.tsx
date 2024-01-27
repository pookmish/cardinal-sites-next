import {BellIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import {clsx} from "clsx";
import {StanfordGlobalMessage} from "@lib/gql/__generated__/drupal";

const GlobalMessage = ({configPage}: { configPage?: StanfordGlobalMessage }) => {
  if (!configPage || !configPage.suGlobalMsgEnabled) return;

  const wrapperClasses = clsx({
    'bg-digital-blue-dark': configPage.suGlobalMsgType === 'info',
    'bg-illuminating-dark': configPage.suGlobalMsgType === 'warning',
    'bg-digital-green': configPage.suGlobalMsgType === 'success',
    'bg-foggy-light': configPage.suGlobalMsgType === 'plain',
    'bg-digital-red': configPage.suGlobalMsgType === 'error',
    'text-white': ['error', 'info', 'success'].includes(configPage.suGlobalMsgType)
  });
  return (
    <div className={wrapperClasses + " py-10"}>
      <div className="centered flex flex-col lg:flex-row gap-10">
        <div className="flex items-center leading-none shrink-0">
          <MessageIcon messageType={configPage.suGlobalMsgType}/>
          {configPage.suGlobalMsgLabel}:
        </div>
        <div className="[&_a]:text-white [&_a.btn]:bg-transparent [&_a.btn]:border-2 [&_a.btn]:border-white">
          {configPage.suGlobalMsgHeader && <H2>{configPage.suGlobalMsgHeader}</H2>}
          {configPage.suGlobalMsgMessage?.processed &&
            <Wysiwyg html={configPage.suGlobalMsgMessage.processed}/>
          }
          {configPage.suGlobalMsgLink?.url &&
            <Link href={configPage.suGlobalMsgLink.url} className="text-white">
              {configPage.suGlobalMsgLink.title}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

const MessageIcon = ({messageType}: { messageType: StanfordGlobalMessage['suGlobalMsgType'] }) => {
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