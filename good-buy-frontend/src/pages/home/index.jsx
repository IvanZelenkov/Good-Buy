import { useEffect, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import AppLogo from "../../components/home/AppLogo";
import AppTitle from "../../components/home/AppTitle";
import ErrorPopup from "../../components/home/ErrorPopup";
import SearchBar from "../../components/home/SearchBar";
import SubscribePopup from "../../components/subscribePopup/SubscribePopup";

const Home = ({ user, state, setState, searchError, setSearchError, navigate, topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);

	useEffect(() => {
		if (state.productNotFound)
			setSearchError(true);
		else
			setSearchError(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.productNotFound]);

	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			{!user && localStorage.getItem("showSubscribePopup") === "true" && <SubscribePopup/>}
			<Box sx={{ display: "flex", margin: "1.5vh", justifyContent: "center", height: `calc(100vh - ${topBarHeight}px - 3vh)` }}>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: "2vh",
							backgroundColor: mode === "dark" ? colors.customColors[6] : colors.customColors[3],
							padding: "1.5vh",
							borderRadius: "10px",
							width: "35vw"
						}}
					>
						{/* APP LOGO */}
						<AppLogo/>

						{/* APP TITLE */}
						<AppTitle title={"GOOD BUY"} customColors={colors.customColors}/>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: "10px",
							backgroundColor: mode === "dark" ? colors.customColors[6] : colors.customColors[3],
							borderRadius: "10px",
							width: "35vw",
							position: "relative"
						}}
					>
						{/* SEARCH BAR */}
						<SearchBar
							state={state}
							setState={setState}
							navigate={navigate}
							mode={mode}
							customColors={colors.customColors}
						/>

						{/* ERROR POPUP */}
						{searchError && <ErrorPopup searchHelperText={"Product not found"}/>}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;