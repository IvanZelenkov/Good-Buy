import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Authentication from "./pages/authentication";
import Deals from "./pages/deals";
import GoogleMaps from "./pages/google-maps";
import Home from "./pages/home";
import Products from "./pages/products";
import ShoppingCart from "./pages/shoppingCart";
import ShoppingList from "./pages/shoppingList";
import TopBar from "./pages/global/TopBar";

function App() {
    const [theme, colorMode] = useMode();
    const [user, updateUser] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [searchError, setSearchError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const topBarHeight = 65;
    const [state, setState] = useState({
        infoLoaded: false,
        lastSearchTerm: "",
        productNotFound: false,
        shoppingCartData: [],
        productsData: [],
        filters: [],
        priceFrom: "",
        priceTo: "",
        reverse: false,
        page: 1
    });

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
            setShowPopup(true);
        } catch (error) {
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

    useEffect(() => {
        if (location.pathname !== "/products") {
            setState({
                infoLoaded: false,
                lastSearchTerm: "",
                productNotFound: false,
                productsData: [],
                filters: [],
                priceFrom: "",
                priceTo: "",
                reverse: false,
                page: 1
            });
        }
    }, [location]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <main className="content">
                        <TopBar/>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route exact path="/" element={
                                    <Home
                                        user={user}
                                        showPopup={showPopup}
                                        handlePopupClose={handlePopupClose}
                                        state={state}
                                        setState={setState}
                                        searchError={searchError}
                                        setSearchError={setSearchError}
                                        navigate={navigate}
                                        topBarHeight={topBarHeight}
                                    />}
                                />
                                <Route exact path="/products" element={
                                    <Products
                                        state={state}
                                        setState={setState}
                                        searchError={searchError}
                                        setSearchError={setSearchError}
                                        navigate={navigate}
                                        topBarHeight={topBarHeight}
                                    />}
                                />
                                <Route exact path="/deals" element={<Deals/>}/>
                                <Route exact path="/google-maps" element={<GoogleMaps topBarHeight={topBarHeight}/>}/>
                                <Route exact path="/shopping-list" element={<ShoppingList topBarHeight={topBarHeight}/>}/>
                                <Route exact path="/shopping-cart" element={
                                    <ShoppingCart
                                        user={user}
                                        state={state}
                                        setState={setState}
                                        topBarHeight={topBarHeight}
                                    />
                                }/>
                                <Route exact path="/authentication" element={
                                    <Authentication
                                        user={user}
                                        updateUser={updateUser}
                                    />
                                }/>
                            </Routes>
                        </AnimatePresence>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;