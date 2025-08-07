import { useState, type FC } from "react"
import { BsEye } from "react-icons/bs"
import { CgPassword } from "react-icons/cg"
import { MdMail } from "react-icons/md"
import { FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast";
import { FiLoader, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { signInThunk, signUpThunk } from "../store/features/auth/authSlice";

type AuthProps = {
    isSignIn: boolean
}
type FormDataState = {
    fullname?: string
    email: string,
    password: string
}

const Auth: FC<AuthProps> = ({ isSignIn }) => {
    const { isSigningIn, isSigningUp } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const [hidden, setHidden] = useState<boolean>(true)
    const [formData, setFormData] = useState<FormDataState>({
        fullname: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    const formValidation = (): boolean => {
        if (!isSignIn && !formData.fullname) {
            toast.error("Please enter fullname")
            return false
        }
        if (!formData.email) {
            toast.error("Please enter email")
            return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter valid email")
            return false
        }
        if (!formData.password) {
            toast.error("Please enter Password")
            return false
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/.test(formData.password)) {
            toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = formValidation()
        if (!isValid) return
        const { email, password } = formData
        try {
            if (isSignIn) {
                const result = await dispatch(signInThunk({ email, password }))
                if (signInThunk.fulfilled.match(result)) {
                    toast.success("Sign in successful")
                    navigate('/')
                } else {
                    toast.error(result.payload || "Sign in failed")
                }
            } else {
                const { fullname } = formData
                if (!fullname) return
                const result = await dispatch(signUpThunk({ fullname, email, password }))
                if (signUpThunk.fulfilled.match(result)) {
                    toast.success("Sign up successful")
                    navigate('/')
                } else {
                    toast.error(result.payload || "Sign in failed")
                }
            }

        } catch (error) {
            if (isSignIn) {
                toast.error("Sign in Failed")
            } else {
                toast.error("sign up failed")
            }
        }
    }

    return (
        <>
            {isSignIn ?
            //sign in
                (<div className="w-full max-h-screen h-full flex items-center justify-center">
                    <div className="max-w-md w-full  bg-primary rounded-xl  flex flex-col gap-4 items-center px-4 py-6 mx-4">
                        <h1 className="font-bold text-2xl ">Sign In</h1>
                        <form onSubmit={handleSubmit} className="w-full space-y-3 flex flex-col items-center">
                            <div className="flex items-center gap-2 w-full rounded-lg bg-white px-4 py-2">
                                <MdMail className="w-6 h-6 text-primary" />
                                <input
                                    name="email"
                                    value={formData.email}
                                    className="w-full text-black outline-none ring-0 focus:outline-0 text-sm tracking-wide"
                                    placeholder="Email"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full rounded-lg bg-white px-4 py-2 ">
                                <CgPassword className="w-6 h-6 text-primary" />
                                <input
                                    name="password"
                                    value={formData.password}
                                    type={hidden ? "password" : "text"}
                                    className="w-full flex-1  outline-none ring-0 focus:outline-0 text-sm tracking-wide text-black"
                                    placeholder="Password"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <div onClick={() => setHidden((prev) => !prev)}>
                                    {hidden ? (<BsEye className="w-6 h-6 text-primary" />) :
                                        (<FaRegEyeSlash className="w-6 h-6 text-primary" />)
                                    }
                                </div>
                            </div>
                            <button
                        disabled={isSigningIn}
                            type="submit" className="flex justify-center  bg-black  w-full py-2 px-6 rounded-lg mt-4 ">{isSigningIn?(<FiLoader className="w-6 h-6"/>):"Sign in"}</button>
                        </form>
                        <p className="tracking-tight">Didn't have an account?  <Link to="/signup" className="text-black">Create Account</Link> </p>
                    </div>
                </div>) :
                //sign up
                (<div className="w-full max-h-screen h-full flex items-center justify-center">
                    <div className="max-w-md w-full  bg-primary rounded-xl  flex flex-col gap-4 items-center px-4 py-6 mx-4">
                        <h1 className="font-bold text-2xl ">Sign Up</h1>
                        <form onSubmit={handleSubmit} className="w-full space-y-3 flex flex-col items-center">
                            <div className="flex items-center gap-2 w-full rounded-lg bg-white px-4 py-2">
                                <FiUser className="w-6 h-6 text-primary" />
                                <input
                                    name="fullname"
                                    value={formData.fullname}
                                    className="w-full text-black outline-none ring-0 focus:outline-0 text-sm tracking-wide"
                                    placeholder="Fullname"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full rounded-lg bg-white px-4 py-2">
                                <MdMail className="w-6 h-6 text-primary" />
                                <input
                                    name="email"
                                    value={formData.email}
                                    className="w-full text-black outline-none ring-0 focus:outline-0 text-sm tracking-wide"
                                    placeholder="Email"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full rounded-lg bg-white px-4 py-2 ">
                                <CgPassword className="w-6 h-6 text-primary" />
                                <input
                                    name="password"
                                    value={formData.password}
                                    type={hidden ? "password" : "text"}
                                    className="w-full flex-1  outline-none ring-0 focus:outline-0 text-sm tracking-wide text-black"
                                    placeholder="Password"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <div onClick={() => setHidden((prev) => !prev)}>
                                    {hidden ? (<BsEye className="w-6 h-6 text-primary" />) :
                                        (<FaRegEyeSlash className="w-6 h-6 text-primary" />)
                                    }
                                </div>
                            </div>
                            <button type="submit" className="flex justify-center  bg-black  w-full py-2 px-6 rounded-lg mt-4">{isSigningUp?(<FiLoader className="w-6-h-6"/>):"Sign up"}</button>
                        </form>
                        <p className="tracking-tight">Already have an account?  <Link to="/signin" className="text-black">Sign In</Link> </p>
                    </div>
                </div>)}
        </>
    )
}

export default Auth