import '../src/styles/index.css';
import PageHeader from "@/components/global/page-header";
import PageFooter from "@/components/global/page-footer";
import {sourceSansPro} from "../src/styles/fonts";

export const metadata = {
  title: 'Stanford University'
}

export const revalidate = 300;

const RootLayout = ({children, modal}: { children: React.ReactNode, modal?: React.ReactNode }) => {

  return (
    <html lang="en" className={`${sourceSansPro.className} font-sans`}>
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