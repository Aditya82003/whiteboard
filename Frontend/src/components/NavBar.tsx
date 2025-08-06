import type { FC } from "react"
import { Link } from "react-router"
import { BiSolidChalkboard } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { LuLogIn } from 'react-icons/lu';

const NavBar: FC = () => {
    return (
        <header className="w-full bg-base-300">
            <div className="container mx-auto px-6 h-12 py-2">
                <div className="h-full flex items-center justify-between">
                    <Link to="/" className="flex gap-4 items-center">
                        <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BiSolidChalkboard className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="font-bold text-lg">Board</h1>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link to="/setting" className="flex gap-2 items-center">
                                <AiFillSetting className="w-5 h-5"/>
                            <h1 className="hidden sm:inline ">Setting</h1>
                        </Link>
                        <Link to="/signin" className="flex gap-2 items-center">
                            <LuLogIn className="w-5 h-5"/>
                            <h1 className="hidden sm:inline">LogIn</h1>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar