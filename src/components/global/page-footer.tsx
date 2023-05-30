import LocalFooter from "@/components/config-pages/local-footer";
import SuperFooter from "@/components/config-pages/super-footer";

const PageFooter = async () => {
  return (
    <footer>
      {/* @ts-expect-error Async Server Component */}
      <SuperFooter/>
      {/* @ts-expect-error Async Server Component */}
      <LocalFooter/>

      <div className="bg-cardinal-red py-10">
        <div className="centered lg:flex lg:items-start lg:gap-20">
          <div className="text-center mb-10">
            <a className="font-stanford text-white text-center no-underline hocus:text-white" href="https://www.stanford.edu">
              <div className="text-[3.2rem]">Stanford</div>
              <div>University</div>
            </a>
          </div>
          <div className="mx-auto lg:mx-0">
            <nav className="flex gap-20 sm:gap-0 sm:flex-col justify-center lg:justify-start mb-5">
              <ul className="text-2xl md:text-3xl list-unstyled sm:flex sm:gap-10 justify-center lg:justify-start">
                <li className="">
                  <a href="https://www.stanford.edu" className="text- text-white no-underline hocus:text-white hocus:underline">
                    Stanford Home
                  </a>
                </li>
                <li className="">
                  <a href="https://visit.stanford.edu/plan/" className="text-white no-underline hocus:text-white hocus:underline">
                    Maps &amp; Directions
                  </a>
                </li>
                <li className="">
                  <a href="https://www.stanford.edu/search/" className="text-white no-underline hocus:text-white hocus:underline">
                    Search Stanford
                  </a>
                </li>
                <li>
                  <a href="https://emergency.stanford.edu" className="text-white no-underline hocus:text-white hocus:underline">
                    Emergency Info
                  </a>
                </li>
              </ul>

              <ul className="text-2xl lg:text-3xl sm:text-xl list-unstyled sm:flex sm:gap-10 justify-center lg:justify-start">
                <li className="">
                  <a href="https://www.stanford.edu/site/terms/"
                     title="Terms of use for sites" className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Terms of Use
                  </a>
                </li>
                <li className="">
                  <a href="https://www.stanford.edu/site/privacy/"
                     title="Privacy and cookie policy" className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Privacy
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://uit.stanford.edu/security/copyright-infringement"
                    title="Report alleged copyright infringement" className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Copyright
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                    title="Ownership and use of Stanford trademarks and images"
                    className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Trademarks
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://bulletin.stanford.edu/pages/c7vDgeOuJIfpZe8GKmW3"
                    title="Non-discrimination policy" className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Non-Discrimination
                  </a>
                </li>
                <li>
                  <a href="https://www.stanford.edu/site/accessibility"
                     title="Report web accessibility issues" className="font-normal text-white no-underline hocus:text-white hocus:underline">
                    Accessibility
                  </a>
                </li>
              </ul>
            </nav>
            <div className="text-white text-xl text-center lg:text-left">
              © Stanford University. Stanford, California 94305.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default PageFooter;