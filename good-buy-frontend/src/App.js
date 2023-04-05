import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Home from "./pages/home";
import OfferedProducts from "./pages/offeredProducts";
import Products from "./pages/products";
import GoogleMaps from "./pages/google-maps";
import Authentication from "./pages/authentication";
import Settings from "./pages/settings";
import ShoppingList from "./pages/shoppingList";
import ShoppingCart from "./pages/shoppingCart";

function App() {
    const [theme, colorMode] = useMode();
    const [productExists, setProductExists] = useState(false);
    const [user, updateUser] = useState(null);
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
                    <main className="content">
                        <Topbar/>
                        <AnimatePresence mode='wait'>
                            <Routes location={location} key={location.pathname}>
                                <Route exact path="/" element={<Home productFound={productFound} productNotFound={productNotFound}/>}/>
                                {localStorage.getItem("productStatus") === "found"
                                    ? <Route exact path="/offered-products/:productName" element={<OfferedProducts/>}/>
                                    : <></>
                                }
                                <Route exact path="/products" element={<Products/>}/>
                                <Route exact path="/google-maps" element={<GoogleMaps/>}/>
                                <Route exact path="/shopping-list" element={<ShoppingList/>}/>
                                <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
                                <Route exact path="/authentication" element={<Authentication user={user} updateUser={updateUser}/>}/>
                                <Route exact path="/settings" element={<Settings/>}/>
                            </Routes>
                        </AnimatePresence>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;