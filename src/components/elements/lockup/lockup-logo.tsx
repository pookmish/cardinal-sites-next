import StanfordWordMark from "@/components/images/stanford-wordmark";

const LockupLogo = ({logoUrl, siteName = ''}) => {
  return (
    <>
      {logoUrl &&
        <img
          src={logoUrl}
          alt={`${siteName} Logo`}
          className="object-contain max-w-[400px] max-h-[35px] h-auto"
        />
      }
      {!logoUrl &&
        <StanfordWordMark
          className="block text-cardinal-red no-underline max-h-[30px] w-auto"/>
      }
    </>
  )
}

export default LockupLogo;