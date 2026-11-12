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

    // Camera is looking down at an angle at the road
    const project = (point: Point3D): { x: number; y: number; scale: number } => {
      // Camera looking down from angle, car on ground (y=0)
      const cameraDistance = 600;
      const depth = point.z + cameraDistance;
      const scale = Math.max(0.1, 300 / depth);

      const x = canvas.width / 2 + point.x * scale;
      const y = canvas.height * 0.7 - point.z * scale * 0.3;

      return { x, y, scale };
    };

    // Draw road
    const drawRoad = () => {
      // Road surface - dark asphalt
      ctx.fillStyle = '#2a2a2a';
      for (let z = -600; z < 200; z += 50) {
        const p1 = project({ x: -150, y: 0, z });
        const p2 = project({ x: 150, y: 0, z });
        const p3 = project({ x: 150, y: 0, z: z + 50 });
        const p4 = project({ x: -150, y: 0, z: z + 50 });

        ctx.fillStyle = z % 100 === 0 ? '#333333' : '#2a2a2a';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fill();
      }

      // Road markings - center line
      ctx.strokeStyle = '#ffff99';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      const p1 = project({ x: 0, y: 0, z: -600 });
      const p2 = project({ x: 0, y: 0, z: 200 });
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Road edges - white lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      for (let z = -600; z < 200; z += 30) {
        const p1 = project({ x: -150, y: 0, z });
        const p2 = project({ x: -150, y: 0, z: z + 30 });
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project({ x: 150, y: 0, z });
        const p4 = project({ x: 150, y: 0, z: z + 30 });
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }
    };

    // Create realistic car geometry
    const createCar = (posX: number, posZ: number, rotY: number) => {
      const posY = 0; // Car on ground
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

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

    const drawCar3D = (posX: number, posZ: number, rotY: number) => {
      const car = createCar(posX, posZ, rotY);

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

        ctx.strokeStyle = `rgba(30, 30, 30, ${mark.alpha})`;
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

    const generateSmoke = (x: number, z: number) => {
      for (let i = 0; i < 4; i++) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 25,
          y: 10 + Math.random() * 20,
          z: z + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 1,
          vz: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 18 + 12,
          alpha: 0.7,
          life: 1,
        });
      }
    };

    const animate = () => {
      // Clear with fade
      ctx.fillStyle = 'rgba(100, 150, 200, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frameCount / maxFrames;

      // Car drifting on road - moving down the road (z) and side to side (x)
      const carZ = -400 + progress * 600; // Moving forward on road
      const carX = Math.sin(progress * Math.PI * 3.5) * 80; // Drifting left and right
      const carRotY = progress * Math.PI * 6 + Math.sin(progress * Math.PI * 4) * 0.9; // Rotation from drifting

      // Tire slip for skid marks
      const tireSlip = Math.abs(Math.sin(progress * Math.PI * 4)) * 0.7;
      if (frameCount % 3 === 0 && tireSlip > 0.2) {
        addSkidMark(carX - 15, carZ, carRotY);
        addSkidMark(carX + 15, carZ, carRotY);
      }

      // Smoke from tires when drifting hard
      if (frameCount % 5 === 0 && tireSlip > 0.3) {
        generateSmoke(carX - 18, carZ);
        generateSmoke(carX + 18, carZ);
      }

      // Draw road first
      drawRoad();

      // Draw skid marks on road
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

      // Draw car on road
      drawCar3D(carX, carZ, carRotY);

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
