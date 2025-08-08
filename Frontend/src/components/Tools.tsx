import { useState, type FC } from "react";
import { FiCircle } from "react-icons/fi";
import { RiRectangleLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { BsTriangle } from "react-icons/bs";
import { FaPaintBrush } from 'react-icons/fa';
import { RiSubtractLine } from "react-icons/ri";

type Tools = "Rectangle" | "Circle" | "Triangle" | "Line" | "Brush"


const Tools: FC = () => {
    const [tool, setTool] = useState<Tools>("Rectangle")
    const tools = [
        { icon: <RiRectangleLine className="w-6 h-6" />, name: "Rectangle" },
        { icon: <FiCircle className="w-6 h-6" />, name: "Circle" },
        { icon: <FaPencil className="w-6 h-6" />, name: "Pencil" },
        { icon: <BsTriangle className="w-6 h-6" />, name: "Triangle" },
        { icon: <RiSubtractLine className="w-6 h-6" />, name: "Line" },
        { icon: <FaPaintBrush className="w-6 h-6" />, name: "Brush" },
         { icon: <RiRectangleLine className="w-6 h-6 bg-red-500 text-red-500" />, name: "Red-Colour" }
    ];

    return (
        <div className="w-[150px] h-[400px] bg-base-300 rounded-xl py-2">
            <h1 className="text-sm font-medium text-center border-b-2 pb-1">
                Tools
            </h1>

            <div className="grid grid-cols-3 gap-3 p-3">
                {tools.map((t, i) => (
                    <button
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition 
                    ${tool === t.name ? "bg-primary text-white" : "hover:bg-base-200"}`}
                        title={t.name}
                        onClick={() => setTool(t.name as Tools)}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tools;
