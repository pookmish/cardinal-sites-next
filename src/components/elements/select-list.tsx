import {MutableRefObject, PropsWithChildren, ReactElement, useId} from "react";

interface Props {
  label: string
  inputRef?: MutableRefObject<any>
  children: ReactElement | ReactElement[]
}

const SelectList = ({label, inputRef, children, ...props}: PropsWithChildren<Props>) => {
  const inputId = useId();
  return (
    <div {...props}>
      <label htmlFor={inputId} className="block">
        {label}
      </label>
      <select id={inputId} ref={inputRef} className="text-2xl rounded-xl p-5">
        {children}
      </select>
    </div>
  )
}
export default SelectList;