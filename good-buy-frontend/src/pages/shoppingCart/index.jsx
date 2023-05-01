import { useMemo, useEffect } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { fetchShoppingCartData, deleteProductFromShoppingCart, tableHeaderTitles } from "../../utils/shopping-cart/utils";
import Loader from "../../components/others/Loader";
import { Auth } from "aws-amplify";
import ProductImageCell from "../../components/shoppingCart/ProductImageCell";
import ProductAttributeCell from "../../components/shoppingCart/ProductAttributeCell";

const ShoppingCart = ({ user, state, setState, topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);

	const totalPrice = state.shoppingCartData.reduce((accumulator, current) => {
		const price = parseFloat(current.price);
		return accumulator + price;
	}, 0);

	useEffect(() => {
		async function fetchData() {
			try {
				const authUser = await Auth.currentAuthenticatedUser();
				fetchShoppingCartData(authUser, state, setState);
			} catch (error) {
				if (state.shoppingCartData === [] && JSON.parse(localStorage.getItem("shoppingCartData")) === []) {
					localStorage.setItem("shoppingCartData", JSON.stringify(state.shoppingCartData));
					localStorage.setItem("infoLoaded", JSON.stringify(true));
					setState(prevState => ({
						...prevState,
						infoLoaded: true
					}));
				}
			}
		}
		fetchData();
	}, []);

	if (state.infoLoaded === false && JSON.parse(localStorage.getItem("infoLoaded")) === false)
		return <Loader colors={colors}/>;
	return (
		<Box
			component={motion.div}
			exit={{ opacity: 0 }}
			sx={{
				height: `calc(100vh - ${topBarHeight}px - 3vh)`,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Paper
				sx={{
					width: "40vw",
					boxShadow:  mode === "light" ? "0px 70px 60px rgba(0, 0, 0, 0.5)" : "",
					backgroundColor: colors.customColors[6],
					height: "50vh",
					overflowX: "auto",
					overflowY: "auto",
					borderRadius: "5px"
				}}
			>
				<Table aria-label="Shopping Cart">
					{/* TABLE HEADER */}
					<TableHead
						sx={{
							backgroundColor: colors.customColors[3],
							position: "sticky",
							top: 0,
							zIndex: "1"
						}}
					>
						<TableRow>
							{/* TABLE HEADER TITLES */}
							{tableHeaderTitles.map((title, id) => (
								<TableCell
									key={id}
									sx={{
										color: colors.customColors[6],
										fontSize: "18px",
										fontFamily: "Montserrat",
										textAlign: "center",
										fontWeight: "600"
									}}
								>
									{title}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody sx={{ overflowY: "auto", zIndex: "0" }}>
						{(user && user.attributes && user.attributes.email ? state.shoppingCartData : JSON.parse(localStorage.getItem("shoppingCartData")) || []).map((product, id) => (
							<TableRow key={id} sx={{ height: "40px" }}>
								{/* PRODUCT IMAGE CELL */}
								<ProductImageCell productImageUrl={product.image_url} productStoreLink={product.store_link} customColors={colors.customColors}/>

								{/* PRODUCT NAME CELL */}
								<ProductAttributeCell productAttribute={product.Name} customColors={colors.customColors}/>

								{/* PRICE CELL */}
								<ProductAttributeCell productAttribute={product.price} customColors={colors.customColors}/>

								{/* RATING CELL */}
								<ProductAttributeCell productAttribute={product.rating} customColors={colors.customColors}/>

								{/* STORE NAME CELL */}
								<ProductAttributeCell productAttribute={product.store_name} customColors={colors.customColors}/>

								{/* REMOVE PRODUCT CELL */}
								<TableCell align="center" sx={{ textAlign: "center" }}>
									<Tooltip title="Remove" placement="bottom">
										<RemoveCircleIcon
											onClick={() => deleteProductFromShoppingCart(user, product, state, setState)}
											sx={{
												color: "#ff0036",
												fontSize: 30,
												cursor: "pointer",
												"&:hover": {
													transform: "scale(1.2)"
												},
												transition: "transform 0.5s ease-out"
											}}
										/>
									</Tooltip>
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
					width: "40vw",
					height: "10vh",
					marginTop: "1.5vh",
					borderRadius: "5px",
					padding: "15px"
				}}
			>
				<Typography
					sx={{
						fontFamily: "Montserrat",
						fontSize: "24px",
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
