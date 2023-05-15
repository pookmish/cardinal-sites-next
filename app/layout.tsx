import '../src/styles/index.css';
import PageHeader from "@/components/global/page-header";
import PageFooter from "@/components/global/page-footer";
import {Source_Sans_Pro} from "@next/font/google";

const SourceSansPro = Source_Sans_Pro({
  subsets: ['latin'],
  weight: "400",
  weights: [400, 600, 700]
});

export const metadata = {
  title: 'Stanford University'
}

export const revalidate = 300;

const RootLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={SourceSansPro.className}>
    <body>
    <nav>
      <a href="#main-content" className="skiplink">Skip to main content</a>
    </nav>

    <div className="flex flex-col min-h-screen">
      <PageHeader/>
      <main id="main-content" className="flex-grow mb-32">
        {children}
      </main>
      <PageFooter/>
    </div>
    </body>
    </html>
  )
}
export default RootLayout;