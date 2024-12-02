import { ReactNode } from "react"

type AlertProps = {
    children: ReactNode
}

export default function Alert({children} : AlertProps) {

  return (
    <div className=" bg-slate-800 text-white uppercase p-3 rounded-lg text-center font-extrabold shadow">
        {children}
    </div>
  )
}
