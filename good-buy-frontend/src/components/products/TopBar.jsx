import {Box, Button, Divider, Menu, MenuItem, Typography} from "@mui/material";
import { useState } from "react";
import { sortProducts, handleClick, handleClose } from "../../utils/products/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TopBar = ({ productsData, setProductsData, setInfoLoaded, colors }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<Box sx={{ width: "100%" }}>
			<Divider
				sx={{
					margin: "1vh 0",
					borderColor: colors.customColors[6]
				}}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%"
				}}
			>
				<Typography
					sx={{
						fontSize: "1.5vh",
						fontFamily: "Montserrat",
						textAlign: "center",
					}}
				>
					{productsData.length} products
				</Typography>
				<Button
					onClick={(event) => handleClick(event, setAnchorEl)}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						backgroundColor: colors.customColors[6],
						color: colors.customColors[1],
						fontFamily: "Montserrat",
						fontWeight: "900",
						letterSpacing: "1px",
						width: "200px",
						":hover": {
							backgroundColor: colors.customColors[5],
							color: colors.customColors[1]
						}
					}}
				>
					<Typography>
						Best Match
					</Typography>
					<ArrowDropDownIcon/>
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={(event) => handleClose(event, setAnchorEl)}
				>
					<MenuItem onClick={() => sortProducts([{ key: "reverse", value: "false" }], setProductsData, setInfoLoaded)}>
						Price Low to High
					</MenuItem>
					<MenuItem onClick={() => sortProducts([{ key: "reverse", value: "true" }], setProductsData, setInfoLoaded)}>
						Price High to Low
					</MenuItem>
				</Menu>
			</Box>

			<Divider
				sx={{
					margin: "1vh 0",
					borderColor: colors.customColors[6]
				}}
			/>
		</Box>
	);
}

export default TopBar;