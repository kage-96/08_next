import { FC } from "react"

interface Props {
  children:React.ReactNode
}

export const FormGroup:FC<Props> = ({children}) => {
  return(
    <div className="flex justify-between items-center mb-6">{children}</div>
  )
}