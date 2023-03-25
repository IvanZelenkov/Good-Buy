import "./App.css";
import React from "react";
import { useState } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
//import { AnimatePresence } from "framer-motion";
//import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {Routes, BrowserRouter as Router, Route, useLocation, useNavigate} from "react-router-dom";
import Home from "./scenes/home";
import UserPage from "./scenes/UserPage";

function App() {
    const [theme, colorMode] = useMode();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />}/>

                    <Route path="/user-page" element={<UserPage title="GoodBuy"
                                                                profilePic="/img/profile-pic@2x.png"
                                                                place="Name"
                                                                label1="Account Info"
                                                                label2="Settings"
                                                                sectionTitle="Section Title"/>}/>
                    <Route path="/search" />
                    <Route path="/cart" />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
