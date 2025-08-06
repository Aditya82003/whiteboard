import type { FC } from "react"
import Auth from "../components/Auth"

const SignUp:FC = () => {
  return (
    <section className="container mx-auto h-[calc(100vh-5rem)]">
        <Auth isSignIn={false}/>
    </section>
  )
}

export default SignUp