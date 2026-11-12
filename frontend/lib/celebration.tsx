import React, { useEffect, useRef } from 'react';

interface CelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Smoke {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  life: number;
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

    const smoke: Smoke[] = [];
    let animationId: number;
    let frameCount = 0;
    const maxFrames = 480; // 8 seconds at 60fps

    // 3D to 2D projection
    const project = (point: Point3D): { x: number; y: number; scale: number } => {
      const focalLength = 500;
      const scale = focalLength / (focalLength + point.z);
      const x = canvas.width / 2 + point.x * scale;
      const y = canvas.height / 2 + point.y * scale;
      return { x, y, scale };
    };

    // Car 3D vertices
    const getCarVertices = (posX: number, posY: number, posZ: number, rotY: number, driftAngle: number) => {
      const w = 30;
      const h = 15;
      const l = 50;

      const vertices: Point3D[] = [
        // Front bottom
        { x: -w / 2, y: h / 2, z: -l / 2 },
        { x: w / 2, y: h / 2, z: -l / 2 },
        // Front top
        { x: -w / 2, y: -h / 2, z: -l / 2 },
        { x: w / 2, y: -h / 2, z: -l / 2 },
        // Rear bottom
        { x: -w / 2, y: h / 2, z: l / 2 },
        { x: w / 2, y: h / 2, z: l / 2 },
        // Rear top
        { x: -w / 2, y: -h / 2, z: l / 2 },
        { x: w / 2, y: -h / 2, z: l / 2 },
      ];

      // Apply rotation (Y-axis for yaw + drift angle)
      const totalRotY = rotY + driftAngle;
      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);

      return vertices.map((v) => {
        let x = v.x * cosY - v.z * sinY;
        let z = v.x * sinY + v.z * cosY;
        return {
          x: x + posX,
          y: v.y + posY,
          z: z + posZ,
        };
      });
    };

    const drawCar3D = (posX: number, posY: number, posZ: number, rotY: number, driftAngle: number) => {
      const vertices = getCarVertices(posX, posY, posZ, rotY, driftAngle);
      const projected = vertices.map(project).sort((a, b) => b.scale - a.scale);

      ctx.save();

      // Draw car body faces
      const faces = [
        [0, 1, 3, 2], // Front
        [4, 5, 7, 6], // Rear
        [0, 2, 6, 4], // Left
        [1, 3, 7, 5], // Right
        [0, 1, 5, 4], // Bottom
        [2, 3, 7, 6], // Top
      ];

      faces.forEach((face, idx) => {
        const p = face.map((i) => projected[i]);
        const avgScale = face.reduce((sum, i) => sum + projected[i].scale, 0) / face.length;

        if (avgScale > 0.5) {
          const colors = ['#e74c3c', '#c0392b', '#e67e22', '#d35400', '#d35400', '#e74c3c'];
          ctx.fillStyle = colors[idx];
          ctx.beginPath();
          ctx.moveTo(p[0].x, p[0].y);
          ctx.lineTo(p[1].x, p[1].y);
          ctx.lineTo(p[2].x, p[2].y);
          ctx.lineTo(p[3].x, p[3].y);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#8b0000';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw windows on top face
      const topFace = [2, 3, 7, 6].map((i) => projected[i]);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#87CEEB';
      ctx.beginPath();
      ctx.moveTo(topFace[0].x, topFace[0].y);
      ctx.lineTo(topFace[1].x, topFace[1].y);
      ctx.lineTo(topFace[2].x, topFace[2].y);
      ctx.lineTo(topFace[3].x, topFace[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const generateSmoke = (x: number, y: number, z: number) => {
      for (let i = 0; i < 5; i++) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          z: z + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          vz: (Math.random() - 0.5) * 4 - 2,
          size: Math.random() * 20 + 15,
          alpha: 0.7,
          life: 1,
        });
      }
    };

    const animate = () => {
      // Clear canvas with fade
      ctx.fillStyle = 'rgba(20, 20, 30, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frameCount / maxFrames;

      // Car moves from far (z = -500) to near (z = 200), drifting laterally
      const carZ = -500 + progress * 700;
      const carX = Math.sin(progress * Math.PI * 3) * 150;
      const carY = Math.cos(progress * Math.PI * 1.5) * 50;
      const carRotY = progress * Math.PI * 6;
      const driftAngle = Math.sin(progress * Math.PI * 4) * 0.6;

      // Generate smoke from rear wheels
      if (frameCount % 3 === 0) {
        generateSmoke(carX - 20, carY + 10, carZ + 25);
        generateSmoke(carX + 20, carY + 10, carZ + 25);
      }

      // Update and draw smoke
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        s.size += 0.8;
        s.life -= 0.008;
        s.alpha = s.life * 0.8;

        const proj = project({ x: s.x, y: s.y, z: s.z });
        const smokeScale = Math.max(0.3, proj.scale);

        ctx.fillStyle = `rgba(120, 120, 130, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, s.size * smokeScale, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0) {
          smoke.splice(i, 1);
        }
      }

      // Draw car
      drawCar3D(carX, carY, carZ, carRotY, driftAngle);

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
