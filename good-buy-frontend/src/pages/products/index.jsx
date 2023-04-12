import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import axios from "axios";
import {
	Box, ImageList, ImageListItem, Typography,
	List, ListItem, ListItemText, Container, useTheme,
	Pagination, ButtonGroup, Button, InputBase, IconButton, Checkbox, Divider, FormControlLabel, FormControl, FormGroup
} from "@mui/material";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { muiPaginationCSS } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import RatingStars from "../../components/RatingStars";

const Products = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState([]);
	const [sort, setSort] = useState(null);
	const topBarHeight = 65;
	const productsPerPage = 25;
	const totalPages = Math.ceil(productsData.flat().length / productsPerPage);

	const handleFilter = (filter) => {
		if (filters.includes(filter)) {
			setFilters(filters.filter((f) => f !== filter));
		} else {
			setFilters([...filters, filter]);
		}
	};

	const handleSort = (type) => {
		setSort(type);
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	const getUserData = async () => {
		try {
			const productsDataResponse = await axios.get(
				"https://" +
				process.env.REACT_APP_REST_API_ID +
				".execute-api.us-east-1.amazonaws.com/Development/store-apis/get-all-products",
				{ params: {} }
			);
			console.log(productsDataResponse.data)
			setProductsData(productsDataResponse.data);
			setInfoLoaded(true);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserData();
	}, []);

	if (infoLoaded === false || productsData === []) {
		return (
			<motion.div exit={{ opacity: 0 }}>
				<Box margin="1.5vh">
					<Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
						<UseAnimations animation={loading} size={50} fillColor={colors.customColors[1]} strokeColor={colors.customColors[1]}/>
					</Box>
				</Box>
			</motion.div>
		);
	}
	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box margin="1.5vh" display="flex" justifyContent="center" alignItems="center">
				<Box sx={{
						width: 360,
						height: `calc(100vh - ${topBarHeight}px - 3vh)`,
						backgroundColor: `${colors.customColors[1]}`,
						borderRadius: "10px",
						padding: "15px"
					}}>
					<Box sx={{
						display: "flex",
						flexDirection: "row"
					}}>
						<Box sx={{
							display: "flex",
							backgroundColor: "custom.customColorE",
							borderRadius: "10px",
							width: "100%"
						}}>
							<InputBase
								sx={{ marginLeft: 2, flex: 1, color: "custom.customColorA" }}
								placeholder="Search"
								required={true}
								inputProps={{ style: { fontFamily: "Montserrat" }}}
								inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
							/>
							<IconButton
								type="button"
								sx={{ padding: 1, color: "custom.customColorA" }}
							>
								<SearchIcon/>
							</IconButton>
						</Box>
					</Box>
					<Divider sx={{ margin: "1vh 0" }}/>
					<List sx={{ height: `calc(100% - ${topBarHeight}px)`, overflowY: "auto" }}>
						<Box sx={{ display: "flex" }}>
							<Typography
								sx={{
									fontFamily: "Montserrat",
									color: colors.customColors[5],
									fontSize: "1.2vh",
									float: "left",
									fontWeight: "900"
								}}
							>
								Availability
							</Typography>
						</Box>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("availability")}
												onChange={() => handleFilter("availability")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Exclude Out of Stock Items"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>
						<Divider sx={{ margin: "1vh 0" }}/>
						<Box sx={{ display: "flex" }}>
							<Typography
								sx={{
									fontFamily: "Montserrat",
									color: colors.customColors[5],
									fontSize: "1.2vh",
									float: "left",
									fontWeight: "900"
								}}
							>
								Store Name
							</Typography>
						</Box>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("Rouses")}
												onChange={() => handleFilter("Rouses")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Rouses"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("Walmart")}
												onChange={() => handleFilter("Walmart")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Walmart"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("Winn-Dixie")}
												onChange={() => handleFilter("Winn-Dixie")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Winn-Dixie"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>
						<Divider sx={{ margin: "1vh 0" }}/>
						<Box sx={{ display: "flex" }}>
							<Typography
								sx={{
									fontFamily: "Montserrat",
									color: colors.customColors[5],
									fontSize: "1.2vh",
									float: "left",
									fontWeight: "900"
								}}
							>
								Price
							</Typography>
						</Box>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("priceAsc")}
												onChange={() => handleFilter("priceAsc")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Price: Low to High"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("priceDesc")}
												onChange={() => handleFilter("priceDesc")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Price: High to Low"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filters.includes("ratingDesc")}
												onChange={() => handleFilter("ratingDesc")}
												sx={{ color: colors.customColors[5] }}
											/>
										}
										label="Rating: High to Low"
										sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>
						<Divider sx={{ margin: "1vh 0" }}/>
					</List>
				</Box>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					height: `calc(100vh - ${topBarHeight}px - 3vh)`,
					overflowY: "auto"
				}}>
					<ImageList
						cols={5}
						gap={50}
						sx={{ width: "auto", marginLeft: "5vh" }}
					>
						{productsData?.flat()
							.sort(() => Math.random() - 0.5)
							.slice((page - 1) * productsPerPage, page * productsPerPage)
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
										src={require("../../images/product_sample.png")}
										alt=""
										loading="lazy"
										onClick={() => window.open(product.store_link, "_blank")}
										style={{
											backgroundColor: `${colors.customColors[3]}`,
											borderTopLeftRadius: "10px",
											borderTopRightRadius: "10px"
										}}
									/>
									<Box sx={{
										backgroundColor: theme.palette.mode === "dark" ? colors.customColors[1] : "#1C2A33",
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
												fontSize: "1.5vh",
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
												fontSize: "2vh",
												color: "white"
											}}>
												${product.price}
											</Typography>
										</Box>
									</Box>
								</ImageListItem>
							))}
					</ImageList>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handleChange}
						sx={muiPaginationCSS}
					/>
				</Box>
			</Box>
		</motion.div>
	);
}

export default Products;