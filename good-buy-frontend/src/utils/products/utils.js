import axios from "axios";

export const handleChange = (event, value, setPage) => {
	setPage(value);
};

export const handleFilter = (filter, filters, setFilters) => {
	const existingFilterIndex = filters.findIndex(f => f.key === filter.key && f.key === "storeName");

	if (existingFilterIndex > -1) {
		const existingFilter = filters[existingFilterIndex];
		const updatedValues = existingFilter.values.includes(filter.value)
			? existingFilter.values.filter(v => v !== filter.value)
			: [...existingFilter.values, filter.value];

		const updatedFilters = [
			...filters.slice(0, existingFilterIndex),
			{ key: existingFilter.key, values: updatedValues },
			...filters.slice(existingFilterIndex + 1)
		];

		setFilters(updatedFilters);
	} else {
		const newFilter = {
			key: filter.key, ...(filter.key === "storeName" ? { values: [filter.value] } : { value: filter.value })
		};

		setFilters(prevState => [...prevState, newFilter]);
	}
};

export const getUserData = async (filters, setProductsData, setInfoLoaded) => {
	const filterPairs = {};

	filters.forEach((filter) => {
		const { key, value, values } = filter;
		if (key === "storeName") {
			// If the key is storeName, use the values array
			filterPairs[key] = values;
		} else {
			// If the key is not storeName, use the value directly
			filterPairs[key] = value;
		}
	});

	console.log(filterPairs)

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