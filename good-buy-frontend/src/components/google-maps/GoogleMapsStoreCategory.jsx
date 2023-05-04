import { Box, ListItem, Typography} from "@mui/material";
import StoreCategoryTitle from "./StoreCategoryTitle";
import Store from "./Store";

const GoogleMapsStoreCategory = ({ state, stores, title, customColors }) => {
	return (
		<>
			<StoreCategoryTitle title={title} customColors={customColors} />
			{state.shoppingCartData.length === 0 ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "red",
						width: "100%",
						animation: "Shake 0.5s",
						animationIterationCount: "infinite",
						borderRadius: "10px",
						marginTop: "1vh"
					}}
				>
					<Typography
						sx={{
							fontSize: "14px",
							fontFamily: "Montserrat",
							fontWeight: "900",
							color: "white"
						}}
					>
						Your shopping cart currently has no products.
					</Typography>
				</Box>
			) : (
				stores?.map((store, index) => (
					<ListItem key={index} sx={{ marginTop: "1vh" }}>
						<Store store={store} customColors={customColors}/>
					</ListItem>
				))
			)}
		</>
	);
};

export default GoogleMapsStoreCategory;

