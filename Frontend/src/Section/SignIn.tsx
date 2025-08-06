import type { FC } from "react"
import Auth from "../components/Auth"

const SignIn:FC = () => {
  return (
    <section className="container mx-auto h-[calc(100vh-5rem)]">
        <Auth isSignIn={true}/>
        
    </section>
  )
}

export default SignIn