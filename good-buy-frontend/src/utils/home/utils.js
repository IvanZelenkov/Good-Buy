import { filterProducts } from "../products/utils";

export const handleKeyDown = async (event, state, setState, navigate, filterSearch) => {
	if (event.key === "Enter") {
		if (event.target.value) {
			setState(prevState => ({ ...prevState, lastSearchTerm: event.target.value }));
			if (filterSearch) {
				filterSearch(state, setState, navigate);
			}
		}
	}
};

export const filterSearch = async (state, setState, navigate) => {
	const filterResult = await filterProducts(state.filters, state, setState);

	if (!filterResult.productNotFound) {
		navigate(`/products?search=${state.lastSearchTerm}`);
	}
};