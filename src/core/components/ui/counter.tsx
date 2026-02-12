import { cn } from '@/core/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface CountdownTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  paused?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 20,
  onComplete = () => { },
  width = '100%',
  height = '100%',
  className,
  style,
  paused = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [canvasSize, setCanvasSize] = useState<number>(300);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(initialSeconds);

  // Handle responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const size = Math.min(containerWidth, containerHeight) * 0.9;
        setCanvasSize(size);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvasSize;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.38;
    const strokeWidth = size * 0.08;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw dark background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();

    // Draw outer glow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + strokeWidth / 2, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = strokeWidth * 1.5;
    ctx.stroke();

    // Draw progress arc (orange gradient)
    const progress = timeRemaining / initialSeconds;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * progress);

    // Create gradient for the arc
    const gradient = ctx.createLinearGradient(
      centerX - radius, centerY,
      centerX + radius, centerY
    );
    gradient.addColorStop(0, '#ff6b00');
    gradient.addColorStop(0.5, '#ff8c00');
    gradient.addColorStop(1, '#ffa500');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + strokeWidth / 2, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw inner shadow circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - strokeWidth * 0.3, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the number
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.35}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.ceil(timeRemaining).toString(), centerX, centerY - size * 0.02);

    // Draw "seconds" label
    ctx.fillStyle = '#888888';
    ctx.font = `${size * 0.055}px Arial, sans-serif`;
    // ctx.fillText('seconds', centerX, centerY + size * 0.15);

  }, [timeRemaining, canvasSize, initialSeconds]);

  useEffect(() => {
    // If paused, cancel animation and save current time
    if (paused) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // Store the current time when pausing
      pausedTimeRef.current = timeRemaining;
      startTimeRef.current = null;
      return;
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const newTime = Math.max(0, pausedTimeRef.current - elapsed);

      setTimeRemaining(newTime);

      if (newTime > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [paused, onComplete]);

  return (
    <div
      ref={containerRef}
      className={cn('rounded-full border border-amber-500/30', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        padding: '5px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default CountdownTimer;