import '../src/styles/index.css';
import {sourceSansPro} from "../src/styles/fonts";
import PageHeader from "@components/global/page-header";
import PageFooter from "@components/global/page-footer";
import Editori11y from "@components/tools/editorially";
import Script from "next/script";
import GoogleAnalytics from "@components/tools/google-analytics";
import {isDraftMode} from "@lib/drupal/utils";
import BackToTop from "@components/elements/back-to-top";

export const metadata = {
  // Update the metadataBase to the production domain.
  // metadataBase: new URL('https://somesite.stanford.edu'),
  title: 'Stanford University'
}

// This is the validation only for the components in the layout, not the pages themselves. Things like the menu, and
// global header and footer config pages.
export const revalidate = 86400;

const RootLayout = ({children, modal}: { children: React.ReactNode, modal: React.ReactNode }) => {
  const draftMode = isDraftMode();
  return (
    <html lang="en" className={`${sourceSansPro.className} font-sans`}>


    {draftMode && <Editori11y/>}

    {/* Add Google Analytics and SiteImprove when not in draft mode. */}
    {(!draftMode && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
      <>
        <Script async src="//siteimproveanalytics.com/js/siteanalyze_80352.js"/>
        <GoogleAnalytics/>
      </>
    }
    <body>
    <nav>
      <a href="#main-content" className="skiplink">Skip to main content</a>
    </nav>

    <div className="flex flex-col min-h-screen">
      <PageHeader/>
      <main id="main-content" className="flex-grow mb-32">
        {children}
        {modal}
      </main>
      <BackToTop/>
      <PageFooter/>
    </div>
    </body>
    </html>
  )
}
export default RootLayout;