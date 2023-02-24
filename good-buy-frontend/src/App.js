import { useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './scenes/global/Sidebar';
import Topbar from "./scenes/global/Topbar";
import Home from "../src/scenes/home";
import OfferedProducts from "../src/scenes/offeredProducts";

function App() {
	const [theme, colorMode] = useMode();
	const [productExists, setProductExists] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const productFound = (productStatus, productName = "") => {
		if (productStatus === "found" || productName !== "") {
			localStorage.setItem("productStatus", productStatus);
			setProductExists(true);
			navigate(`/offered-products/${productName}`);
		}
	}

	const productNotFound = (productStatus) => {
		if (productStatus === "notFound") {
			localStorage.clear();
			setProductExists(true);
			navigate(`/home`);
		}
	}

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<div className="app">
					<Sidebar/>
					<main className="content">
						<Topbar/>
						<AnimatePresence mode='wait'>
							<Routes location={location} key={location.pathname}>
								<Route exact path="/" element={<Home productFound={productFound} productNotFound={productNotFound}/>}/>
								{localStorage.getItem("productStatus") === "found"
									? <Route exact path="/offered-products/:productName" element={<OfferedProducts/>}/>
									: <></>
								}
							</Routes>
						</AnimatePresence>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
