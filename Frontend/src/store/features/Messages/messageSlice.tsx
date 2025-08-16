import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Tools = "Rectangle" | "Circle" | "Pencil" | "Triangle" | "Line" |"Text"
type Strokes = "red" | "black" | "green" | "blue" | "white"
type Fills = "hachure" | "cross-hatch" | "solid"


export type Shape = {
    id: string
    tool: Tools
    x: number
    y: number
    w: number
    h: number
    stroke: Strokes
    fill: Fills
    points?: [number,number][]
    text?:string
}

type ShapeState = {
    activeTool: Tools
    stroke: Strokes
    fill: Fills
    shapes: Shape[]
    preview: Shape | null
}

const initialState: ShapeState = {
    activeTool: "Rectangle",
    stroke: "red",
    fill: "hachure",
    shapes: [],
    preview: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setTool: (state, action: PayloadAction<Tools>) => {
            state.activeTool = action.payload
        },
        setStroke: (state, action: PayloadAction<Strokes>) => {
            state.stroke = action.payload
        },
        setFill: (state, action: PayloadAction<Fills>) => {
            state.fill = action.payload
        },
        setPreview: (state, action: PayloadAction<Shape | null>) => {
            state.preview = action.payload
        },
        addShapes: (state, action: PayloadAction<Shape>) => {
            state.shapes.push(action.payload)

        }
    }
})

export const { setTool, setStroke, setFill, setPreview, addShapes } = messageSlice.actions

export default messageSlice.reducer
