import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import Map from './components/Map';
import Avatar from './components/Avatar';


function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map />
      <Avatar />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Box>
        <Box position={[1.2, 0, 0]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
