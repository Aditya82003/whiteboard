import { Route, Routes } from "react-router"
import Home from "./Section/Home"
import SignUp from "./Section/SignUp"
import SignIn from "./Section/SignIn"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store/store"
import { checkAuthThunk } from "./store/features/auth/authSlice"
import { BiLoaderAlt } from 'react-icons/bi';
import Board from "./Section/Board"

function App() {
  const dispatch=useDispatch<AppDispatch>()
  const {isCheckAuth,user} =useSelector((state:RootState)=>state.auth)
  useEffect(()=>{
    dispatch(checkAuthThunk())
  },[])

  if (isCheckAuth) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-white">
        <BiLoaderAlt className="animate-spin w-[100px] h-[100px]"/>
        <h1 className="text-lg font-medium tracking-wider">Checking Authentication</h1>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={user?<Home />:<SignIn/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/board/:id" element={user?<Board/>:<SignIn/>} />
        </Routes>
      </main>
      <h1>Footer</h1>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

        }}
      />
    </>
  )
}

export default App
