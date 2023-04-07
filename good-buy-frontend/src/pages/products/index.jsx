import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import axios from "axios";
import {
	Box, ImageList, ImageListItem, Typography,
	List, ListItem, ListItemText, Container, useTheme,
	Pagination, ButtonGroup, Button, InputBase, IconButton
} from "@mui/material";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { muiPaginationCSS } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [sort, setSort] = useState("");
	const topBarHeight = 65;
	const productsPerPage = 25;
	const totalPages = Math.ceil(productsData.flat().length / productsPerPage);

	const handleFilter = (filter) => {
		setFilter(filter);
	};

	const handleSort = (sort) => {
		setSort(sort);
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
					<Box
						sx={{
							width: "20%",
							height: `calc(100vh - ${topBarHeight}px - 3vh)`,
							backgroundColor: `${colors.customColors[1]}`,
							borderRadius: "10px",
							padding: "15px"
						}}
					>
						<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
							<Box sx={{
								display: "flex",
								backgroundColor: "custom.customColorD",
								borderRadius: "10px",
								width: "100%",
								marginTop: "2vh"
							}}
							>
								<InputBase
									sx={{ marginLeft: 2, flex: 1, color: "custom.customColorA" }}
									placeholder="Search"
									required={true}
								/>
								<IconButton
									type="button"
									sx={{ padding: 1, color: "custom.customColorA" }}
								>
									<SearchIcon/>
								</IconButton>
							</Box>
						</Box>
						<List>
							<ListItem
								sx={{
									display: "flex",
									flexDirection: "column",
									backgroundColor: "custom.steamColorF",
									margin: "10px 0",
									borderRadius: "2px"
								}}
							>
								<ListItemText>
									<Typography>
										FILTER
									</Typography>
								</ListItemText>
								<ButtonGroup color="primary">
									<Button onClick={() => handleFilter("Rouses")}>Rouses</Button>
									<Button onClick={() => handleFilter('Walmart')}>Walmart</Button>
									<Button onClick={() => handleFilter("Winn-Dixie")}>Winn-Dixie</Button>
								</ButtonGroup>
							</ListItem>

							<ListItem
								sx={{
									display: "flex",
									flexDirection: "column",
									backgroundColor: "custom.steamColorF",
									margin: "10px 0",
									borderRadius: "2px"
								}}
							>
								<ListItemText>
									<Typography>
										SORT
									</Typography>
								</ListItemText>
								<ButtonGroup color="primary">
									<Button onClick={() => handleSort('priceAsc')}>Price: Low to High</Button>
									<Button onClick={() => handleSort('priceDesc')}>Price: High to Low</Button>
									<Button onClick={() => handleSort('ratingDesc')}>Rating: High to Low</Button>
								</ButtonGroup>
							</ListItem>
						</List>
					</Box>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						height: `calc(100vh - ${topBarHeight}px - 3vh)`
					}}>
						<ImageList
							cols={5}
							gap={50}
							sx={{
								width: "95%",
								marginLeft: "5vh"
							}}
						>
							{productsData?.flat()
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
											// src={`${product.img_url}?w=164&h=164&fit=crop&auto=format`}
											// srcSet={`${product.imgSource}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
											src={require("../../images/product_sample.png")}
											alt=""
											loading="lazy"
											onClick={() => window.open(product.store_link, "_blank")}
											style={{
												backgroundColor: `${colors.customColors[3]}`,
												borderTopLeftRadius: "20px",
												borderTopRightRadius: "20px"
											}}
										/>
										<Box sx={{
											backgroundColor: `${colors.customColors[5]}`,
											borderBottomLeftRadius: "20px",
											borderBottomRightRadius: "20px",
											borderTop: `2px solid ${colors.customColors[1]}`
										}}>
											<Typography sx={{
												padding: "1vh",
												fontSize: "1vh",
												color: `${colors.customColors[1]}`
											}}>
												{product.Name}
											</Typography>
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