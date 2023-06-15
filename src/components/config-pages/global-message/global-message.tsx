import {DrupalLinkFieldType} from "@lib/types";
import SuccessMessage from "@components/config-pages/global-message/success-message";
import ErrorMessage from "@components/config-pages/global-message/error-message";
import PlainMessage from "@components/config-pages/global-message/plain-message";
import WarningMessage from "@components/config-pages/global-message/warning-message";
import InfoMessage from "@components/config-pages/global-message/info-message";

interface Props {
  type: 'error' | 'plain' | 'warning' | 'info' | 'success'
  message?: string
  label?: string
  link?: DrupalLinkFieldType
  header?: string
  enabled?: boolean
}

const GlobalMessage = ({type, enabled = false, ...props}: Props) => {
  if (!enabled) {
    return null;
  }

  switch (type) {
    case 'error':
      return <ErrorMessage {...props}/>
    case 'plain':
      return <PlainMessage {...props}/>
    case 'success':
      return <SuccessMessage {...props}/>
    case 'warning':
      return <WarningMessage {...props}/>
    default:
      return <InfoMessage {...props}/>
  }
}

export default GlobalMessage;