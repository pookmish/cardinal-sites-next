import {getConfigPageResource} from "@/lib/drupal/get-resource";
import {GlobalMessageConfigPageType} from "@/lib/types";
import SuccessMessage from "@/components/config-pages/global-message/success-message";
import ErrorMessage from "@/components/config-pages/global-message/error-message";
import PlainMessage from "@/components/config-pages/global-message/plain-message";
import WarningMessage from "@/components/config-pages/global-message/warning-message";
import InfoMessage from "@/components/config-pages/global-message/info-message";

const GlobalMessage = async () => {
  const configPage = await getConfigPageResource<GlobalMessageConfigPageType>('stanford_global_message');
  if (!configPage || !configPage.su_global_msg_enabled) {
    return null;
  }

  const messageProps = {
    message: configPage.su_global_msg_message,
    label: configPage.su_global_msg_label,
    link: configPage.su_global_msg_link,
    header: configPage.su_global_msg_header,
  }

  switch (configPage.su_global_msg_type) {
    case 'error':
      return <ErrorMessage {...messageProps}/>
    case 'plain':
      return <PlainMessage {...messageProps}/>
    case 'success':
      return <SuccessMessage {...messageProps}/>
    case 'warning':
      return <WarningMessage {...messageProps}/>
    default:
      return <InfoMessage {...messageProps}/>
  }
}

export default GlobalMessage;