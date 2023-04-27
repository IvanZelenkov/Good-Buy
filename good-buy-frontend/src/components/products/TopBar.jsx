import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { filterProducts, handleFilter, handleClick, handleClose } from "../../utils/products/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TopBar = ({ componentReference, state, setState, customColors }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedItem, setSelectedItem] = useState("Best Match");

	const handleMenuItemClick = (event, label) => {
		setSelectedItem(label);
		handleClose();
	};

	return (
		<Box ref={componentReference}>
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
						textTransform: "none",
						width: "200px",
						":hover": {
							backgroundColor: customColors[5],
							color: customColors[1]
						}
					}}
				>
					<Typography
						sx={{
							fontSize: "1.1vh",
							fontFamily: "Montserrat",
							fontWeight: "900",
							letterSpacing: "1px"
						}}
					>
						{selectedItem}
					</Typography>
					<ArrowDropDownIcon/>
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={(event) => handleClose(event, setAnchorEl)}
				>
					<MenuItem onClick={(event) => {
						filterProducts(
							[],
							state,
							setState,
							state.lastSearchTerm
						);
						handleMenuItemClick(event,"Best Match")
					}}>
						Best Match
					</MenuItem>
					<MenuItem onClick={(event) => {
						handleFilter({ key: "reverse", value: "false" }, state.filters, setState)
						handleMenuItemClick(event, "Price Low to High")
					}}>
						Price Low to High
					</MenuItem>
					<MenuItem onClick={(event) => {
						handleFilter({ key: "reverse", value: "true" }, state.filters, setState)
						handleMenuItemClick(event, "Price High to Low")
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