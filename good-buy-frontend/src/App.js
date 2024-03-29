import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Authentication from "./pages/authentication";
import Deals from "./pages/deals";
import GoogleMaps from "./pages/google-maps";
import Home from "./pages/home";
import Products from "./pages/products";
import ShoppingCart from "./pages/shopping-cart";
import ShoppingList from "./pages/shopping-list";
import TopBar from "./pages/global/TopBar";
import { Auth } from "aws-amplify";
import { fetchShoppingCartData } from "./utils/shopping-cart/utils";

function App() {
    const [theme, colorMode] = useMode();
    const [user, updateUser] = useState(null);
    const [searchError, setSearchError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const topBarHeight = 71;
    const [state, setState] = useState({
        infoLoaded: false,
        lastSearchTerm: "",
        productNotFound: false,
        shoppingCartData: [],
        shoppingListData: [],
        productsData: [],
        googleMapsStoreData: null,
        filters: [],
        priceFrom: "",
        priceTo: "",
        reverse: false,
        page: 1
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const authUser = await Auth.currentAuthenticatedUser();
                updateUser(authUser);
            } catch (error) {
                if (!localStorage.getItem("showSubscribePopup"))
                    localStorage.setItem("showSubscribePopup", JSON.stringify(true));
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (location.pathname !== "/products") {
            setState({
                infoLoaded: false,
                lastSearchTerm: "",
                productNotFound: false,
                shoppingCartData:
                    (!user || !user.attributes || !user.attributes.email)
                        ? JSON.parse(localStorage.getItem("shoppingCartData")) || []
                        : fetchShoppingCartData(user, state, setState) || [],
                shoppingListData: JSON.parse(localStorage.getItem("shoppingListData")) || [],
                productsData: [],
                googleMapsStoreData: null,
                filters: [],
                priceFrom: "",
                priceTo: "",
                reverse: false,
                page: 1
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, user]);

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
                                        user={user}
                                        state={state}
                                        setState={setState}
                                        searchError={searchError}
                                        setSearchError={setSearchError}
                                        navigate={navigate}
                                        topBarHeight={topBarHeight}
                                    />}
                                />
                                <Route exact path="/deals" element={<Deals/>}/>
                                <Route exact path="/google-maps" element={
                                    <GoogleMaps
                                        state={state}
                                        setState={setState}
                                        topBarHeight={topBarHeight}
                                    />}/>
                                <Route exact path="/shopping-list" element={
                                    <ShoppingList
                                        state={state}
                                        setState={setState}
                                        topBarHeight={topBarHeight}
                                    />
                                }/>
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