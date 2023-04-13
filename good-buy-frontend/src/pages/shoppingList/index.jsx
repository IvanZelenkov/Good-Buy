import { useState, useMemo } from "react";
import {
	Box,
	Button,
	Checkbox,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	TextField
} from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const ShoppingList = () => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const topBarHeight = 65;
	const [items, setItems] = useState([
		{ id: 1, name: "Three Musketeers" },
		{ id: 2, name: "Candy Cane" },
		{ id: 3, name: "Kit Kat" },
		{ id: 4, name: "Skittles" },
		{ id: 5, name: "Twix" }
	]);
	const [newItem, setNewItem] = useState("");

	const handleCheck = (id) => {
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
		setItems(updatedItems);
	};

	const handleRemove = (id) => {
		const updatedItems = items.filter((item) => item.id !== id);
		setItems(updatedItems);
	};

	const handleAdd = (event) => {
		event.preventDefault();
		const newId = items.length + 1;
		const newItemObj = { id: newId, name: newItem };
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
				alignItems: "center"
			}}
		>
			<TableContainer
				component={Paper}
				sx={{
					maxWidth: "35vw",
					margin: "auto",
					borderRadius: "10px",
					overflow: "hidden",
					boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
					backgroundColor: colors.customColors[1],
					maxHeight: "60vh",
					overflowY: "auto"
				}}
			>
				<Table aria-label="Shopping List">
					<TableHead sx={{ backgroundColor: colors.customColors[7], position: "sticky", top: 0, zIndex: "1" }}>
						<TableRow>
							<TableCell sx={{ color: colors.customColors[1], fontSize: "1.2vh", fontFamily: "Montserrat" }}>Item</TableCell>
							<TableCell sx={{ color: colors.customColors[1], fontSize: "1.2vh", fontFamily: "Montserrat" }} align="center">Complete</TableCell>
							<TableCell sx={{ color: colors.customColors[1], fontSize: "1.2vh", fontFamily: "Montserrat" }} align="center">Remove</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ height: "calc(60vh - 2.2rem)", overflowY: "auto", zIndex: "0" }}>
						{items.map((item) => (
							<TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell sx={{ fontSize: "1.2vh", fontFamily: "Montserrat" }}>{item.name}</TableCell>
								<TableCell align="center">
									<Checkbox checked={item.checked} onChange={() => handleCheck(item.id)} />
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => handleRemove(item.id)}>
										<DeleteIcon sx={{ color: "#FF2323" }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3} sx={{ position: "sticky", bottom: 0, backgroundColor: colors.customColors[1] }}>
								<form onSubmit={handleAdd} style={{ display: "flex" }}>
									<TextField
										value={newItem}
										onChange={(event) => setNewItem(event.target.value)}
										placeholder="Add a new product"
										sx={{ width: "100%" }}
									/>
									<Button variant="contained" type="submit" sx={{ marginLeft: 2, color: colors.customColors[1] }}>
										<AddIcon sx={{ fontSize: "2vh", color: colors.customColors[1] }}/>
									</Button>
								</form>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Box>

	);
};

export default ShoppingList;
