import type { FC } from "react"
import Auth from "../components/Auth"

const SignUp:FC = () => {
  return (
    <section>
        <Auth isSignIn={false}/>
    </section>
  )
}

export default SignUp