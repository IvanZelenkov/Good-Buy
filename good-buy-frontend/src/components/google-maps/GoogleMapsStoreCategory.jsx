import { ListItem } from "@mui/material";
import StoreCategoryTitle from "./StoreCategoryTitle";
import Store from "./Store";

const GoogleMapsStoreCategory = ({ stores, title, customColors }) => {
	console.log("STORES")
	console.log(stores)
	return (
		<>
			<StoreCategoryTitle title={title} customColors={customColors}/>
			{stores?.map((store, index) => (
				<ListItem key={index} sx={{ marginTop: "1vh" }}>
					<Store store={store} customColors={customColors}/>
				</ListItem>
			))}
		</>
	);
}

export default GoogleMapsStoreCategory;