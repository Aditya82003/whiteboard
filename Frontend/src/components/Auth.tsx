import { useState, type FC } from "react"
import { BsEye } from "react-icons/bs"
import { CgPassword } from "react-icons/cg"
import { MdMail } from "react-icons/md"
import { FaRegEyeSlash } from 'react-icons/fa';
import { Link } from "react-router"
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";

type AuthProps = {
    isSignIn: boolean
}
type FormDataState = {
    fullname?:string
    email?: string,
    password?: string
}

const Auth: FC<AuthProps> = ({ isSignIn }) => {
    const [hidden, setHidden] = useState<boolean>(true)
    const [formData, setFormData] = useState<FormDataState>({
        fullname:"",
        email: "",
        password: ""
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }
    const formValidation = (): boolean => {
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

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const isValid = formValidation()
        if(!isValid) return
        console.log(formData)
    }

    return (
        <>
            {isSignIn ?
                (<div className="w-full max-h-screen h-full flex items-center justify-center">
                    <div className="max-w-md w-full bg-primary rounded-xl  flex flex-col gap-4 items-center px-4 py-6 mx-4">
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
                            <button className="btn btn-md mt-8 w-[100px] text-base-content/60 hover:text-primary">Submit</button>
                        </form>
                        <p className="tracking-tight">Didn't have an account?  <Link to="/signup" className="text-black">Create Account</Link> </p>
                    </div>
                </div>) :
                (<div className="w-full max-h-screen h-full flex items-center justify-center">
                    <div className="max-w-md w-full bg-primary rounded-xl  flex flex-col gap-4 items-center px-4 py-6 mx-4">
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
                            <button className="btn btn-md mt-8 w-[100px] text-base-content/60 hover:text-primary">Submit</button>
                        </form>
                        <p className="tracking-tight">Already have an account?  <Link to="/signin" className="text-black">Sign In</Link> </p>
                    </div>
                </div>)}
        </>
    )
}

export default Auth