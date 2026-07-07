import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function BikeParts() {
  return (
    <group position={[0, 0.2, 0]}>
      {/* 1. Wheels */}
      {/* Front Wheel */}
      <group position={[1.8, -0.5, 0]}>
        <mesh>
          <torusGeometry args={[0.7, 0.12, 16, 100]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.05} />
        </mesh>
        {/* Rim */}
        <mesh>
          <torusGeometry args={[0.58, 0.03, 8, 50]} />
          <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.1} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 18;
          return (
            <mesh key={i} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.005, 0.005, 1.16]} />
              <meshStandardMaterial color="#cccccc" metalness={1.0} roughness={0.1} />
            </mesh>
          );
        })}
        {/* Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
          <meshStandardMaterial color="#b0b0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Rear Wheel */}
      <group position={[-1.8, -0.5, 0]}>
        <mesh>
          <torusGeometry args={[0.7, 0.14, 16, 100]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.05} />
        </mesh>
        {/* Rim */}
        <mesh>
          <torusGeometry args={[0.58, 0.03, 8, 50]} />
          <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.1} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 18;
          return (
            <mesh key={i} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.005, 0.005, 1.16]} />
              <meshStandardMaterial color="#cccccc" metalness={1.0} roughness={0.1} />
            </mesh>
          );
        })}
        {/* Hub & Chain Cover */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
          <meshStandardMaterial color="#a0a0b0" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 2. Engine Block */}
      <group position={[0, -0.15, 0]}>
        {/* Crankcase */}
        <mesh>
          <boxGeometry args={[0.7, 0.6, 0.65]} />
          <meshStandardMaterial color="#a8a8b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Cylinder block with fins */}
        <group position={[0.1, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.5, 16]} />
            <meshStandardMaterial color="#666677" metalness={0.9} roughness={0.3} />
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[0, -0.2 + i * 0.08, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.02, 16]} />
              <meshStandardMaterial color="#555566" metalness={0.9} roughness={0.35} />
            </mesh>
          ))}
        </group>
        {/* Round cover badge (Classic Royal Enfield case) */}
        <mesh position={[0, 0, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#b8b8c8" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* 3. Fuel Tank (Classic teardrop) */}
      <group position={[0.3, 0.65, 0]}>
        <mesh scale={[1.4, 0.85, 0.9]}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial color="#dc2626" metalness={0.65} roughness={0.12} />
        </mesh>
        {/* Gold Accent strips */}
        <mesh position={[0, 0, 0.44]} scale={[0.7, 0.3, 0.08]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#dfa82c" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.44]} scale={[0.7, 0.3, 0.08]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#dfa82c" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 4. Split Seats */}
      <group>
        {/* Rider saddle */}
        <mesh position={[-0.45, 0.65, 0]} scale={[1.1, 0.25, 0.8]} rotation={[0, 0, -Math.PI / 30]}>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>
        {/* Pillion seat */}
        <mesh position={[-1.1, 0.72, 0]} scale={[0.9, 0.22, 0.6]}>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>
      </group>

      {/* 5. Chassis Frame */}
      <group>
        {/* Main backbone tube */}
        <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 5.5]}>
          <cylinderGeometry args={[0.06, 0.06, 1.8]} />
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>
        {/* Swingarm tube */}
        <mesh position={[-0.9, -0.38, 0.08]} rotation={[0, 0, -Math.PI / 20]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6]} />
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>
        <mesh position={[-0.9, -0.38, -0.08]} rotation={[0, 0, -Math.PI / 20]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6]} />
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>
      </group>

      {/* 6. Front Fork, Handlebars, and Headlamp */}
      <group position={[1.3, 0.45, 0]} rotation={[0, 0, -Math.PI / 9]}>
        {/* Dual chrome forks */}
        <mesh position={[0, 0, 0.16]}>
          <cylinderGeometry args={[0.04, 0.04, 2.0]} />
          <meshStandardMaterial color="#d4d4e0" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.16]}>
          <cylinderGeometry args={[0.04, 0.04, 2.0]} />
          <meshStandardMaterial color="#d4d4e0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Red Fork sleeve guards */}
        <mesh position={[0.1, 0.5, 0]} scale={[0.8, 1.0, 1.6]}>
          <boxGeometry args={[0.14, 0.5, 0.22]} />
          <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.15} />
        </mesh>
        {/* Handlebars */}
        <group position={[0, 0.95, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.3]} />
            <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.08} />
          </mesh>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.2]} />
            <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.2]} />
            <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
          </mesh>
        </group>
        {/* Headlight pod (Classic round) */}
        <group position={[0.2, 0.68, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.22, 16]} />
            <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.08} />
          </mesh>
          {/* Glass spotlight lens */}
          <mesh position={[0, 0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.165, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshBasicMaterial color="#fffbe6" />
          </mesh>
        </group>
      </group>

      {/* 7. Chrome Silencer Exhaust */}
      <group position={[0.1, -0.32, 0.32]}>
        <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 3.2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.7]} />
          <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.05} />
        </mesh>
        <mesh position={[-0.8, -0.06, 0]} rotation={[0, 0, Math.PI / 25]}>
          <cylinderGeometry args={[0.075, 0.048, 2.2]} />
          <meshStandardMaterial color="#d4d4e0" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* 8. Fenders */}
      {/* Front Fender */}
      <mesh position={[1.65, -0.05, 0]} rotation={[0, 0, -Math.PI / 4.2]} scale={[1, 1, 1.05]}>
        <cylinderGeometry args={[0.76, 0.76, 0.26, 30, 1, true, 0, Math.PI / 2.6]} />
        <meshStandardMaterial color="#dc2626" metalness={0.65} roughness={0.15} side={2} />
      </mesh>
      {/* Rear Fender */}
      <mesh position={[-1.55, -0.05, 0]} rotation={[0, 0, Math.PI / 1.6]} scale={[1, 1, 1.05]}>
        <cylinderGeometry args={[0.76, 0.76, 0.3]} />
        <meshStandardMaterial color="#dc2626" metalness={0.65} roughness={0.15} side={2} />
      </mesh>

      {/* 9. Side Boxes */}
      <mesh position={[-0.6, 0.3, 0.28]} scale={[0.9, 0.75, 0.35]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.18} />
      </mesh>
      <mesh position={[-0.6, 0.3, -0.28]} scale={[0.9, 0.75, 0.35]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.18} />
      </mesh>
    </group>
  );
}

function RotatingBike() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Automatic smooth rotation
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.32;
      // Gentle floating sway
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12;
    }
  });

  return (
    <group ref={ref}>
      <BikeParts />
    </group>
  );
}

export function Bike3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [4, 1.5, 4.5], fov: 40 }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={1.8} />
        
        {/* Cool rim lighting / key lights */}
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1.2} color="#dfa82c" />
        
        {/* Soft under-glow spotlight */}
        <pointLight position={[0, -1, 0]} intensity={2.0} color="#dc2626" distance={5} />
        
        <RotatingBike />
        
        {/* Floor shadow receiver */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#08080c" opacity={0.4} transparent roughness={1.0} />
        </mesh>
        
        <OrbitControls
          enableZoom={true}
          maxDistance={7}
          minDistance={3.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
