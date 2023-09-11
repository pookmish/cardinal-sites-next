import Link from "@components/elements/link";
import {getConfigPageResource} from "@lib/drupal/get-resource";
import {LockupSettingsConfigPageType, SiteSettingsConfigPageType} from "@lib/types";
import LockupA from "@components/elements/lockup/lockup-a";
import LockupB from "@components/elements/lockup/lockup-b";
import LockupD from "@components/elements/lockup/lockup-d";
import LockupE from "@components/elements/lockup/lockup-e";
import LockupH from "@components/elements/lockup/lockup-h";
import LockupI from "@components/elements/lockup/lockup-i";
import LockupM from "@components/elements/lockup/lockup-m";
import LockupO from "@components/elements/lockup/lockup-o";
import LockupP from "@components/elements/lockup/lockup-p";
import LockupR from "@components/elements/lockup/lockup-r";
import LockupS from "@components/elements/lockup/lockup-s";
import LockupT from "@components/elements/lockup/lockup-t";
import LockupLogo from "@components/elements/lockup/lockup-logo";

interface Props {
  siteSettings?: SiteSettingsConfigPageType
  lockupSettings?: LockupSettingsConfigPageType
}

export const Lockup = ({siteSettings, lockupSettings}: Props) => {

  const logoUrl = !lockupSettings?.su_use_theme_logo ? lockupSettings?.su_upload_logo_image?.image_style_uri?.responsive_medium : undefined;
  const lockupProps = {
    line1: lockupSettings?.su_line_1,
    line2: lockupSettings?.su_line_2,
    line3: lockupSettings?.su_line_3,
    line4: lockupSettings?.su_line_4,
    line5: lockupSettings?.su_line_5,
    siteName: siteSettings?.su_site_name ?? "Stanford",
    logoUrl: logoUrl,
  }

  if (lockupSettings?.su_lockup_enabled) {
    return (
      <div className="py-10">
        <Link href="/" className="flex no-underline">
          <div className="self-end">
            <div className="lg:inline-block pr-2 mr-2 lg:border-r border-black">
              <LockupLogo {...lockupProps}/>
            </div>
            <div
              className="lg:inline-block font-normal text-black text-m2">
              {siteSettings?.su_site_name || "University"}
            </div>
          </div>
        </Link>
      </div>
    )
  }

  switch (lockupSettings?.su_lockup_options) {
    case 'a':
      return <LockupA {...lockupProps}/>;

    case 'b':
      return <LockupB {...lockupProps}/>;

    case 'd':
      return <LockupD {...lockupProps}/>;

    case 'e':
      return <LockupE {...lockupProps}/>;

    case 'h':
      return <LockupH {...lockupProps}/>;

    case 'i':
      return <LockupI {...lockupProps}/>;

    case 'm':
      return <LockupM {...lockupProps}/>;

    case 'o':
      return <LockupO {...lockupProps}/>;

    case 'p':
      return <LockupP {...lockupProps}/>;

    case 'r':
      return <LockupR {...lockupProps}/>;

    case 's':
      return <LockupS {...lockupProps}/>;

    case 't':
      return <LockupT {...lockupProps}/>;

    case 'none':
    default:
      return (
        <div className="py-10">
          <Link href="/"
                className="flex flex-col lg:flex-row gap-4 no-underline">
            <LockupLogo {...lockupProps}/>
          </Link>
        </div>
      )
  }
}
export default Lockup;