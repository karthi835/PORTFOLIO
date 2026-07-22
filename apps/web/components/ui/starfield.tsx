'use client';

import { useEffect, useRef } from 'react';

interface StarfieldProps {
  starCount?: number;
  waveFrequency?: number;
  starEscapeWidth?: number;
  voidWidth?: number;
  starColor?: { r: number; g: number; b: number };
  maxOpacity?: number;
  rotationSpeed?: number;
  waveSpeed?: number;
}

const Starfield = ({
  starCount = 25000,
  waveFrequency = 20,
  starEscapeWidth = 255,
  voidWidth = 100,
  starColor = { r: 168, g: 85, b: 247 },
  maxOpacity = 255,
  rotationSpeed = 0.0005,
  waveSpeed = 0.01,
}: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let size = { x: 0, y: 0 };
    let imagedata: ImageData;
    let data: Uint32Array;
    let startTime = Date.now();
    let currentTime = 0;

    const setSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Prevent createImageData(0, 0) error when container is hidden (display: none)
      if (width <= 0 || height <= 0) {
        size.x = 0;
        size.y = 0;
        return;
      }

      size.x = width;
      size.y = height;
      canvas.width = size.x;
      canvas.height = size.y;

      // Initialize pixel data safely
      imagedata = context.createImageData(size.x, size.y);
      const buf = new ArrayBuffer(imagedata.data.length);
      new Uint8ClampedArray(buf);
      data = new Uint32Array(imagedata.data.buffer);
      starsRef.current = []; // Reset stars on resize
    };

    const rotate = (cx: number, cy: number, x: number, y: number, radians: number) => {
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = cos * (x - cx) + sin * (y - cy) + cx;
      const ny = cos * (y - cy) - sin * (x - cx) + cy;
      return { x: nx, y: ny };
    };

    const createStar = () => {
      const star: any = {};
      const rands = [
        Math.random() * (starEscapeWidth / 2) + 1,
        Math.random() * (starEscapeWidth / 2) + starEscapeWidth,
      ];
      star.orbital = rands.reduce((p: number, c: number) => p + c, 0) / rands.length;
      star.opacity = Math.floor(
        (1 - star.orbital / starEscapeWidth) * maxOpacity + Math.random() * 80
      );
      star.position = {
        x: size.x / 2,
        y: size.y / 2 + star.orbital,
      };
      star.originPosition = { ...star.position };
      star.rotation = Math.PI * (Math.random() * 2);
      star.position = rotate(
        size.x / 2,
        size.y / 2,
        star.position.x,
        star.position.y,
        star.rotation
      );
      star.realPosition = { ...star.position };
      star.rSpeed = Math.random() * rotationSpeed + star.opacity / 20000;
      star.waveSpeed1 = Math.random() * waveSpeed;
      star.waveSpeed2 = Math.random() * waveSpeed;
      star.wave1 = Math.sin(currentTime * star.waveSpeed1) * waveFrequency;
      star.wave2 = Math.sin(currentTime * star.waveSpeed2) * waveFrequency;
      star.id = starsRef.current.length;
      starsRef.current.push(star);
    };

    const drawStar = (star: any) => {
      // Clear previous pixel
      const prevIndex =
        Math.floor(star.realPosition.y + star.wave1) * size.x +
        Math.floor(star.realPosition.x + star.wave2);
      if (prevIndex >= 0 && prevIndex < data.length) {
        data[prevIndex] = 0;
      }

      // Update star properties
      star.wave1 = Math.sin(currentTime * star.waveSpeed1) * waveFrequency;
      star.wave2 = Math.sin(currentTime * star.waveSpeed2) * waveFrequency;
      star.realPosition = rotate(
        size.x / 2,
        size.y / 2,
        star.position.x,
        star.position.y,
        star.rSpeed * currentTime
      );
      star.opacity = Math.floor(
        (1 - star.orbital / starEscapeWidth) * maxOpacity + Math.random() * 80
      );

      // Draw new pixel
      const index =
        Math.floor(star.realPosition.y + star.wave1) * size.x +
        Math.floor(star.realPosition.x + star.wave2);
      if (index >= 0 && index < data.length) {
        data[index] =
          (star.opacity << 24) | // alpha
          (starColor.b << 16) | // blue
          (starColor.g << 8) | // green
          starColor.r; // red
      }
    };

    const render = () => {
      if (size.x <= 0 || size.y <= 0 || !imagedata || !data) {
        if (container.clientWidth > 0 && container.clientHeight > 0) {
          setSize();
        }
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }
      currentTime = (Date.now() - startTime) / 10;

      context.fillStyle = '#000000';
      context.fillRect(0, 0, size.x, size.y);

      // Create new stars
      if (starsRef.current.length < starCount) {
        for (let i = 0; i < Math.min(100, starCount - starsRef.current.length); i++) {
          createStar();
        }
      }

      // Draw all stars
      for (const star of starsRef.current) {
        drawStar(star);
      }

      // Update canvas
      context.putImageData(imagedata, 0, 0);

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Initialize
    setSize();
    render();

    // Handle resize
    const resizeHandler = () => setSize();
    window.addEventListener('resize', resizeHandler);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starCount, waveFrequency, starEscapeWidth, voidWidth, starColor, maxOpacity, rotationSpeed, waveSpeed]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export { Starfield };
