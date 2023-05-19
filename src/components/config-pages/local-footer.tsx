import {getConfigPageResource} from "@/lib/drupal/get-resource";
import {LocalFooterConfigPageType} from "@/lib/types";
import Address from "@/components/elements/address";
import Link from "@/components/elements/link";
import Wysiwyg from "@/components/elements/wysiwyg";
import LockupLogo from "@/components/elements/lockup/lockup-logo";
import LockupA from "@/components/elements/lockup/lockup-a";
import LockupB from "@/components/elements/lockup/lockup-b";
import LockupD from "@/components/elements/lockup/lockup-d";
import LockupE from "@/components/elements/lockup/lockup-e";
import LockupH from "@/components/elements/lockup/lockup-h";
import LockupI from "@/components/elements/lockup/lockup-i";
import LockupM from "@/components/elements/lockup/lockup-m";
import LockupO from "@/components/elements/lockup/lockup-o";
import LockupP from "@/components/elements/lockup/lockup-p";
import LockupR from "@/components/elements/lockup/lockup-r";
import LockupS from "@/components/elements/lockup/lockup-s";
import LockupT from "@/components/elements/lockup/lockup-t";

const LocalFooter = async () => {
  const configPage = await getConfigPageResource<LocalFooterConfigPageType>('stanford_local_footer')
  if (!configPage || !configPage.su_footer_enabled) {
    return null;
  }

  const lockupProps = {
    useDefault: configPage?.su_local_foot_use_loc,
    lockupOption: configPage?.su_local_foot_loc_op,
    line1: configPage?.su_local_foot_line_1,
    line2: configPage?.su_local_foot_line_2,
    line3: configPage?.su_local_foot_line_3,
    line4: configPage?.su_local_foot_line_4,
    line5: configPage?.su_local_foot_line_5,
    logoUrl: configPage?.su_local_foot_loc_img?.image_style_uri?.card_2x_956x636 ?? null,
  }

  return (
    <div className="local-footer bg-foggy-light py-20">
      <div className="cc">
        <div className="mb-20">
          <FooterLockup {...lockupProps} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-32">
          <div>

            {configPage.su_local_foot_address &&
              <Address {...configPage.su_local_foot_address}/>
            }

            {configPage.su_local_foot_action &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_action.map((link, index) =>
                  <li key={`footer-action-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }

            {configPage.su_local_foot_pr_co &&
              <Wysiwyg html={configPage.su_local_foot_pr_co}/>
            }
          </div>

          <div>
            {configPage.su_local_foot_prime_h &&
              <h2 className="text-m1">{configPage.su_local_foot_prime_h}</h2>}
            {configPage.su_local_foot_primary &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_primary.map((link, index) =>
                  <li key={`footer-primary-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }
            {configPage.su_local_foot_se_co &&
              <Wysiwyg html={configPage.su_local_foot_se_co}/>
            }

          </div>

          <div>
            {configPage.su_local_foot_second_h &&
              <h2 className="text-m1">{configPage.su_local_foot_second_h}</h2>}

            {configPage.su_local_foot_second &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_second.map((link, index) =>
                  <li key={`footer-second-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }

            {configPage.su_local_foot_tr2_co &&
              <Wysiwyg html={configPage.su_local_foot_tr2_co}/>
            }

          </div>

          <div>
            {configPage.su_local_foot_tr_co &&
              <Wysiwyg html={configPage.su_local_foot_tr_co}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const FooterLockup = ({useDefault = true, siteName, lockupOption, ...props}) => {
  const lockupProps = {
    ...props
  }

  if (useDefault) {
    return (
      <div className="py-10">
        <Link href="/" className="flex flex-col lg:flex-row gap-4 no-underline">
          <LockupLogo {...lockupProps}/>

          <div className="w-[1px] bg-black shrink-0"/>
          <div className="font-normal text-black text-m2 leading-none">
            {siteName || "University"}
          </div>
        </Link>
      </div>
    )
  }

  switch (lockupOption) {
    case 'none':
      return (
        <div className="py-10">
          <Link href="/"
                className="flex flex-col lg:flex-row gap-4 no-underline">
            <LockupLogo {...lockupProps}/>
          </Link>
        </div>
      )

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
  }
}
export default LocalFooter;