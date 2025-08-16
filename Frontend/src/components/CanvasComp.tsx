import { useEffect, useRef, useState, type FC } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addShapes, setPreview, type Shape } from "../store/features/Messages/messageSlice";
import { v4 as uuidv4 } from 'uuid';
import rough from 'roughjs';
import type { RoughCanvas } from "roughjs/bin/canvas";

const CanvasComp: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { activeTool, fill, stroke, shapes, preview } = useSelector((state: RootState) => state.message);
    const [start, setStart] = useState<{ x: number, y: number } | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw()
    }, [shapes, preview]);

    const getMousePos = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };


    console.log(fill)
    const handleMouseDown = (e: React.MouseEvent) => {
        const { x, y } = getMousePos(e)
        if (activeTool === "Text") {
            const text = prompt("Enter Text: ") || ""
            if (text.trim()) {
                dispatch(addShapes({
                    tool: "Text",
                    x, y,
                    w: 0,
                    h: 0,
                    stroke,
                    fill,
                    id: uuidv4(),
                    text
                }))
            }
            return
        }
        if (activeTool === "Pencil") {
            dispatch(setPreview({
                tool: "Pencil",
                x, y,
                w: 0,
                h: 0,
                stroke,
                fill,
                id: uuidv4(),
                points: [[x, y]]
            }))
        } else {
            setStart({ x, y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const { x, y } = getMousePos(e)
        if (activeTool === "Pencil" && preview?.tool === "Pencil") {
            dispatch(setPreview({
                ...preview, points: [...(preview.points || []), [x, y]]
            }))
            return
        }
        if (!start) return
        dispatch(setPreview({
            tool: activeTool,
            x: start.x,
            y: start.y,
            w: x - start.x,
            h: y - start.y,
            stroke,
            fill,
            id: uuidv4()
        }))
    }

    const handleMouseUp = () => {
        if (activeTool === "Pencil") {
            if (preview) {
                dispatch(addShapes(preview))
                dispatch(setPreview(null))
            }
            return
        }
        if (!start || !preview) return
        if (Math.abs(preview.w) < 5 && Math.abs(preview.h) < 5) {
            dispatch(setPreview(null))
            setStart(null)
            return
        }
        dispatch(addShapes(preview))
        setStart(null)
        dispatch(setPreview(null))

    }

    const drawShape = (rc: RoughCanvas, ctx: CanvasRenderingContext2D, shape: Shape) => {
        switch (shape.tool) {
            case "Rectangle":
                rc.rectangle(shape.x, shape.y, shape.w, shape.h, {
                    stroke: shape.stroke,
                    fill: shape.stroke,
                    fillStyle: shape.fill,
                    strokeWidth: 2
                })
                break;
            case "Circle":
                const diameter = Math.min(Math.abs(shape.w), Math.abs(shape.h));
                rc.circle(shape.x + shape.w / 2, shape.y + shape.h / 2, diameter, {
                    stroke: shape.stroke,
                    fill: shape.stroke,
                    fillStyle: shape.fill,
                    strokeWidth: 2
                }
                )
                break;
            case "Line":
                rc.line(shape.x, shape.y, shape.w + shape.x, shape.h + shape.y, {
                    stroke: shape.stroke
                })
                break
            case "Triangle":
                const x1 = shape.x;
                const y1 = shape.y;
                const x2 = shape.x + shape.w;
                const y2 = shape.y;
                const x3 = shape.x + shape.w / 2;
                const y3 = shape.y + shape.h;
                rc.polygon([[x1, y1], [x2, y2], [x3, y3]], {
                    stroke: shape.stroke,
                    fill: shape.stroke,
                    fillStyle: shape.fill,
                    strokeWidth: 2
                })
                break
            case "Pencil":
                if (shape.points && shape.points.length > 1) {
                    const path: [number, number][] = shape.points
                    rc.curve(path, {
                        stroke: shape.stroke,
                        strokeWidth: 2,
                        roughness: 0.5
                    });
                }
                break;
            case "Text":
                ctx.font = "20px Comic Sans MS, cursive, sans-serif"
                ctx.fillText(shape.text || "", shape.x, shape.y)

                break

        }
    }

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const rc = rough.canvas(canvas)

        shapes.map((shape) => drawShape(rc, ctx, shape))

        if (preview) {
            drawShape(rc, ctx, preview)
        }
    }

    return (
        <canvas
            ref={canvasRef}
            className="bg-base-100"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    )
}

export default CanvasComp;