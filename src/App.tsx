import { HashRouter, Routes, Route } from "react-router-dom";
import MainInterface from "./routes/MainInterface";
import Configure from "./routes/Configure";
import Languages from "./routes/Languages";

function App() {
	return (
		<HashRouter>
			<Routes>
				{/* <Route path="/login" element={<LoginPage />} /> */}
				<Route path="/" element={<MainInterface />} />
				<Route path="/configure" element={<Configure />} />
				{/* <Route path="/languages" element={<Languages />} /> */}
				{/* Other routes can go here */}
			</Routes>
		</HashRouter>
	);
}

export default App;
