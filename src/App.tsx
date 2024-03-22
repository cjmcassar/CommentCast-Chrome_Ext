import { HashRouter, Routes, Route } from "react-router-dom";
import MainInterface from "./routes/MainInterface";

function App() {
	return (
		<HashRouter>
			<Routes>
				{/* <Route path="/login" element={<LoginPage />} /> */}
				<Route path="/" element={<MainInterface />} />
				{/* Other routes can go here */}
			</Routes>
		</HashRouter>
	);
}

export default App;
