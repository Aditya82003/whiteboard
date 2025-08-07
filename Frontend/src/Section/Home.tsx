import { useEffect, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { createBoardThunk, fetchBoardsThunk } from "../store/features/boards/boardSlice"

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchBoardsThunk())
  }, [])
  const { boards, currentBoard } = useSelector((state: RootState) => state.board)
  console.log(boards, currentBoard)

  const handleCreateBoard = () => {
    dispatch(createBoardThunk())
  }
  return (
    <div className="bg-base-100  p-4 ">
      <div className="container mx-auto">
        <button className="btn btn-md" onClick={handleCreateBoard}>Create Board</button>
        <button className="btn btn-md">Join Board</button>
        <button className="btn btn-md">My boards</button>
        <h1>currentBoard{currentBoard?.id}</h1>
        {boards.map((board) => (<h1>{board.id}</h1>))}
      </div>
    </div>
  )
}

export default Home