import React, { useEffect, useRef } from 'react';

interface CelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ isActive, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Smoke {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
    }

    const smoke: Smoke[] = [];
    let animationId: number;
    let frameCount = 0;
    const maxFrames = 240;

    // Car position and state
    const car = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      rotation: 0,
      driftAngle: 0,
      scale: 80,
    };

    const drawCar = (x: number, y: number, rotation: number, driftAngle: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Car body (main chassis)
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.moveTo(-scale * 0.4, -scale * 0.15);
      ctx.lineTo(scale * 0.4, -scale * 0.15);
      ctx.lineTo(scale * 0.35, scale * 0.15);
      ctx.lineTo(-scale * 0.35, scale * 0.15);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#c0392b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cabin/roof
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.moveTo(-scale * 0.25, -scale * 0.15);
      ctx.lineTo(scale * 0.15, -scale * 0.15);
      ctx.lineTo(scale * 0.1, -scale * 0.35);
      ctx.lineTo(-scale * 0.2, -scale * 0.35);
      ctx.closePath();
      ctx.fill();

      // Windows
      ctx.fillStyle = '#87CEEB';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(-scale * 0.15, -scale * 0.25);
      ctx.lineTo(scale * 0.05, -scale * 0.25);
      ctx.lineTo(scale * 0.02, -scale * 0.2);
      ctx.lineTo(-scale * 0.12, -scale * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // Front wheels
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath();
      ctx.arc(scale * 0.2, scale * 0.15, scale * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#34495e';
      ctx.beginPath();
      ctx.arc(scale * 0.2, scale * 0.15, scale * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Rear wheels
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath();
      ctx.arc(-scale * 0.25, scale * 0.15, scale * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#34495e';
      ctx.beginPath();
      ctx.arc(-scale * 0.25, scale * 0.15, scale * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Headlights
      ctx.fillStyle = '#fff9e6';
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(scale * 0.38, -scale * 0.08, scale * 0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(scale * 0.38, scale * 0.08, scale * 0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const generateSmoke = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 30 + 20,
          alpha: 0.6,
          life: 1,
        });
      }
    };

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update car position and rotation
      const progress = frameCount / maxFrames;
      const easeProgress = Math.sin(progress * Math.PI);

      car.x = canvas.width / 2 + Math.sin(progress * Math.PI * 3) * 200;
      car.y = canvas.height / 2 + Math.cos(progress * Math.PI * 2) * 100;
      car.rotation = progress * Math.PI * 4 + Math.sin(progress * Math.PI) * 0.3;
      car.driftAngle = Math.sin(progress * Math.PI * 2) * 0.4;

      // Generate smoke
      if (frameCount % 2 === 0) {
        const smokeX = car.x - Math.cos(car.rotation) * 40;
        const smokeY = car.y - Math.sin(car.rotation) * 40;
        generateSmoke(smokeX, smokeY);
      }

      // Update and draw smoke
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.x += s.vx;
        s.y += s.vy;
        s.size += 1;
        s.life -= 0.015;
        s.alpha = s.life * 0.7;

        ctx.fillStyle = `rgba(150, 150, 150, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0) {
          smoke.splice(i, 1);
        }
      }

      // Draw car
      drawCar(car.x, car.y, car.rotation, car.driftAngle, car.scale);

      frameCount++;

      if (frameCount < maxFrames) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) {
          setTimeout(onComplete, 300);
        }
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};
