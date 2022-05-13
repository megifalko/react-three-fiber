import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Canvas} from "@react-three/fiber";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<div id="canvas">
			<Canvas orthographic camera={{zoom: 200}}>
				<color attach="background" args={["#000"]} />
				<App />
			</Canvas>
		</div>
	</React.StrictMode>
);
