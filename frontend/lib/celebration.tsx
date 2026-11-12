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

interface SkidMark {
  x: number;
  z: number;
  angle: number;
  width: number;
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
    const skidMarks: SkidMark[] = [];
    let animationId: number;
    let frameCount = 0;
    const maxFrames = 480;

    // 3D projection
    const project = (point: Point3D): { x: number; y: number; scale: number } => {
      const focalLength = 600;
      const scale = Math.max(0.1, focalLength / (focalLength + point.z));
      const x = canvas.width / 2 + point.x * scale;
      const y = canvas.height / 2 + point.y * scale * 0.7;
      return { x, y, scale };
    };

    // Create realistic car geometry
    const createCar = (posX: number, posY: number, posZ: number, rotY: number, driftAngle: number) => {
      const cosY = Math.cos(rotY + driftAngle);
      const sinY = Math.sin(rotY + driftAngle);

      const transform = (x: number, y: number, z: number): Point3D => ({
        x: (x * cosY - z * sinY) + posX,
        y: y + posY,
        z: (x * sinY + z * cosY) + posZ,
      });

      const parts: Array<{ points: Point3D[]; color: string; opacity: number }> = [];

      // Main body (long chassis)
      const bodyPoints = [
        [transform(-20, 5, -35), transform(20, 5, -35), transform(20, 5, 35), transform(-20, 5, 35)], // bottom
        [transform(-20, -8, -35), transform(20, -8, -35), transform(20, -8, 35), transform(-20, -8, 35)], // top
        [transform(-20, 5, -35), transform(-20, -8, -35), transform(-20, -8, 35), transform(-20, 5, 35)], // left
        [transform(20, 5, -35), transform(20, -8, -35), transform(20, -8, 35), transform(20, 5, 35)], // right
      ];
      bodyPoints.forEach((p) => parts.push({ points: p, color: '#c41e3a', opacity: 1 }));

      // Hood (front)
      const hoodPoints = [
        [transform(-18, -8, -35), transform(18, -8, -35), transform(18, -12, -40), transform(-18, -12, -40)],
      ];
      hoodPoints.forEach((p) => parts.push({ points: p, color: '#b21630', opacity: 1 }));

      // Roof
      const roofPoints = [
        [transform(-15, -8, -15), transform(15, -8, -15), transform(15, -15, -5), transform(-15, -15, -5)],
        [transform(-15, -15, -5), transform(15, -15, -5), transform(15, -15, 15), transform(-15, -15, 15)],
      ];
      roofPoints.forEach((p) => parts.push({ points: p, color: '#b21630', opacity: 1 }));

      // Windows (front)
      const windowFrontPoints = [
        [transform(-13, -12, -20), transform(13, -12, -20), transform(13, -18, -10), transform(-13, -18, -10)],
      ];
      windowFrontPoints.forEach((p) => parts.push({ points: p, color: '#4a90e2', opacity: 0.5 }));

      // Headlights
      const headlights = [
        { center: transform(8, -6, -36), radius: 3, color: '#ffff99' },
        { center: transform(-8, -6, -36), radius: 3, color: '#ffff99' },
      ];

      // Wheels
      const wheels = [
        { center: transform(-15, 6, -20), radius: 6, color: '#1a1a1a' },
        { center: transform(15, 6, -20), radius: 6, color: '#1a1a1a' },
        { center: transform(-15, 6, 20), radius: 6, color: '#1a1a1a' },
        { center: transform(15, 6, 20), radius: 6, color: '#1a1a1a' },
      ];

      return { parts, headlights, wheels };
    };

    const drawCar3D = (posX: number, posY: number, posZ: number, rotY: number, driftAngle: number) => {
      const car = createCar(posX, posY, posZ, rotY, driftAngle);

      // Sort parts by depth
      const projectedParts = car.parts.map((part) => {
        const avgDepth = part.points.reduce((sum, p) => sum + p.z, 0) / part.points.length;
        const projected = part.points.map(project);
        return { projected, color: part.color, opacity: part.opacity, depth: avgDepth };
      }).sort((a, b) => b.depth - a.depth);

      // Draw body parts
      projectedParts.forEach(({ projected, color, opacity }) => {
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          ctx.lineTo(projected[i].x, projected[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Draw headlights
      car.headlights.forEach((light) => {
        const proj = project(light.center);
        const scale = proj.scale;
        ctx.fillStyle = light.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, light.radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw wheels
      car.wheels.forEach((wheel) => {
        const proj = project(wheel.center);
        const scale = proj.scale;
        ctx.fillStyle = wheel.color;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, wheel.radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Rim
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, wheel.radius * scale * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const addSkidMark = (x: number, z: number, angle: number) => {
      skidMarks.push({
        x,
        z,
        angle,
        width: 8,
        alpha: 1,
        life: 1,
      });
    };

    const drawSkidMarks = () => {
      for (let i = skidMarks.length - 1; i >= 0; i--) {
        const mark = skidMarks[i];
        mark.life -= 0.01;
        mark.alpha = mark.life * 0.6;

        const proj = project({ x: mark.x, y: 0, z: mark.z });
        const scale = proj.scale;

        ctx.strokeStyle = `rgba(50, 50, 50, ${mark.alpha})`;
        ctx.lineWidth = mark.width * scale;
        ctx.lineCap = 'round';
        ctx.beginPath();

        const perpX = -Math.sin(mark.angle) * 2;
        const perpZ = Math.cos(mark.angle) * 2;
        const p1 = project({ x: mark.x + perpX, y: 0, z: mark.z + perpZ });
        const p2 = project({ x: mark.x - perpX, y: 0, z: mark.z - perpZ });

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        if (mark.life <= 0) {
          skidMarks.splice(i, 1);
        }
      }
    };

    const generateSmoke = (x: number, y: number, z: number) => {
      for (let i = 0; i < 4; i++) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 25,
          y: y + (Math.random() - 0.5) * 15,
          z: z + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2,
          vz: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 18 + 12,
          alpha: 0.7,
          life: 1,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 25, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frameCount / maxFrames;

      // Car trajectory
      const carZ = -500 + progress * 700;
      const carX = Math.sin(progress * Math.PI * 3) * 200;
      const carY = -80 + Math.cos(progress * Math.PI) * 60;
      const carRotY = progress * Math.PI * 8;
      const driftAngle = Math.sin(progress * Math.PI * 4) * 0.8;

      // Tire movement for skid marks
      const tireSlip = Math.abs(Math.sin(progress * Math.PI * 4)) * 0.7;
      if (frameCount % 4 === 0 && tireSlip > 0.3) {
        addSkidMark(carX - 12, carZ, carRotY);
        addSkidMark(carX + 12, carZ, carRotY);
      }

      // Smoke from tires
      if (frameCount % 4 === 0) {
        generateSmoke(carX - 15, carY + 8, carZ + 25);
        generateSmoke(carX + 15, carY + 8, carZ + 25);
      }

      // Draw skid marks (ground)
      drawSkidMarks();

      // Update smoke
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        s.size += 0.7;
        s.life -= 0.008;
        s.alpha = s.life * 0.8;

        const proj = project({ x: s.x, y: s.y, z: s.z });
        const smokeScale = Math.max(0.2, proj.scale);

        ctx.fillStyle = `rgba(100, 100, 110, ${s.alpha})`;
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
