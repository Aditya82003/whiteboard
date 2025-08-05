import type { FC } from "react"
import Auth from "../components/Auth"

const SignIn:FC = () => {
  return (
    <section>
        <Auth isSignIn={true}/>
    </section>
  )
}

export default SignIn