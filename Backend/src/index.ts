import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookiesParser from "cookie-parser"
import authRoutes from './routes/auth.routes'
import boardRoutes from './routes/board.routes'
import messageRoutes from './routes/message.routes'


const app=express()
const PORT = process.env.PORT||3001

app.use(express.json())
app.use(cookiesParser())

app.use('/api/auth',authRoutes)
app.use('/api/board',boardRoutes)
app.use('/api/message',messageRoutes)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))