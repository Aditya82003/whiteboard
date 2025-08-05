import { Route, Routes } from "react-router"
import Home from "./Section/Home"
import SignUp from "./Section/SignUp"
import SignIn from "./Section/SignIn"
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
    <NavBar/>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/board/:id"/>
      </Routes>
    </main>
    <h1>Footer</h1>
    </>
  )
}

export default App
