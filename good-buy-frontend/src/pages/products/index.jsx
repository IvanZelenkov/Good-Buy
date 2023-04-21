import { useState, useEffect, useMemo } from "react";
import { Box, Divider, FormControl, FormGroup, InputBase, List, ListItem, Pagination, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import RatingStars from "../../components/others/RatingStars";
import { tokens, muiPaginationCSS } from "../../theme";
import Loader from "../../components/others/Loader";
import FilterCategoryTitle from "../../components/products/FilterCategoryTitle";
import FilterCheckbox from "../../components/products/FilterCheckbox";
import { handleFilter, getUserData, handleChange } from "../../utils/products/utils";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Products = () => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState([]);
	const topBarHeight = 65;
	const productsPerPage = 25;
	const totalPages = Math.ceil(productsData.flat().length / productsPerPage);

	useEffect(() => {
		getUserData(filters, setProductsData, setInfoLoaded);
	}, [filters]);

	if (infoLoaded === false || productsData === [])
		return <Loader colors={colors}/>;
	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Box margin="1.5vh" display="flex" justifyContent="center" alignItems="center">
				{/* SIDEBAR */}
				<Box
					sx={{
						width: 360,
						height: `calc(100vh - ${topBarHeight}px - 3vh)`,
						backgroundColor: `${colors.customColors[3]}`,
						borderRadius: "10px",
						padding: "15px"
					}}>
					{/* SEARCH BAR */}
					<Box sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						padding: "10px",
						backgroundColor: mode === "dark" ? colors.customColors[6] : colors.customColors[6],
						borderRadius: "10px"
					}}>
						<SearchIcon sx={{fontSize: "2.2vh", color: colors.customColors[1]}}/>
						<InputBase
							sx={{
								marginLeft: 2,
								flex: 1,
								fontFamily: "Montserrat",
								fontSize: "1vh",
								color: mode === "dark" ? colors.customColors[1] : colors.customColors[1],
								"&::placeholder": {
									color: mode === "dark" ? colors.customColors[1] : colors.customColors[1],
									opacity: "0.6"
								}
							}}
							placeholder="Search for products"
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
					</Box>

					<Divider sx={{ margin: "1vh 0" }}/>

					{/* LIST OF FILTER SECTIONS */}
					<List sx={{ height: `calc(100% - ${topBarHeight}px)`, overflowY: "auto" }}>

						{/* AVAILABILITY FILTER */}
						<FilterCategoryTitle title={"Availability"} customColors={colors.customColors}/>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FilterCheckbox
										title={"Exclude Out of Stock Items"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"availability"}
										v={true}
										customColors={colors.customColors}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* STORE NAME FILTER */}
						<FilterCategoryTitle title={"Store Name"} customColors={colors.customColors}/>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FilterCheckbox
										title={"Rouses"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"storeName"}
										v={"Rouses"}
										customColors={colors.customColors}
									/>
									<FilterCheckbox
										title={"Walmart"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"storeName"}
										v={"Walmart"}
										customColors={colors.customColors}
									/>
									<FilterCheckbox
										title={"Winn-Dixie"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"storeName"}
										v={"Winn-Dixie"}
										customColors={colors.customColors}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* PRICE FILTER */}
						<FilterCategoryTitle title={"Price"} customColors={colors.customColors}/>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FilterCheckbox
										title={"Price: Low to High"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"minPrice"}
										v={true}
										customColors={colors.customColors}
									/>
									<FilterCheckbox
										title={"Price: High to Low"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										key={"maxPrice"}
										v={true}
										customColors={colors.customColors}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* CURRENT DEALS FILTER */}
						<FilterCategoryTitle title={"Current Deals"} customColors={colors.customColors}/>
						<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
							<FormControl sx={{ mt: 1, float: "left" }}>
								<FormGroup>
									<FilterCheckbox
										title={"On Sale"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"onSale"}
										v={true}
										customColors={colors.customColors}
									/>
									<FilterCheckbox
										title={"Clearance"}
										filters={filters}
										setFilters={setFilters}
										handleFilter={handleFilter}
										k={"onClearance"}
										v={true}
										customColors={colors.customColors}
									/>
								</FormGroup>
							</FormControl>
						</ListItem>
					</List>
				</Box>

				{/* PRODUCT LIST */}
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
						sx={{ width: "95%", marginLeft: "5vh" }}
					>
						{productsData?.sort(() => Math.random() - 0.5)
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
										backgroundColor: mode === "dark" ? colors.customColors[2] : "#1C2A33",
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
												fontWeight: "900",
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
						onChange={(event, value) => {
							handleChange(event, value, setPage)
						}}
						sx={muiPaginationCSS(colors.customColors[6], colors.customColors[2])}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Products;