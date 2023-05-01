import axios from "axios";

export const fetchShoppingCartData = async (user, state, setState) => {
	if (!user || !user.attributes || !user.attributes.email)
		return;

	try {
		const response = await axios.get(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			`.execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart?ID=${user.attributes.email}`
		);

		if (response.data.Item && response.data.Item.cart) {
			setState(prevState => ({
				...prevState,
				shoppingCartData: response.data.Item.cart,
				infoLoaded: true
			}));
		} else {
			await createShoppingCart(user, state, setState);
		}
	} catch (error) {
		console.error(error);
	}
}

const createShoppingCart = async (user, state, setState) => {
	if (!user || !user.attributes || !user.attributes.email)
		return;

	try {
		const response = await axios.post(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart",
			{
				"ID": user.attributes.email
			}
		);

		if (response.data) {
			setState(prevState => ({
				...prevState,
				shoppingCartData: response.data.Item.cart,
				infoLoaded: true
			}));
		}
	} catch (error) {
		console.error(error);
	}
}

export const deleteProductFromShoppingCart = async (user, product, state, setState) => {
	if (!user || !user.attributes || !user.attributes.email) {
		const updatedShoppingCartData = state.shoppingCartData.filter((shoppingCartProduct) => shoppingCartProduct.ID !== product.ID);
		setState((prevState) => ({
			...prevState,
			shoppingCartData: [...updatedShoppingCartData]
		}));
		localStorage.setItem("shoppingCartData", JSON.stringify(updatedShoppingCartData));
		return;
	}

	try {
		const response = await axios.put(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			`.execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart?action=delete&ID=${user.attributes.email}`,
			{
				ID: product.ID,
				Name: product.Name,
				image_url: product.image_url,
				category: product.category,
				availability: product.availability,
				on_clearance: product.on_clearance,
				on_sale: product.on_sale,
				brand: product.brand,
				store_name: product.store_name,
				price: product.price,
				store_link: product.store_link,
				store_location: product.store_location,
				rating: product.rating
			}
		);

		setState((prevState) => ({
			...prevState,
			shoppingCartData: response.data.Item.cart
		}));
	} catch (error) {
		console.log(error);
	}
};

export const tableHeaderTitles = [
	"Image",
	"Name",
	"Price ($)",
	"Rating",
	"Store",
	""
]