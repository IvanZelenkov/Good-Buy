import { useCallback, useMemo, useState } from 'react';
import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material";
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
							backgroundColor: "custom.customColorF",
							padding: "1.5vh",
							borderRadius: "10px",
							width: "40vw"
						}}
					>
						<Box
							component="img"
							src={require('../../images/appLogo.png')}
							sx={{
								display: {
									xs: "none",
									md: "flex",
								},
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
								display: { xs: "none", md: "flex" },
								fontWeight: 700,
								letterSpacing: "0.3rem",
								color: "black",
								textDecoration: "none",
								fontSize: "2vw",
								fontFamily: "Montserrat"
							}}
						>
							GOOD BUY
						</Typography>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
						{/* SEARCH BAR */}
						<Box
							display="flex"
							backgroundColor="custom.customColorA"
							borderRadius="10px"
							width="40vw"
						>
							<InputBase
								sx={{ marginLeft: 2, flex: 1 }}
								placeholder="Search"
								onChange={(productName) => searchProductByName(productName)}
								error={!isValid}
								required={true}
								onKeyDown={handleKeyDown}
								inputProps={{ style: { fontFamily: "Montserrat" }}}
								inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
							/>
							<IconButton
								type="button"
								disabled={!isValid}
								onClick={() => productFound("found", inputProductName)}
								sx={{ padding: 1, color: colors.customColors[5] }}
							>
								<SearchIcon />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;