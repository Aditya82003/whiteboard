import { useEffect, useState, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { createBoardThunk, fetchBoardsThunk } from "../store/features/boards/boardSlice"
import { FiLoader, FiUser } from "react-icons/fi"
import profileDefaultPic from '../assets/OIP-removebg-preview.png'
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { currentBoard, boards, isBoardLoading } = useSelector((state: RootState) => state.board)
  useEffect(() => {
    dispatch(fetchBoardsThunk())
  }, [])
  const [showOwnedOnly, setShowOwnedOnly] = useState<boolean>(false);
  const navigate = useNavigate()

  const filteredBoards = showOwnedOnly
    ? boards.filter((board) => board.ownerId === user?.id)
    : boards;

  const handleCreateBoard = async () => {
    try {
      const result = await dispatch(createBoardThunk()).unwrap()
      console.log(result)
      navigate(`/board/${result.id}`)
    }catch(error){
      toast.error("Unavailable to create board")
    }
  }
  console.log(currentBoard?.id)
  if (isBoardLoading || !user) {
    return (<div className="h-[calc(100vh-8rem)] flex flex-col gap-4 items-center justify-center">
      <FiLoader className="w-24 h-24 animate-spin" />
      <p className="gont-semibold tracking-wide text-2xl">Loading...</p>
    </div>
    )
  }
  return (
    <div className="bg-primary-content min-h-screen p-4 ">
      <div className="container mx-auto">
        <div className="py-2 px-4 bg-base-100 rounded-lg">
          <div>
            <div className=" w-full flex flex-col md:flex-row gap-4 justify-between items-center">
              <h1 className="text-xl font-medium tracking-tighter">Wellcome Back <span className="text-primary-content">{user.fullname}</span></h1>
              <div className="flex gap-4">
                <button className="bg-primary-content text-base-100 font-semibold rounded-xl py-2 px-2 hover:bg-primary-content/80 active:scale-95" onClick={handleCreateBoard}>Create Board</button>
                <button className="bg-primary-content text-base-100 font-medium  rounded-xl py-2 px-2 hover:bg-primary-content/80 active:scale-95">Join Board</button>
              </div>
            </div>
            <div>
              <h1 className="flex items-center gap-2 font-medium mt-6 text-lg"><FiUser className="w-6 h-6 text-primary" />My Profile</h1>
              <div className="flex justify-between items-center gap-2">
                <div className="max-w-[240px] md:w-full gap-1 pl-6 md:text-lg md:font-medium">
                  <p className="">Full Name: {user.fullname} </p>
                  <p>Email: {user.email}</p>
                  <p className="truncate w-[200px] md:w-[400px]">ID: {user.id}</p>
                </div>
                <div className="flex justify-center items-center w-20 md:w-26  md:h-26 bg-black rounded-full overflow-hidden">
                  <img
                    src={user.profilePic || profileDefaultPic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-100 w-full max-h-[500px]  mt-4 rounded-lg p-4 overflow-y-auto">
          <div className="flex justify-between">
            <h1 className="font-medium text-xl">My Board</h1>
            <div >
              <input type="checkbox" checked={showOwnedOnly} onChange={() => setShowOwnedOnly(!showOwnedOnly)} /><span className="ml-2">Owned</span>
            </div>
          </div>
          <div className="py-2">{filteredBoards && filteredBoards.length > 0 ? (filteredBoards.map((board) => (
            <Link key={board.id} to={`/board/${board.id}`} className="block">
              <div  className="bg-base-300 rounded-lg p-2 mt-2">
                <h1>Board Id: {board.id}</h1>
                <h1>Owner ID: {board.ownerId}</h1>
                <h1>Created At: {board.createdAt.split("T")[0]}</h1>
                <div className="flex flex-wrap gap-2">
                  {board.collaborators?.length ? (
                    board.collaborators.map((user) => (
                      <span
                        key={user.id}
                        className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                      >
                        {user.fullname}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No collaborators</p>
                  )}
                </div>
              </div>
            </Link>
          ))) : (<p className="text-warning-content">No boards</p>)}</div>

        </div>
      </div>

    </div>
  )
}

export default Home