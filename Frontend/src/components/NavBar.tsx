import { useState, type FC } from "react"
import { Link } from "react-router"
import { BiSolidChalkboard } from 'react-icons/bi';
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { signOutThunk } from "../store/features/auth/authSlice";
import toast from "react-hot-toast";


const NavBar: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const [opened, setOpened] = useState<boolean>(false)
    const handleClick = () => {
        setOpened((prevState) => !prevState)
    }

    const handleLogOut=()=>{
        try{
            dispatch(signOutThunk())
            toast.success("Logout")
        }catch(err){
            toast.error("Log out failed")
        }
    }
    return (
        <header className="w-full bg-base-300">
            <div className="container mx-auto px-6 h-16 py-2  ">
                <div className="w-full h-full flex items-center justify-between ">
                    <Link to="/" className="flex gap-4 items-center">
                        <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BiSolidChalkboard className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="font-bold text-lg">MindInk</h1>
                    </Link>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="setting" className="flex  items-center gap-2 hover:text-primary">
                            <FiSettings className="w-5 h-5" />
                            <span>Setting</span>
                        </Link>
                        {user ?
                        <div className="flex items-center gap-2 hover:text-primary" onClick={handleLogOut}>
                            <FiLogOut/>
                            <span>Logout</span>
                        </div> :
                        <Link
                            to="/signin"
                            className="flex items-center gap-2 hover:text-primary"
                            onClick={() => setOpened(false)}
                        >
                            <FiUser className="w-5 h-5" />
                            <span>Sign in</span>
                        </Link>
                    }
                    </div>
                    <div className="md:hidden">
                        <div className="size-9 rounded-xl hover:bg-primary/10 flex items-center justify-center" onClick={handleClick}>
                            {opened ? (<AiOutlineClose className="w-5 h-5" />) : (<AiOutlineMenu className="w-5 h-5" />)}
                        </div>
                    </div>
                </div>
            </div>
            {opened && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-base-200 flex flex-col gap-4 px-6 py-4 z-50 rounded-b-2xl">
                    <Link
                        to="/setting"
                        className="flex items-center gap-2 hover:text-primary"
                        onClick={() => setOpened(false)}
                    >
                        <FiSettings className="w-5 h-5" />
                        <span>Setting</span>
                    </Link>
                    {user ?
                        <div className="flex items-center gap-2 hover:text-primary" onClick={handleLogOut}>
                            <FiLogOut/>
                            <span>Logout</span>
                        </div> :
                        <Link
                            to="/signin"
                            className="flex items-center gap-2 hover:text-primary"
                            onClick={() => setOpened(false)}
                        >
                            <FiUser className="w-5 h-5" />
                            <span>Sign in</span>
                        </Link>
                    }
                </div>
            )}
        </header>
    )
}

export default NavBar