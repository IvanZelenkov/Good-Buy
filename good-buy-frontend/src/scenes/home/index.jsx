import { useState, useEffect } from 'react';
import { Box, InputBase, IconButton, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Home = ({ productFound }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [inputProductName, setInputProductName] = useState("");
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();

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
		if (event.key === 'Enter') {
			productFound("found", inputProductName)
		}
	}

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box sx={{ display: "flex", margin: "1.5vh", justifyContent: "center", height: "70vh" }}>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
						{/* APP LOGO */}
						<img
							src={require(`../../images/appLogo.png`)}
							alt="Good Buy logo"
							loading="lazy"
							style={{
								width: "150px",
								borderRadius: "10px",
								marginBottom: "2vh"
							}}
						/>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
						{/* SEARCH BAR */}
						<Box
							display="flex"
							backgroundColor="custom.customColorB"
							borderRadius="3px"
							width="50vh"
							marginBottom="4vh"
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