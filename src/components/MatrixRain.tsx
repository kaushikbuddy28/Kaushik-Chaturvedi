import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (theme !== "matrix") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);
        const drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

        const draw = () => {
            ctx.fillStyle = "rgba(13, 2, 8, 0.1)"; // Matrix Deep Black with fade
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#00FF41"; // Matrix Green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, [theme]);

    if (theme !== "matrix") return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] opacity-50"
            style={{ filter: "blur(0.5px)" }}
        />
    );
}
