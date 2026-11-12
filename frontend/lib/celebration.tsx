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

    // 3D projection with camera angle
    const project = (point: Point3D): { x: number; y: number; scale: number } => {
      const focalLength = 700;
      const depth = point.z + focalLength;
      const scale = Math.max(0.1, focalLength / depth);

      const x = canvas.width / 2 + point.x * scale;
      const y = canvas.height * 0.65 - point.y * scale * 0.8 - point.z * scale * 0.2;

      return { x, y, scale };
    };

    // Draw road
    const drawRoad = () => {
      ctx.fillStyle = '#1a1a1a';
      for (let z = -700; z < 300; z += 40) {
        const p1 = project({ x: -200, y: 0, z });
        const p2 = project({ x: 200, y: 0, z });
        const p3 = project({ x: 200, y: 0, z: z + 40 });
        const p4 = project({ x: -200, y: 0, z: z + 40 });

        ctx.fillStyle = (Math.floor(z / 40) % 2 === 0) ? '#222222' : '#1a1a1a';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fill();
      }

      // Road markings
      ctx.strokeStyle = '#ffff88';
      ctx.lineWidth = 2;
      ctx.setLineDash([30, 15]);
      ctx.beginPath();
      const p1 = project({ x: 0, y: 0, z: -700 });
      const p2 = project({ x: 0, y: 0, z: 300 });
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Road edges
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      for (let z = -700; z < 300; z += 25) {
        const p1 = project({ x: -200, y: 0, z });
        const p2 = project({ x: -200, y: 0, z: z + 25 });
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project({ x: 200, y: 0, z });
        const p4 = project({ x: 200, y: 0, z: z + 25 });
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }
    };

    // Realistic 3D car model
    const createRealisticCar = (posX: number, posZ: number, rotY: number) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const transform = (x: number, y: number, z: number): Point3D => ({
        x: (x * cosY - z * sinY) + posX,
        y: y,
        z: (x * sinY + z * cosY) + posZ,
      });

      const faces: Array<{ points: Point3D[]; color: string; opacity: number }> = [];

      // MAIN CHASSIS BODY
      // Front section (hood)
      faces.push({
        points: [
          transform(-18, 8, -45),
          transform(18, 8, -45),
          transform(18, 5, -30),
          transform(-18, 5, -30),
        ],
        color: '#c41e3a',
        opacity: 1,
      });

      // Main body - bottom
      faces.push({
        points: [
          transform(-22, 8, -30),
          transform(22, 8, -30),
          transform(22, 8, 30),
          transform(-22, 8, 30),
        ],
        color: '#a01628',
        opacity: 1,
      });

      // Main body - top
      faces.push({
        points: [
          transform(-20, -5, -25),
          transform(20, -5, -25),
          transform(20, -5, 25),
          transform(-20, -5, 25),
        ],
        color: '#d62e3a',
        opacity: 1,
      });

      // Left side
      faces.push({
        points: [
          transform(-22, 8, -30),
          transform(-22, 8, 30),
          transform(-20, -5, 25),
          transform(-20, -5, -25),
        ],
        color: '#b01d28',
        opacity: 1,
      });

      // Right side
      faces.push({
        points: [
          transform(22, 8, -30),
          transform(22, 8, 30),
          transform(20, -5, 25),
          transform(20, -5, -25),
        ],
        color: '#b01d28',
        opacity: 1,
      });

      // Rear
      faces.push({
        points: [
          transform(-20, 8, 30),
          transform(20, 8, 30),
          transform(20, -5, 25),
          transform(-20, -5, 25),
        ],
        color: '#8b0000',
        opacity: 1,
      });

      // WINDSHIELD
      faces.push({
        points: [
          transform(-16, -2, -25),
          transform(16, -2, -25),
          transform(16, -12, -15),
          transform(-16, -12, -15),
        ],
        color: '#6ba3d4',
        opacity: 0.6,
      });

      // SIDE WINDOWS
      faces.push({
        points: [
          transform(-20, -5, -10),
          transform(-20, -5, 10),
          transform(-20, -12, 8),
          transform(-20, -12, -8),
        ],
        color: '#5a8fbf',
        opacity: 0.5,
      });

      faces.push({
        points: [
          transform(20, -5, -10),
          transform(20, -5, 10),
          transform(20, -12, 8),
          transform(20, -12, -8),
        ],
        color: '#5a8fbf',
        opacity: 0.5,
      });

      // ROOF
      faces.push({
        points: [
          transform(-18, -5, -15),
          transform(18, -5, -15),
          transform(18, -15, 5),
          transform(-18, -15, 5),
        ],
        color: '#c41e3a',
        opacity: 1,
      });

      // SPOILER
      faces.push({
        points: [
          transform(-16, -8, 35),
          transform(16, -8, 35),
          transform(16, -18, 40),
          transform(-16, -18, 40),
        ],
        color: '#8b0000',
        opacity: 1,
      });

      // FRONT BUMPER
      faces.push({
        points: [
          transform(-20, 5, -48),
          transform(20, 5, -48),
          transform(20, 3, -45),
          transform(-20, 3, -45),
        ],
        color: '#000000',
        opacity: 1,
      });

      // HEADLIGHTS
      const headlights = [
        { pos: transform(8, 4, -48), radius: 2.5, color: '#ffff99' },
        { pos: transform(-8, 4, -48), radius: 2.5, color: '#ffff99' },
      ];

      // TAILLIGHTS
      const taillights = [
        { pos: transform(8, 4, 32), radius: 2, color: '#ff3333' },
        { pos: transform(-8, 4, 32), radius: 2, color: '#ff3333' },
      ];

      // WHEELS - 3D cylinders
      const wheels = [
        { pos: transform(-20, 8, -20), radius: 7, color: '#1a1a1a' },
        { pos: transform(20, 8, -20), radius: 7, color: '#1a1a1a' },
        { pos: transform(-20, 8, 20), radius: 7, color: '#1a1a1a' },
        { pos: transform(20, 8, 20), radius: 7, color: '#1a1a1a' },
      ];

      return { faces, headlights, taillights, wheels };
    };

    const drawCar = (posX: number, posZ: number, rotY: number) => {
      const car = createRealisticCar(posX, posZ, rotY);

      // Sort and draw faces
      const sortedFaces = car.faces
        .map((face) => {
          const avgZ = face.points.reduce((sum, p) => sum + p.z, 0) / face.points.length;
          return { face, avgZ };
        })
        .sort((a, b) => b.avgZ - a.avgZ);

      sortedFaces.forEach(({ face }) => {
        const projected = face.points.map(project);
        ctx.fillStyle = face.color;
        ctx.globalAlpha = face.opacity;
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          ctx.lineTo(projected[i].x, projected[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Draw headlights
      car.headlights.forEach((light) => {
        const proj = project(light.pos);
        ctx.fillStyle = light.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, light.radius * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw taillights
      car.taillights.forEach((light) => {
        const proj = project(light.pos);
        ctx.fillStyle = light.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, light.radius * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw wheels
      car.wheels.forEach((wheel) => {
        const proj = project(wheel.pos);
        const scale = proj.scale;
        ctx.fillStyle = wheel.color;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, wheel.radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Rim
        ctx.fillStyle = '#555';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, wheel.radius * scale * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    const drawSkidMarks = () => {
      for (let i = skidMarks.length - 1; i >= 0; i--) {
        const mark = skidMarks[i];
        mark.life -= 0.012;
        mark.alpha = mark.life * 0.7;

        const proj = project({ x: mark.x, y: 0, z: mark.z });
        const scale = proj.scale;

        ctx.strokeStyle = `rgba(50, 50, 50, ${mark.alpha})`;
        ctx.lineWidth = mark.width * scale;
        ctx.lineCap = 'round';
        ctx.beginPath();

        const perpX = -Math.sin(mark.angle) * 2.5;
        const perpZ = Math.cos(mark.angle) * 2.5;
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
      for (let i = 0; i < 5; i++) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 30,
          y: 8 + Math.random() * 25,
          z: z + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2.5 + 1.5,
          vz: (Math.random() - 0.5) * 3 - 0.5,
          size: Math.random() * 20 + 15,
          alpha: 0.6,
          life: 1,
        });
      }
    };

    const addSkidMark = (x: number, z: number, angle: number) => {
      skidMarks.push({
        x,
        z,
        angle,
        width: 9,
        alpha: 1,
        life: 1,
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(100, 140, 200, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frameCount / maxFrames;

      // Car motion - realistic drifting
      const carZ = -500 + progress * 650;
      const carX = Math.sin(progress * Math.PI * 2.5) * 100 - Math.cos(progress * Math.PI * 1.2) * 40;
      const carRotY = Math.sin(progress * Math.PI * 2) * 0.6 + progress * Math.PI * 2; // Drift angle + forward spin

      const driftIntensity = Math.abs(Math.sin(progress * Math.PI * 3.5)) * 0.8;

      // Skid marks
      if (frameCount % 2 === 0 && driftIntensity > 0.3) {
        addSkidMark(carX - 18, carZ, carRotY);
        addSkidMark(carX + 18, carZ, carRotY);
      }

      // Smoke
      if (frameCount % 4 === 0 && driftIntensity > 0.4) {
        generateSmoke(carX - 20, carZ);
        generateSmoke(carX + 20, carZ);
      }

      // Draw road
      drawRoad();
      drawSkidMarks();

      // Update smoke
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        s.size += 0.8;
        s.life -= 0.009;
        s.alpha = s.life * 0.75;

        const proj = project({ x: s.x, y: s.y, z: s.z });
        const smokeScale = Math.max(0.15, proj.scale);

        ctx.fillStyle = `rgba(110, 110, 120, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, s.size * smokeScale, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0) {
          smoke.splice(i, 1);
        }
      }

      // Draw car
      drawCar(carX, carZ, carRotY);

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
