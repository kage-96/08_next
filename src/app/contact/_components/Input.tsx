import { FC } from "react"

interface Props {
  type:string,
  id:string,
  value:string,
  isSubmitting:boolean,
  onChange:(value:string) => void
}

export const Input:FC<Props> = ({type, id,value,isSubmitting,onChange}) => {
  return(
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-xl p-4 w-full"
      readOnly={isSubmitting}
    />
  )
}