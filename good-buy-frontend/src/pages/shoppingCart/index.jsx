import { useState, useMemo, useContext } from "react";
import {
	Box,
	Button,
	Checkbox,
	IconButton, InputBase,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	TextField, Typography
} from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import {muiTextFieldCSS, tokens} from "../../theme";
import {ProductCard} from "./CartProduct";
import { CartContext } from "./CartContext";
import { getProductData } from "./productStore";
import { productArray } from "./productStore";
import SearchIcon from "@mui/icons-material/Search";

const ShoppingCart = (props) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const cart = useContext(CartContext);
	const id = props.id;
	const quantity = props.quantity;
	const productData = getProductData(id);
	const [inputProductName, setInputProductName] = useState("");
	const [isValid, setIsValid] = useState(false);
	
	const [items, setItems] = useState([
		{ id: 1, image: "PRODUCT IMAGE", name: "PRODUCT NAME", price: "$64.05", quantity: "1" },
		{ id: 2, image: "PRODUCT IMAGE", name: "PRODUCT NAME", price: "$2.00" , quantity: "1" },
		{ id: 3, image: "PRODUCT IMAGE", name: "PRODUCT NAME",  price: "$23.00" ,quantity: "1" },
		{ id: 4, image: "PRODUCT IMAGE", name: "PRODUCT NAME",  price: "$12.00" , quantity: "1" },
		{ id: 5, image: "PRODUCT IMAGE", name: "PRODUCT NAME",  price: "$72.00", quantity: "1"  }
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

	const totalPrice = items.reduce((accumulator, current) => {
		const price = parseFloat(current.price.slice(1));
		return accumulator + price;
	}, 0);

	return (
		<Box
			component={motion.div}
			exit={{ opacity: 0 }}
			sx={{
				height: `calc(100vh - ${props.topBarHeight}px - 3vh)`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Paper
				sx={{
					width: "40vw",
					boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
					backgroundColor: colors.customColors[6],
					height: "50vh",
					overflowX: "auto",
					overflowY: "auto",
					borderRadius: "5px"
				}}
			>
				<Table aria-label="Shopping Cart">
					<TableHead
						sx={{
							backgroundColor: colors.customColors[3],
							position: "sticky",
							top: 0,
							zIndex: "1"
						}}
					>
						
						<TableRow>
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }}>Image</TableCell> 
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }}>Name</TableCell>
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }} align="center">Price</TableCell>
							<TableCell sx ={{color: colors.customColors[6], fontSize:"1.4vh", fontFamily: "Montserrat" }}>Quantity</TableCell>
							<TableCell sx={{ color: colors.customColors[6], fontSize: "1.4vh", fontFamily: "Montserrat" }} align="center">Remove</TableCell>
							
						</TableRow>
					</TableHead>
					<TableBody sx={{ overflowY: "auto", zIndex: "0" }}>
						{items.map((item) => (
							<TableRow key={item.id} sx={{ height: "40px" }}>
								<TableCell
									sx={{
										fontSize: "1.4vh",
										fontFamily: "Montserrat",
										color: colors.customColors[1]
									}}
								>
									{item.image}
								</TableCell>
								<TableCell
									sx={{
										fontSize: "1.4vh",
										fontFamily: "Montserrat",
										color: colors.customColors[1]
									}}
								>
									{item.name}
								</TableCell>
								<TableCell align="center">
									<Typography sx={{
										fontSize: "1.4vh",
										fontFamily: "Montserrat",
										color: colors.customColors[1]
									}}>
										{item.price}
									</Typography>
								</TableCell>
							
								<TableCell align="center">
									<Typography sx={{
										fontSize: "1.4vh",
										fontFamily: "Montserrat",
										color: colors.customColors[1]
									}}>
										{item.quantity}
									</Typography>
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
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: `${colors.customColors[3]}`,
					width: "20vw",
					height: "50vh",
					marginLeft: "2vh",
					borderRadius: "5px",
					padding: "15px"
				}}
			>
				<Typography
					sx={{
						fontFamily: "Montserrat",
						fontSize: "2.5vh",
						textAlign: "center",
						color: mode === "dark" ? colors.customColors[6] : colors.customColors[6]
					}}
				>
					Total: ${totalPrice}
				</Typography>
			</Box>
		</Box>
	);
};

export default ShoppingCart;
