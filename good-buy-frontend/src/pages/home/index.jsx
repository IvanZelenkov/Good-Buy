import { useCallback, useMemo, useState } from 'react';
import { Box, InputBase, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import SubscribePopup from "../../components/others/SubscribePopup";
import { tokens } from "../../theme";

const Home = ({ user, showPopup, handlePopupClose, productFound }) => {
	const topBarHeight = 65;
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const [inputProductName, setInputProductName] = useState("");
	const [isValid, setIsValid] = useState(false);

	const searchProductByName = useCallback((event) => {
		const regex = /[L|l]aptop/;
		if (regex.test(event.target.value)) {
			setIsValid(true);
			setInputProductName(event.target.value);
		} else {
			setIsValid(false);
		}
	}, []);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			productFound("found", inputProductName)
		}
	}

	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			{!user && showPopup && <SubscribePopup onClose={handlePopupClose}/>}
			<Box sx={{ display: "flex", margin: "1.5vh", justifyContent: "center", height: `calc(100vh - ${topBarHeight}px - 3vh)` }}>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
						<Box
							component="img"
							src={require('../../images/appLogo.png')}
							sx={{
								display: { xs: "none", md: "flex" },
								mr: 1,
								color: "black",
								width: "8vw"
							}}
							alt=""
						/>
						<Typography
							noWrap
							component="a"
							sx={{
								mr: 2,
								fontWeight: 700,
								letterSpacing: "0.3rem",
								color: colors.customColors[1],
								textDecoration: "none",
								fontSize: "2vw",
								fontFamily: "Montserrat"
							}}
						>
							GOOD BUY
						</Typography>
					</Box>

					<Box sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						padding: "10px",
						backgroundColor: mode === "dark" ? colors.customColors[6] : colors.customColors[3],
						borderRadius: "10px",
						width: "35vw"
					}}>
						<SearchIcon sx={{fontSize: "2.5vh", color: colors.customColors[1]}}/>
						<InputBase
							sx={{
								marginLeft: 2,
								flex: 1,
								fontFamily: "Montserrat",
								fontSize: "1.3vh",
								color: mode === "dark" ? colors.customColors[1] : colors.customColors[1],
								"&::placeholder": {
									color: mode === "dark" ? colors.customColors[1] : colors.customColors[1],
									opacity: "0.6"
								}
							}}
							placeholder="Search for products"
							onChange={(productName) => searchProductByName(productName)}
							error={!isValid}
							required={true}
							onKeyDown={handleKeyDown}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;