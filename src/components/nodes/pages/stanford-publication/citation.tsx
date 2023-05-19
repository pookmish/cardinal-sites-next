import {DrupalPublicationCitationType} from "@/lib/types";

const Citation = ({citation}: { citation: DrupalPublicationCitationType }) => {
  return (
    <div className="flex flex-col gap-10">
      {citation.su_author &&
        <div>
          <strong>Author{citation.su_author.length > 1 ? 's' : ''}</strong>
          <br/>

          {citation.su_author.map((author, i) =>
            <div key={`author-${i}`}>
              {`${author.given} ${author.middle} ${author.family}`.replace(/ +/, ' ')}
            </div>
          )}
        </div>
      }

      {citation.su_publisher &&
        <div>
          <strong>Publisher</strong>
          <br/>
          {citation.su_publisher}
        </div>
      }

    </div>
  )
}
export default Citation;