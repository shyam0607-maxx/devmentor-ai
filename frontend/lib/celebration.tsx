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
    const flowerColors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFD700', '#FFA500', '#FF4500', '#FF6B9D', '#FF007F'];
    const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];

    // Create flowers
    for (let i = 0; i < 80; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: -50,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        size: Math.random() * 15 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        alpha: 1,
      });
    }

    let animationId: number;
    let frameCount = 0;
    const maxFrames = 200;

    const drawFlower = (flower: Flower) => {
      ctx.save();
      ctx.globalAlpha = flower.alpha;
      ctx.fillStyle = flower.color;
      ctx.translate(flower.x, flower.y);
      ctx.rotate(flower.rotation);

      // Draw a simple flower shape (5-petal flower)
      const petalSize = flower.size;
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i / 5) * Math.PI * 2);
        ctx.fillRect(0, -petalSize / 2, petalSize / 3, petalSize);
        ctx.restore();
      }

      // Draw center
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, 0, petalSize / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      // Clear canvas with slight fade
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw flowers
      for (let i = flowers.length - 1; i >= 0; i--) {
        const flower = flowers[i];

        flower.x += flower.vx;
        flower.y += flower.vy;
        flower.rotation += flower.rotationSpeed;
        flower.vy += 0.12; // Gravity

        // Fade out as it falls
        if (flower.y > canvas.height * 0.6) {
          flower.alpha = Math.max(0, flower.alpha - 0.04);
        }

        drawFlower(flower);

        if (flower.alpha <= 0 || flower.y > canvas.height) {
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
