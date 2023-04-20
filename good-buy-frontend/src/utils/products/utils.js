import axios from "axios";

export const handleFilter = (filter, filters, setFilters) => {
	const newFilters = filters.filter((f) => !(f.key === filter.key && f.value === filter.value));
	if (newFilters.length < filters.length) {
		// If the filter already exists, remove it from the list.
		setFilters(newFilters);
	} else {
		// If the filter doesn't exist yet, add it to the list.
		setFilters((prevState) => [...prevState, filter]);
	}
};

export const getUserData = async (filters, setProductsData, setInfoLoaded) => {
	const filterPairs = {};
	filters.forEach((filter) => {
		filterPairs[filter.key] = filter.value;
	});

	try {
		const productsDataResponse = await axios.get(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/store-apis/filter-products",
			{ params: filterPairs }
		);
		setProductsData(productsDataResponse.data);
		setInfoLoaded(true);
	} catch (error) {
		console.log(error);
	}
};

export const handleChange = (event, value, setPage) => {
	setPage(value);
};