import {useId} from "react";

const StringWithLines = ({text}: { text: string }) => {
  const id = useId()
  return (
    <>
      {text.split('\n').map((line, i) =>
        <p key={`${id}-changelog-${i}`}>
          {line}
        </p>
      )}
    </>
  )
}
export default StringWithLines;