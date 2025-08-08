import { type FC } from "react"
import CanvasComp from "../components/CanvasComp";
import Tools from "../components/Tools";

const Board: FC = () => {


  return (
    <div className=" relative overflow-hidden ">
      <div className="absolute top-44 left-2">
        <Tools />
      </div>
      <CanvasComp />
    </div>
  );
};
export default Board