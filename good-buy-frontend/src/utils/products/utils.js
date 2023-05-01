import axios from "axios";

export const handleFilter = (filter, filters, setState) => {
	const existingFilterIndex = filters.findIndex((f) => f.key === filter.key);

	if (existingFilterIndex !== -1) {
		// If a filter with the same key already exists,
		// remove it from the list or update its values
		const existingFilter = filters[existingFilterIndex];

		// Don't create an array for specific key values
		if (existingFilter.key === "reverse" || existingFilter.key === "priceRange") {
			const updatedFilter = { ...existingFilter, value: filter.value };
			const updatedFilters = [...filters];
			updatedFilters[existingFilterIndex] = updatedFilter;
			setState((prevState) => ({ ...prevState, filters: updatedFilters }));
		}
		// Create an array for the key values so that they can be
		// combined if there are multiple values of the same key.
		else {
			const updatedValues = filter.values || [filter.value];
			const newValues = existingFilter.value.includes(filter.value)
				? existingFilter.value.filter((v) => v !== filter.value)
				: [...existingFilter.value, ...updatedValues];
			if (newValues.length) {
				const updatedFilter = { ...existingFilter, value: newValues };
				const updatedFilters = [...filters];
				updatedFilters[existingFilterIndex] = updatedFilter;
				setState((prevState) => ({ ...prevState, filters: updatedFilters }));
			} else {
				const updatedFilters = filters.filter((f, index) => index !== existingFilterIndex);
				setState((prevState) => ({ ...prevState, filters: updatedFilters }));
			}
		}
	} else {
		// If the filter doesn't exist yet, add it to the list with all its values
		const allValues = filter.values || [filter.value];
		const newFilter = { key: filter.key, value: allValues };
		setState((prevState) => ({ ...prevState, filters: [...prevState.filters, newFilter] }));
	}
};

export const filterProducts = async (filters, state, setState, lastSearchTerm) => {
	const filterPairs = {};

	// Use lastSearchTerm from state to build filterPairs object
	if (lastSearchTerm !== "") {
		filterPairs.productName = lastSearchTerm;
	}

	// Build filterPairs object from filters array
	filters.forEach(filter => {
		if (Array.isArray(filter.value)) {
			filterPairs[filter.key] = filter.value.join(",");
		} else {
			filterPairs[filter.key] = filter.value;
		}
	});

	try {
		const productsDataResponse = await axios.get(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/store-apis/filter-products",
			{ params: filterPairs }
		);

		setState(prevState => ({
			...prevState,
			productNotFound: productsDataResponse.data.length === 0,
			productsData: productsDataResponse.data,
			infoLoaded: true
		}));

		return {
			productNotFound: productsDataResponse.data.length === 0,
			productsData: productsDataResponse.data,
			infoLoaded: true
		};
	} catch (error) {
		return { productNotFound: true, productsData: [], infoLoaded: true };
	}
};

export const handleChange = (event, value, setState, componentRef) => {
	setState((prevState) => ({ ...prevState, page: value }));
	componentRef.current.scrollIntoView({ behavior: "smooth" });
};

export const handleClick = (event, setAnchorEl) => {
	if (event) {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	}
};

export const handleClose = (event, setAnchorEl) => {
	if (event) {
		event.preventDefault();
		setAnchorEl(null);
	}
};

export const addProductToShoppingCart = async (user, product, state, setState) => {
	if (!user || !user.attributes || !user.attributes.email) {
		setState((prevState) => ({
			...prevState,
			shoppingCartData: [...state.shoppingCartData, product]
		}));
		localStorage.setItem("shoppingCartData", JSON.stringify(state.shoppingCartData));
		return;
	}

	try {
		const response = await axios.put(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			`.execute-api.us-east-1.amazonaws.com/Development/database/shopping-cart?action=add&ID=${user.attributes.email}`,
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
}