import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import Map from './components/Map';
import Avatar from './components/Avatar';
import HealthEvents from './components/HealthEvents';
import KataChat from './components/KataChat';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map />
      <Avatar />
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <HealthEvents />
        <TorusKnot args={[1, 0.4, 256, 32]}>
          <meshStandardMaterial color="hotpink" />
        </TorusKnot>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      <KataChat />
    </div>
  );
}

export default App;
