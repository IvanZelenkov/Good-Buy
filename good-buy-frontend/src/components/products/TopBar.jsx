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
						fontSize: "20px",
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
							fontSize: "14px",
							fontFamily: "Montserrat",
							fontWeight: "600",
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
					<MenuItem
						sx={{ fontFamily: "Montserrat", fontWeight: "600" }}
						onClick={(event) => {
							setState((prevState) => ({ ...prevState, lastSearchTerm: "" }));
							filterProducts(
								[],
								state,
								setState,
							);
							handleMenuItemClick(event,"All products")
							handleClose(event, setAnchorEl)
						}}
					>
						All products
					</MenuItem>
					<MenuItem
						sx={{ fontFamily: "Montserrat", fontWeight: "600" }}
						onClick={(event) => {
							filterProducts(
								[],
								state,
								setState,
								state.lastSearchTerm
							);
							handleMenuItemClick(event,"Best Match")
							handleClose(event, setAnchorEl)
						}}
					>
						Best Match
					</MenuItem>
					<MenuItem
						sx={{ fontFamily: "Montserrat", fontWeight: "600" }}
						onClick={(event) => {
							handleMenuItemClick(event, "Price Low to High")
							handleFilter({ key: "reverse", value: "false" }, state.filters, setState)
							handleClose(event, setAnchorEl)
						}}
					>
						Price Low to High
					</MenuItem>
					<MenuItem
						sx={{ fontFamily: "Montserrat", fontWeight: "600" }}
						onClick={(event) => {
							handleMenuItemClick(event, "Price High to Low")
							handleFilter({ key: "reverse", value: "true" }, state.filters, setState)
							handleClose(event, setAnchorEl)
						}}
					>
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