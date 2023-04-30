import { useState, useMemo } from "react";
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { muiTextFieldCSS, tokens } from "../../theme";

const ShoppingList = ({ topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState("");

	const handleCheck = (id) => {
		setItems(items.map(item => {
			if (item.id === id) {
				return {
					...item,
					checked: !item.checked
				};
			}
			return item;
		}));
	};

	const handleRemove = (id) => {
		const updatedItems = items.filter((item) => item.id !== id);
		setItems(updatedItems);
	};

	const handleAdd = (event) => {
		event.preventDefault();
		const newId = items.length + 1;
		const newItemObj = {
			id: newId,
			name: newItem,
			checked: false
		};
		setItems([...items, newItemObj]);
		setNewItem("");
	};

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
					boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
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
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }}>Product Name</TableCell>
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }} align="center">Complete</TableCell>
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }} align="center">Remove</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ overflowY: "auto", zIndex: "0" }}>
						{items.map((item) => (
							<TableRow key={item.id} sx={{ height: "40px" }}>
								<TableCell sx={{ fontSize: "1.4vh", fontFamily: "Montserrat", color: colors.customColors[1] }}>
									{item.name}
								</TableCell>
								<TableCell align="center">
									<Checkbox
										checked={item.checked}
										onChange={() => handleCheck(item.id)}
										style={{ color: colors.customColors[1] }}
									/>
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => handleRemove(item.id)}>
										<DeleteIcon sx={{ color: "#FF2323" }} />
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
				<form onSubmit={handleAdd} style={{ display: "flex" }}>
					<TextField
						value={newItem}
						onChange={(event) => setNewItem(event.target.value)}
						placeholder="Add a new product"
						fullWidth
						sx={muiTextFieldCSS(colors.customColors[6])}
						inputProps={{
							style: {
								fontFamily: "Montserrat",
								fontSize: "1.2vh"
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
						<AddIcon sx={{ fontSize: "2vh" }}/>
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ShoppingList;
