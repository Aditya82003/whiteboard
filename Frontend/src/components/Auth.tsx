import type { FC } from "react"

type AuthProps = {
    isSignIn: boolean
}

const Auth: FC<AuthProps> = ({ isSignIn }) => {
    return (
        <>
            {isSignIn ? 
            (<div>
                <h1>SignIn</h1>

            </div>) :
            (<div>
                <h1>SignUp</h1>

            </div>)}
        </>
    )
}

export default Auth