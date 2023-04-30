import { Box, ImageList, Typography, IconButton } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import RatingStars from "./RatingStars";
import { AddShoppingCart } from "@mui/icons-material";
import {addProductToShoppingCart} from "../../utils/products/utils";


const ProductList = ({ user, state, setState, productsPerPage, customColors, mode }) => {
	return (
		<ImageList cols={5} gap={50}>
			{state.productsData?.slice((state.page - 1) * productsPerPage, state.page * productsPerPage)
				.map((product) => (
					<ImageListItem
						key={product.ID}
						style={{
							marginRight: "0.5vw",
							textAlign: "center"
						}}
					>
						<IconButton
							onClick={() => addProductToShoppingCart(user, product, state, setState)}
							sx={{
								position: "absolute",
								top: "10px",
								right: "10px",
								zIndex: 1,
								backgroundColor: "white"
							}}
						>
							<AddShoppingCart sx={{ color: "red" }}/>
						</IconButton>
						<img
							className={"product-image"}
							src={require(`../../images/products/${product.image_url}`)}
							alt=""
							loading="lazy"
							onClick={() => window.open(product.store_link, "_blank")}
							style={{
								backgroundColor: `${customColors[3]}`,
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
								height: "15vh"
							}}
						/>
						<Box sx={{
							backgroundColor: mode === "dark" ? customColors[2] : "#1C2A33",
							borderBottomLeftRadius: "10px",
							borderBottomRightRadius: "10px",
							borderTop: "2px solid white"
						}}>
							<Box sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "0.5vh",
							}}>
								<Box
									component="img"
									alt="store-logo"
									src={require("../../images/stores/" + product.store_name.toString().toLowerCase() + "-logo.png")}
									sx={{
										marginRight: "1vh",
										width: "4vh",
										height: "2.2vh",
										borderRadius: "5px"
									}}
								/>
								<Typography sx={{
									padding: "0.5vh",
									fontSize: "1.1vh",
									fontFamily: "Montserrat",
									fontWeight: "900",
									color: "white"
								}}>
									{product.Name}
								</Typography>
							</Box>
							<Box sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "0.5vh"
							}}>
								<RatingStars
									rating={product.rating}
									starStyle={{ color: "gold", fontSize: "1.7vh" }}
								/>
								<Typography sx={{
									fontSize: "1.7vh",
									fontFamily: "Montserrat",
									color: "white"
								}}>
									${parseFloat(product.price)}
								</Typography>
							</Box>
						</Box>
					</ImageListItem>
				))}
		</ImageList>
	);
};

export default ProductList;