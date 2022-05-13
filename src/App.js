import "./App.css";
import {useRef, useState} from "react";

import {useFrame} from "@react-three/fiber";
import {Quaternion, Vector3, Octahedron} from "three";

import * as random from "maath/random";
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";

import {Points, OrbitControls} from "@react-three/drei";

function App() {
	const rotationAxis = new Vector3(0, 1, 0).normalize();
	const q = new Quaternion();
	const pointsRef = useRef();

	const [{box, sphere, final}] = useState(() => {
    const arr = new Float32Array(10_000);
		const box = random.inSphere(arr, {radius: 1.25});//random.inBox(arr, {sides: [1, 1, 1]});//
		const sphere = random.inSphere(arr.slice(0), {radius: 0.75});
		const final = box.slice(0)
		return {box, sphere, final};
	});

	useFrame(({clock}) => {
		const et = clock.getElapsedTime();
		const t = misc.remap(Math.sin(et), [-1, 1], [0, 1]);
		const t2 = misc.remap(Math.cos(et * 3), [-1, 1], [0, 1]);

		buffer.rotate(box, {
			q: q.setFromAxisAngle(rotationAxis, t2 * 0.1),
		});

		buffer.lerp(box, sphere, final, t);
	});

	return (
		<>
			<Points positions={final} stride={3} ref={pointsRef}>
				<pointsMaterial size={1} />
			</Points>
			<OrbitControls />
		</>
	);
}

// import "./App.css";
// import React, { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import {
// 	OrbitControls,
// 	PerspectiveCamera,
// 	PositionalAudio,
// 	SpotLight,
// 	Sparkles,
//   Sphere,
// 	Tetrahedron,
// 	Box,
// } from "@react-three/drei";

// const Scene = ({ x, y, z }) => {
//   const ref = useRef();
//   const vec = new THREE.Vector3(x, y, z);
//   useFrame(() => ref.current.position.lerp(vec, 0.1));
//   return (
//     <Sphere ref={ref} radius={0.00001}>
//       <meshLambertMaterial attach="material" color="white" />
//     </Sphere>
//   );
// };

// function App() {
//   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
//   const { x, y, z } = position;
// 	return (
// 		<div className="canvas">
//       <button onClick={()=>{setPosition({x: x+0.1, y: y+0.1, z: z+0.1})}}>Move</button>
// 			<Canvas>

// 				<ambientLight intensity={0.1} />
//         <Scene x={x} y={y} z={z} />
// 				<Sparkles
// 					count={1000}
// 					color="white"
// 					noise={0.5}
// 					speed={0.3}
// 					random={true}
// 					size={0.4}
// 					scale={3}
// 				/>
// 				<Sparkles
// 					count={500}
// 					color="white"
// 					noise={0.3}
// 					speed={0.3}
// 					random={true}
// 					size={0.3}
// 					scale={1}
// 				/>
// 				<axesHelper />
// 				<PerspectiveCamera position={[0, 0, 2]} makeDefault></PerspectiveCamera>
// 				<OrbitControls />
// 			</Canvas>
// 		</div>
// 	);
// }

export default App;
