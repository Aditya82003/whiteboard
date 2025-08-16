import { type FC } from "react";
import { FiCircle } from "react-icons/fi";
import { RiRectangleLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { BsTriangle } from "react-icons/bs";
import { RiSubtractLine } from "react-icons/ri";
import { FaFont } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { setFill, setStroke, setTool } from "../store/features/Messages/messageSlice";

type Tools = "Rectangle" | "Circle" | "Pencil" | "Triangle" | "Line"
type Strokes = "red" | "black" | "green" | "blue" | "white"
type Fills = "hachure" | "cross-hatch" | "solid"

const Tools: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { activeTool, stroke, fill } = useSelector((state: RootState) => state.message)
    const tools = [
        { icon: <RiRectangleLine className="w-6 h-6" />, name: "Rectangle" },
        { icon: <FiCircle className="w-6 h-6" />, name: "Circle" },
        { icon: <FaPencil className="w-6 h-6" />, name: "Pencil" },
        { icon: <BsTriangle className="w-6 h-6" />, name: "Triangle" },
        { icon: <RiSubtractLine className="w-6 h-6" />, name: "Line" },
        { icon: <FaFont className="w-6 h-6" />, name: "Text" }
    ];
    const strokes = [
        { icon: <RiRectangleLine className="w-6 h-6 bg-red-500 text-red-500" />, name: "red" },
        { icon: <RiRectangleLine className="w-6 h-6 bg-black text-black" />, name: "black" },
        { icon: <RiRectangleLine className="w-6 h-6 bg-green-500 text-green-500" />, name: "green" },
        { icon: <RiRectangleLine className="w-6 h-6 bg-blue-500 text-blue-500" />, name: "blue" },
        { icon: <RiRectangleLine className="w-6 h-6 bg-white text-white" />, name: "white" }
    ]

    const fills = [
        {
            name: "hachure",
            style: {
                backgroundImage: `repeating-linear-gradient(
          135deg,
          #1E0235 0 1px,
          transparent 1px 6px
        )`,
            },
        },
        {
            name: "cross-hatch",
            style: {
                backgroundImage: `repeating-linear-gradient(
          135deg,
          #1E0235 0 1px,
          transparent 1px 6px
        ),
        repeating-linear-gradient(
          45deg,
          #1E0235 0 1px,
          transparent 1px 6px
        )`,
            },
        },
        {
            name: "solid",
            style: {
                background: "#000",
            },
        }
    ];



    return (
        <div className="min-w-[100px] bg-base-300 rounded-xl py-2">
            <h1 className="text-sm font-medium text-center pb-1">
                Tools
            </h1>

            <div className="grid grid-cols-2 gap-3 p-3">
                {tools.map((t, i) => (
                    <button
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition border
                    ${activeTool === t.name ? "bg-primary text-white" : "hover:bg-base-200"}`}
                        title={t.name}
                        onClick={() => dispatch(setTool(t.name as Tools))}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>
            <div className="w-ful">
                <h1 className="text-sm font-medium text-center pb-1">
                    Stroke
                </h1>
                <div className="grid grid-cols-2 gap-3 p-3">
                    {strokes.map((s, i) => (
                        <button
                            key={i}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition border
                    ${stroke === s.name ? "bg-primary text-white" : "hover:bg-base-200"}`}
                            title={s.name}
                            onClick={() => dispatch(setStroke(s.name as Strokes))}
                        >
                            {s.icon}
                        </button>

                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-sm font-medium text-center pb-1">
                    Fill
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    {fills.map((f, i) => (
                        <div key={i} className={`flex justify-center items-center w-10 h-10 rounded-lg border  ${fill === f.name ? "bg-primary" : "hover:bg-base-200"}`}>
                            <div
                                key={i}
                                className="w-6 h-6 rounded border"
                                style={f.style}
                                title={f.name}
                                onClick={() => dispatch(setFill(f.name as Fills))}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tools;
