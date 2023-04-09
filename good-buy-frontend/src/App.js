import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import OfferedProducts from "./pages/offeredProducts";
import Home from "./pages/home";
import Products from "./pages/products";
import Deals from "./pages/deals";
import GoogleMaps from "./pages/google-maps";
import ShoppingList from "./pages/shoppingList";
import ShoppingCart from "./pages/shoppingCart";
import Authentication from "./pages/authentication";
import Settings from "./pages/settings";
import { Auth } from "aws-amplify";

function App() {
    const [theme, colorMode] = useMode();
    const [productExists, setProductExists] = useState(false);
    const [user, updateUser] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
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

    const handlePopupClose = () => {
        setShowPopup(false);
        localStorage.setItem("popupClosed", "true");
        setTimeout(() => {
            localStorage.removeItem("popupClosed");
        }, 1800000); // 30 minutes

        window.addEventListener("beforeunload", () => {
            localStorage.removeItem("popupClosed");
        });
    };

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser();
            updateUser(authUser);
            console.log("User authenticated.", authUser);
            setShowPopup(true);
        } catch (error) {
            console.log("User not authenticated.", error);
            if (!localStorage.getItem("popupClosed")) {
                setShowPopup(true);
            } else {
                setShowPopup(false);
            }
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    console.log(showPopup)

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <main className="content">
                        <Topbar/>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route exact path="/" element={
                                    <Home
                                        user={user}
                                        showPopup={showPopup}
                                        handlePopupClose={handlePopupClose}
                                        productFound={productFound}
                                        productNotFound={productNotFound}
                                    />}
                                />
                                {localStorage.getItem("productStatus") === "found"
                                    ? <Route exact path="/offered-products/:productName" element={<OfferedProducts/>}/>
                                    : <></>
                                }
                                <Route exact path="/products" element={<Products/>}/>
                                <Route exact path="/deals" element={<Deals/>}/>
                                <Route exact path="/google-maps" element={<GoogleMaps/>}/>
                                <Route exact path="/shopping-list" element={<ShoppingList/>}/>
                                <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
                                <Route exact path="/settings" element={<Settings/>}/>
                                <Route exact path="/authentication" element={<Authentication user={user} updateUser={updateUser}/>}/>
                            </Routes>
                        </AnimatePresence>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;