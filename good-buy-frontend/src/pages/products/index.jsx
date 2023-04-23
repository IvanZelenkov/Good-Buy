import { useEffect, useMemo, useState } from "react";
import { Box, Divider, List, Pagination, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Loader from "../../components/others/Loader";
import ProductList from "../../components/products/ProductList";
import TopBar from "../../components/products/TopBar";
import SearchBar from "../../components/products/SearchBar";
import StoreNameFilter from "../../components/products/StoreNameFilter";
import PriceRangeFilter from "../../components/products/PriceRangeFilter";
import AvailabilityFilter from "../../components/products/AvailabilityFilter";
import CurrentDealsFilter from "../../components/products/CurrentDealsFilter";
import { tokens, muiPaginationCSS } from "../../theme";
import { handleFilter, handleChange, filterProducts } from "../../utils/products/utils";
import { filterSearch } from "../../utils/home/utils";

const Products = ({ state, setState, navigate, topBarHeight }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const productsPerPage = 25;
	const totalPages = Math.ceil( state.productsData.flat().length / productsPerPage);

	useEffect(() => {
		filterSearch(state, setState, navigate, state.lastSearchTerm);
	}, [state.lastSearchTerm]);

	useEffect(() => {
		filterProducts(state.filters, state, setState, state.lastSearchTerm);
	}, [state.filters]);

	if (state.infoLoaded === false || state.productsData === [])
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
					<SearchBar
						state={state}
						setState={setState}
						navigate={navigate}
						mode={mode}
						customColors={colors.customColors}
					/>

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
					<Box sx={{ width: "100%" }}>
						{/* TOP BAR */}
						<TopBar
							state={state}
							setState={setState}
							handleFilter={handleFilter}
							customColors={colors.customColors}
						/>

						{/* PRODUCT LIST */}
						<ProductList
							productsData={state.productsData}
							state={state}
							productsPerPage={productsPerPage}
							customColors={colors.customColors}
							mode={mode}
						/>
					</Box>

					{/* PAGINATION */}
					<Pagination
						count={totalPages}
						page={state.page}
						onChange={(event, value) => {
							handleChange(event, value, setState)
						}}
						sx={muiPaginationCSS(colors.customColors[6], colors.customColors[3])}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Products;