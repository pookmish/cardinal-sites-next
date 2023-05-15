import Link from "@/components/elements/link";
import StanfordWordMark from "@/components/images/stanford-wordmark";
import {getConfigPageResource} from "@/lib/drupal/get-resource";
import {SiteSettingsConfigPageType} from "@/lib/types";

export const Lockup = async () => {
  const siteSettings = await getConfigPageResource<SiteSettingsConfigPageType>('stanford_basic_site_settings')
  const lockupSettings = await getConfigPageResource<SiteSettingsConfigPageType>('lockup_settings')

  return (
    <div className="py-10">
      <Link href="/" className="lg:flex">
        <StanfordWordMark className="block text-cardinal-red no-underline max-h-[30px] w-auto"/>

        <span className="text-black text-m2 leading-none">
          {siteSettings.su_site_name || "University"}
        </span>
      </Link>
    </div>
  )
}
export default Lockup;