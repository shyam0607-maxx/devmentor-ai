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

    const congratulations = [
      '🎉 Amazing Work! 🎉',
      '🌟 Excellent! 🌟',
      '💪 You Got This! 💪',
      '⭐ Outstanding! ⭐',
      '🚀 Keep Going! 🚀',
    ];

    const motivations = [
      'You are mastering DSA!',
      'Every step brings you closer!',
      'You are a coding champion!',
      'Keep pushing forward!',
      'Your potential is limitless!',
      'You are learning rapidly!',
      'Stay focused, stay strong!',
      'You are on fire! 🔥',
    ];

    const selectedCongrats = congratulations[Math.floor(Math.random() * congratulations.length)];
    const selectedMotivation = motivations[Math.floor(Math.random() * motivations.length)];

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

      // Draw congratulating message
      const progress = frameCount / maxFrames;
      const messageAlpha = Math.min(1, progress * 4) * Math.max(0, 1 - (progress - 0.7) * 3.33);

      ctx.globalAlpha = messageAlpha;

      // Main congratulation text
      ctx.font = 'bold 60px Arial, sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText(selectedCongrats, canvas.width / 2, canvas.height / 3 - 20);

      // Motivational message
      ctx.font = 'bold 32px Arial, sans-serif';
      ctx.fillStyle = '#FF69B4';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(selectedMotivation, canvas.width / 2, canvas.height / 3 + 60);

      // Additional encouragement
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillStyle = '#FFA500';
      ctx.fillText('Module Completed! 🎊', canvas.width / 2, canvas.height / 3 + 120);

      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';

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
