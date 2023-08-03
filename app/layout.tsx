import '../src/styles/index.css';
import PageHeader from "@components/global/page-header";
import PageFooter from "@components/global/page-footer";
import {sourceSansPro} from "../src/styles/fonts";
import Editori11y from "@components/tools/editorially";
import Script from "next/script";
import GoogleAnalytics from "@components/tools/google-analytics";

export const metadata = {
  title: 'Stanford University'
}

export const revalidate = 3600;

const RootLayout = ({children, modal}: { children: React.ReactNode, modal?: React.ReactNode }) => {

  return (
    <html lang="en" className={`${sourceSansPro.className} font-sans`}>
    <Editori11y/>
    {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
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
      <PageFooter/>
    </div>
    </body>
    </html>
  )
}
export default RootLayout;