import { useState, useMemo } from "react";
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { muiTextFieldCSS, tokens } from "../../theme";
import { handleAdd, handleCheck, handleRemove } from "../../utils/shopping-list/utils";
import ShoppingListColumnTitle from "../../components/shopping-list/ShoppingListColumnTitle";

const ShoppingList = ({ state, setState, topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const [newShoppingListProductName, setNewShoppingListProductName] = useState("");

	return (
		<Box
			component={motion.div}
			exit={{ opacity: 0 }}
			sx={{
				height: `calc(100vh - ${topBarHeight}px - 3vh)`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<Paper
				sx={{
					width: "40vw",
					boxShadow:  mode === "light" ? "0px 80px 50px rgba(0, 0, 0, 0.5)" : "",
					backgroundColor: colors.customColors[6],
					height: "50vh",
					overflowX: "auto",
					overflowY: "auto"
				}}
			>
				<Table aria-label="Shopping List">
					<TableHead
						sx={{
							backgroundColor: colors.customColors[3],
							position: "sticky",
							top: 0,
							zIndex: "1"
						}}
					>
						<TableRow>
							<ShoppingListColumnTitle title={"Product Name"} customColors={colors.customColors}/>
							<ShoppingListColumnTitle title={"Complete"} customColors={colors.customColors}/>
							<ShoppingListColumnTitle title={"Remove"} customColors={colors.customColors}/>
						</TableRow>
					</TableHead>
					<TableBody sx={{ overflowY: "auto", zIndex: "0" }}>
						{state.shoppingListData?.map((product) => (
							<TableRow key={product.id} sx={{ height: "40px" }}>
								<TableCell
									align="center"
									sx={{
										fontSize: "18px",
										fontFamily: "Montserrat",
										fontWeight: "600",
										color: colors.customColors[1]
									}}
								>
									{product.name}
								</TableCell>
								<TableCell align="center">
									<Checkbox
										checked={product.checked}
										onChange={() => handleCheck(product.id, state, setState)}
										style={{ color: colors.customColors[1] }}
									/>
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => handleRemove(product.id, state, setState)}>
										<DeleteIcon sx={{ color: "#FF2323" }}/>
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
			<Box
				sx={{
					position: "sticky",
					bottom: 0,
					width: "40vw",
					backgroundColor: colors.customColors[3],
					borderBottomLeftRadius: "5px",
					borderBottomRightRadius: "5px",
					padding: "1vh"
				}}
			>
				<form onSubmit={(event) => {
					event.preventDefault();
					handleAdd(state, setState, newShoppingListProductName, setNewShoppingListProductName)
				}} style={{ display: "flex" }}>
					<TextField
						value={newShoppingListProductName}
						onChange={(event) => {
							setNewShoppingListProductName(event.target.value)
						}}
						placeholder="Add a new product"
						fullWidth
						sx={muiTextFieldCSS(colors.customColors[6])}
						inputProps={{
							style: {
								fontFamily: "Montserrat",
								fontSize: "16px"
							}
						}}
						inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
					/>
					<Button
						variant="contained"
						type="submit"
						sx={{
							marginLeft: 2,
							backgroundColor: colors.customColors[6],
							color: colors.customColors[1],
							":hover": {
								backgroundColor: colors.customColors[5],
								color: colors.customColors[1]
							}
						}}
					>
						<AddIcon sx={{ fontSize: "28px" }}/>
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ShoppingList;
