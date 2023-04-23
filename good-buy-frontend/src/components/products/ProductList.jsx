import { Box, ImageList, Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import RatingStars from "./RatingStars";

const ProductList = ({ state, productsPerPage, customColors, mode }) => {
	return (
		<ImageList
			cols={5}
			gap={50}
			sx={{ width: "100%" }}
		>
			{state.productsData?.slice((state.page - 1) * productsPerPage, state.page * productsPerPage)
				.map((product) => (
					<ImageListItem
						key={product.ID}
						style={{
							marginRight: "0.5vw",
							textAlign: "center"
						}}
					>
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
								<RatingStars rating={product.rating} starColor={"gold"}/>
								<Typography sx={{
									fontSize: "1.7vh",
									fontFamily: "Montserrat",
									color: "white"
								}}>
									${product.price}
								</Typography>
							</Box>
						</Box>
					</ImageListItem>
				))}
		</ImageList>
	);
};

export default ProductList;