import StanfordWordMark from "@components/images/stanford-wordmark";
import Image from "next/image";

const LockupLogo = ({logoUrl, siteName = ''}: { logoUrl?: string, siteName?: string }) => {
  return (
    <>
      {logoUrl &&
        <picture>
          <img
            src={logoUrl}
            alt={`${siteName} Logo`}
            className="object-contain max-w-[400px] max-h-[35px] h-auto"
          />
        </picture>
      }
      {!logoUrl &&
        <StanfordWordMark
          className="block text-cardinal-red no-underline max-h-[30px] w-auto"/>
      }
    </>
  )
}

export default LockupLogo;