import { useEffect, useMemo, useRef } from "react";
import { Box, Divider, ImageList, List, Pagination, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Loader from "../../components/loader/Loader";
import ProductList from "../../components/products/ProductList";
import TopBar from "../../components/products/TopBar";
import SearchBar from "../../components/products/SearchBar";
import StoreNameFilter from "../../components/products/StoreNameFilter";
import PriceRangeFilter from "../../components/products/PriceRangeFilter";
import AvailabilityFilter from "../../components/products/AvailabilityFilter";
import CurrentDealsFilter from "../../components/products/CurrentDealsFilter";
import RatingStrategyFilter from "../../components/products/RatingStrategyFilter";
import { tokens, muiPaginationCSS } from "../../theme";
import { handleFilter, handleChange, filterProducts } from "../../utils/products/utils";
import { filterSearch } from "../../utils/home/utils";

const Products = ({ user, state, setState, searchError, setSearchError, navigate, topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const productsPerPage = 25;
	const componentRef = useRef(null);
	const totalPages = Math.ceil( state.productsData.flat().length / productsPerPage);

	useEffect(() => {
		filterSearch(state, setState, navigate, state.lastSearchTerm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.lastSearchTerm]);

	useEffect(() => {
		filterProducts(state.filters, state, setState, state.lastSearchTerm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.filters]);

	useEffect(() => {
		if (state.productNotFound)
			setSearchError(true);
		else
			setSearchError(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.productNotFound]);

	if (state.infoLoaded === false)
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
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							position: "relative"
						}}
					>
						{/* SEARCH BAR */}
						<SearchBar
							state={state}
							setState={setState}
							mode={mode}
							customColors={colors.customColors}
						/>
						{searchError && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "red",
									position: "absolute",
									bottom: "-2vh",
									width: "100%",
									animation: "Shake 0.5s",
									animationIterationCount: "infinite",
									borderRadius: "10px"
								}}
							>
								<Typography
									sx={{
										fontSize: "1vh",
										fontFamily: "Montserrat",
										fontWeight: "900",
										color: "white"
									}}
								>
									Products not found
								</Typography>
							</Box>
						)}
					</Box>

					<Divider sx={{ margin: "1vh 0" }}/>

					{/* LIST OF FILTERS */}
					<List sx={{ height: `calc(100% - ${topBarHeight}px)`, overflowY: "auto" }}>
						{/* AVAILABILITY FILTER */}
						<AvailabilityFilter
							filters={state.filters}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* STORE NAME FILTER */}
						<StoreNameFilter
							filters={state.filters}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* PRICE RANGE FILTER */}
						<PriceRangeFilter
							state={state}
							setState={setState}
							customColors={colors.customColors}
						/>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* CURRENT DEALS FILTER */}
						<CurrentDealsFilter
							filters={state.filters}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>

						<Divider sx={{ margin: "1vh 0" }}/>

						{/* CUSTOMER RATING FILTER */}
						<RatingStrategyFilter
							filters={state.filters}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>
					</List>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						height: `calc(100vh - ${topBarHeight}px - 3vh)`,
						overflowY: "auto",
						paddingRight: "2.5vh"
					}}
				>
					<Box sx={{ width: "100%" }}>
						{/* TOP BAR */}
						<TopBar
							componentReference={componentRef}
							state={state}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>

						{searchError ?
							(
								// EMPTY PRODUCT LIST
								<ImageList cols={5} gap={320}>
									<></>
								</ImageList>
							)
							:
							(
								// PRODUCT LIST
								<ProductList
									user={user}
									productsData={state.productsData}
									state={state}
									setState={setState}
									productsPerPage={productsPerPage}
									customColors={colors.customColors}
									mode={mode}
								/>
							)
						}
					</Box>

					{/* PAGINATION */}
					<Pagination
						count={totalPages}
						page={state.page}
						onChange={(event, value) => {
							handleChange(event, value, setState, componentRef)
						}}
						sx={muiPaginationCSS(colors.customColors[6], colors.customColors[3])}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Products;