import axios from "axios";

export const fetchShoppingCartData = async (user, state, setState) => {
	if (!user.attributes.email)
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
				shoppingCartData: [],
				infoLoaded: true
			}));
		}
	} catch (error) {
		console.error(error);
	}
}

export const handleRemove = (id, items, setItems) => {
	const updatedItems = items.filter((item) => item.id !== id);
	setItems(updatedItems);
};