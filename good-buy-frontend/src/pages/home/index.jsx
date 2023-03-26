import { useState } from 'react';
import { Box, InputBase, IconButton, useTheme, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import { Adb as AdbIcon } from "@mui/icons-material";

const Home = ({ productFound }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [inputProductName, setInputProductName] = useState("");
	const [isValid, setIsValid] = useState(false);

	const searchProductByName = (input) => {
		const regex = new RegExp("[L|l]aptop");
		if (regex.test(input.target.value)) {
			setIsValid(true);
			setInputProductName(input.target.value);
		} else {
			setIsValid(false);
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			productFound("found", inputProductName)
		}
	}

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box sx={{ display: "flex", margin: "1.5vh", justifyContent: "center", height: "70vh" }}>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "2vh" }}>
						<AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: "black", fontSize: "6vh" }, mr: 1 }}/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "black",
								textDecoration: "none",
								fontSize: "4vh"
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
							borderRadius="5px"
							width="40vw"
						>
							<InputBase
								sx={{ marginLeft: 2, flex: 1 }}
								placeholder="Search"
								onChange={(productName) => searchProductByName(productName)}
								error={!isValid}
								required={true}
								onKeyDown={handleKeyDown}
							/>
							<IconButton
								type="button"
								sx={{ padding: 1, color: "custom.steamColorD" }}
								disabled={!isValid}
								onClick={() => productFound("found", inputProductName)}
							>
								<SearchIcon/>
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Home;