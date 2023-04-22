import axios from "axios";

export const handleChange = (event, value, setPage) => {
	setPage(value);
};

export const handleFilter = (filter, filters, setFilters) => {
	const existingFilterIndex = filters.findIndex((f) => f.key === filter.key);

	if (existingFilterIndex !== -1) {
		// If a filter with the same key already exists, remove it from the list or update its values
		const existingFilter = filters[existingFilterIndex];
		const updatedValues = filter.values || [filter.value];
		const newValues = existingFilter.value.includes(filter.value)
			? existingFilter.value.filter((v) => v !== filter.value)
			: [...existingFilter.value, ...updatedValues];
		if (newValues.length) {
			const updatedFilter = {
				...existingFilter,
				value: newValues,
			};
			const updatedFilters = [...filters];
			updatedFilters[existingFilterIndex] = updatedFilter;
			setFilters(updatedFilters);
		} else {
			const updatedFilters = filters.filter((f, index) => index !== existingFilterIndex);
			setFilters(updatedFilters);
		}
	} else {
		// If the filter doesn't exist yet, add it to the list with all its values
		const allValues = filter.values || [filter.value];
		const newFilter = {
			key: filter.key,
			value: allValues,
		};
		setFilters((prevState) => [...prevState, newFilter]);
	}
};

export const filterProducts = async (filters, setProductsData, setInfoLoaded) => {
	const filterPairs = {};
	filters.forEach((filter) => {
		if (Array.isArray(filter.value)) {
			console.log(filter.key)
			// If the value is an array, join the elements with a comma
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
		setProductsData(productsDataResponse.data);
		setInfoLoaded(true);
	} catch (error) {
		console.log(error);
	}
};

export const getProductsInPriceRange = async (filter, setProductsData, setInfoLoaded) => {
	const filterPair = {};
	filterPair[filter.key] = filter.value;

	try {
		const productsDataResponse = await axios.get(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/store-apis/filter-products",
			{ params: filterPair }
		);
		setProductsData(productsDataResponse.data);
		setInfoLoaded(true);
	} catch (error) {
		console.log(error);
	}
};

export const sortProducts = async (sorters, setProductsData, setInfoLoaded) => {
	const sorterPairs = {};
	sorters.forEach((sorter) => {
		sorterPairs[sorter.key] = sorter.value;
	});

	try {
		const productsDataResponse = await axios.get(
			"https://" +
			process.env.REACT_APP_REST_API_ID +
			".execute-api.us-east-1.amazonaws.com/Development/store-apis/filter-products",
			{ params: sorterPairs }
		);
		console.log(productsDataResponse)
		setProductsData(productsDataResponse.data);
		setInfoLoaded(true);
	} catch (error) {
		console.log(error);
	}
};

export const handleClick = (event, setAnchorEl) => {
	setAnchorEl(event.currentTarget);
};

export const handleClose = (event, setAnchorEl) => {
	event.preventDefault();
	event.stopPropagation();
	setAnchorEl(null);
};