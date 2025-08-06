import { Route, Routes } from "react-router"
import Home from "./Section/Home"
import SignUp from "./Section/SignUp"
import SignIn from "./Section/SignIn"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/board/:id" />
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
