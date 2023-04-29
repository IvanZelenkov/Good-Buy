import axios from "axios";

export const getShoppingCartData = async (user, state, setState) => {
	console.log(user)

	if (user.attributes.email) {
		try {
			const shoppingCartDataResponse = await axios.get(
				"https://" +
				process.env.REACT_APP_REST_API_ID +
				`.execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart?ID=${user.attributes.email}`
			);

			if (shoppingCartDataResponse.data.Item && shoppingCartDataResponse.data.Item.cart)
				setState(prevState => ({
					...prevState,
					shoppingCartData: shoppingCartDataResponse.data.Item.cart,
					infoLoaded: true
				}));
			else
				await generateShoppingCartForNewUser(user, state, setState);

		} catch (error) {
			console.log(error);
		}
	}
};

export const generateShoppingCartForNewUser = async (user, state, setState) => {
	console.log(user.attributes.email)

	try {
		const shoppingCartDataResponse = await axios.post(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart",
			{
				"email": user.attributes.email
			}
		);

		console.log("GENERATE SHOPPING CART DATA: ")
		console.log(shoppingCartDataResponse)

		if (shoppingCartDataResponse.data.Item.cart)
			setState(prevState => ({
				...prevState,
				shoppingCartData: shoppingCartDataResponse.data,
				infoLoaded: true
			}));
	}
	catch (error) {
		console.log(error);
	}
};

export const handleRemove = (id, items, setItems) => {
	const updatedItems = items.filter((item) => item.id !== id);
	setItems(updatedItems);
};