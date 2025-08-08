import { useEffect, useRef, type FC } from "react"

const CanvasComp: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        // Example: listen for mouse draw
        let drawing = false;
        const startDraw = () => (drawing = true);
        const endDraw = () => (drawing = false);
        const draw = (e: MouseEvent) => {
            if (!drawing) return;
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
            ctx.fill();
        };

        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mouseup", endDraw);
        canvas.addEventListener("mousemove", draw);

        // Cleanup
        return () => {
            canvas.removeEventListener("mousedown", startDraw);
            canvas.removeEventListener("mouseup", endDraw);
            canvas.removeEventListener("mousemove", draw);
        };
    }, []);
    return (
        <canvas
            ref={canvasRef}
            style={{ background: "#fff",height:"80%" }}
        />
    )
}

export default CanvasComp