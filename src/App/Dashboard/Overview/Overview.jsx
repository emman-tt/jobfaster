import { Outlet } from "react-router-dom"
import { Header } from "./header"
import Main from "./Main"

export default function Overview () {
  return (
    <section>
      <Header />
      <Main/>
 
    </section>
  )
}
