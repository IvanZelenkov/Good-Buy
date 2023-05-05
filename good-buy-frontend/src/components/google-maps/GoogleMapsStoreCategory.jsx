import { List } from "@mui/material";
import Store from "./Store";
import EmptyShoppingCartPopup from "../shopping-cart/EmptyShoppingCartPopup";

const GoogleMapsStoreCategory = ({ state, stores, customColors }) => {
	return (
		<>
			{state.shoppingCartData.length === 0
				? (<EmptyShoppingCartPopup title={"Your shopping cart currently has no products."}/>)
				: (stores?.map((store, index) => (
					<List key={index} sx={{ width: 400 }}>
						<Store store={store} customColors={customColors}/>
					</List>
				))
			)}
		</>
	);
};

export default GoogleMapsStoreCategory;

