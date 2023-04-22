import { useState, useEffect, useMemo } from "react";
import {
	Box,
	Divider,
	FormControl,
	FormGroup, Grid,
	List,
	ListItem,
	Pagination, TextField,
	Typography,
	IconButton,
	useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import {tokens, muiPaginationCSS, muiTextFieldCSS} from "../../theme";
import Loader from "../../components/others/Loader";
import FilterCategoryTitle from "../../components/products/FilterCategoryTitle";
import FilterCheckbox from "../../components/products/FilterCheckbox";
import {
	filterProducts,
	handleFilter,
	handleChange,
	handlePriceFromChange,
	handlePriceToChange, getProductsInPriceRange
} from "../../utils/products/utils";
import ProductList from "../../components/products/ProductList";
import TopBar from "../../components/products/TopBar";
import SearchBar from "../../components/products/SearchBar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Products = () => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState([]);
	const [priceFrom, setPriceFrom] = useState("");
	const [priceTo, setPriceTo] = useState("");
	const topBarHeight = 65;
	const productsPerPage = 25;
	const totalPages = Math.ceil(productsData.flat().length / productsPerPage);

	useEffect(() => {
		filterProducts(filters, setProductsData, setInfoLoaded);
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
						padding: "15px",
						marginRight: "3vh"
					}}>
					{/* SEARCH BAR */}
					<SearchBar mode={mode} colors={colors}/>

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
								<Grid container spacing={2} sx={{ alignItems: "center" }}>
									<Grid item xs={4}>
										<TextField
											label="min"
											variant="outlined"
											value={priceFrom}
											onChange={(event) => setPriceFrom(event.target.value)}
											sx={muiTextFieldCSS(colors.customColors[6])}
											inputProps={{ style: { fontFamily: "Montserrat" }}}
											inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
										/>
									</Grid>
									<Grid item xs={1}>
										<Typography>to</Typography>
									</Grid>
									<Grid item xs={4}>
										<TextField
											label="max"
											variant="outlined"
											value={priceTo}
											onChange={(event) => setPriceTo(event.target.value)}
											sx={muiTextFieldCSS(colors.customColors[6])}
											inputProps={{ style: { fontFamily: "Montserrat" }}}
											inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
										/>
									</Grid>
									<Grid item xs={1}>
										<IconButton onClick={() => getProductsInPriceRange(
											{ key: "priceRange", value: priceFrom + "-" + priceTo  },
											setProductsData,
											setInfoLoaded)}
										>
											<ArrowForwardIosIcon/>
										</IconButton>
									</Grid>
								</Grid>
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

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						height: `calc(100vh - ${topBarHeight}px - 3vh)`,
						overflowY: "auto"
					}}
				>

					{/* TOP BAR */}
					<TopBar
						productsData={productsData}
						setProductsData={setProductsData}
						setInfoLoaded={setInfoLoaded}
						colors={colors}
					/>

					{/* PRODUCT LIST */}
					<ProductList
						productsData={productsData}
						page={page}
						productsPerPage={productsPerPage}
						colors={colors}
						mode={mode}
					/>

					<Pagination
						count={totalPages}
						page={page}
						onChange={(event, value) => {
							handleChange(event, value, setPage)
						}}
						sx={muiPaginationCSS(colors.customColors[6], colors.customColors[1])}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Products;