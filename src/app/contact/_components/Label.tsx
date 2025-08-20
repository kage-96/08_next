import { FC } from "react"

interface Props{
  htmlFor:string,
  text:string
}

export const Label:FC<Props> = ({htmlFor,text}) => {
  return(
    <label htmlFor={htmlFor} className="w-[240px]">
      {text}
    </label>
  )
}