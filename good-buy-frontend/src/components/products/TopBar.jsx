import {Box, Button, Divider, Menu, MenuItem, Typography} from "@mui/material";
import { useState } from "react";
import { filterProducts, handleClick, handleClose } from "../../utils/products/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TopBar = ({ state, setState, customColors }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<Box>
			<Divider
				sx={{
					margin: "1vh 0",
					borderColor: customColors[6]
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
					{state.productsData.length} products
				</Typography>
				<Button
					onClick={(event) => handleClick(event, setAnchorEl)}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						backgroundColor: customColors[6],
						color: customColors[1],
						fontFamily: "Montserrat",
						fontWeight: "900",
						letterSpacing: "1px",
						width: "200px",
						":hover": {
							backgroundColor: customColors[5],
							color: customColors[1]
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
					<MenuItem onClick={() => {
						filterProducts(
							[{ key: "reverse", value: "false" }],
							state,
							setState,
							state.lastSearchTerm
						)
					}}>
						Price Low to High
					</MenuItem>
					<MenuItem onClick={() => {
						filterProducts(
							[{ key: "reverse", value: "true" }],
							state,
							setState,
							state.lastSearchTerm
						)
					}}>
						Price High to Low
					</MenuItem>
				</Menu>
			</Box>

			<Divider
				sx={{
					margin: "1vh 0",
					borderColor: customColors[6]
				}}
			/>
		</Box>
	);
}

export default TopBar;