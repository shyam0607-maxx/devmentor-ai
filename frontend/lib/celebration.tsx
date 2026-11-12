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

    interface Flower {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      alpha: number;
    }

    const flowers: Flower[] = [];
    const flowerColors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFD700', '#FFA500', '#FF4500'];
    const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];

    // Create flowers
    for (let i = 0; i < 50; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        alpha: 1,
      });
    }

    let animationId: number;
    let frameCount = 0;
    const maxFrames = 180; // 3 seconds at 60fps

    const drawFlower = (flower: Flower, emoji: string) => {
      ctx.save();
      ctx.globalAlpha = flower.alpha;
      ctx.translate(flower.x, flower.y);
      ctx.rotate(flower.rotation);
      ctx.font = `${flower.size}px serif`;
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
    };

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw flowers
      for (let i = flowers.length - 1; i >= 0; i--) {
        const flower = flowers[i];

        flower.x += flower.vx;
        flower.y += flower.vy;
        flower.rotation += flower.rotationSpeed;
        flower.vy += 0.1; // Gravity

        // Fade out
        if (flower.y > canvas.height * 0.5) {
          flower.alpha = Math.max(0, flower.alpha - 0.03);
        }

        const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        drawFlower(flower, emoji);

        if (flower.alpha <= 0) {
          flowers.splice(i, 1);
        }
      }

      frameCount++;

      if (frameCount < maxFrames && flowers.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation complete
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) {
          setTimeout(onComplete, 500);
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
