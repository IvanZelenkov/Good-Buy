import { filterProducts, handleFilter } from "../products/utils";

export const handleKeyDown = async (event, state, setState, navigate) => {
	if (event.key === "Enter") {
		if (event.target.value) {
			setState((prevState) => ({ ...prevState, searching: true }));
			handleFilter({ key: "productName", value: event.target.value }, state.filters, setState);
			const filterResult = await filterProducts(
				[{ key: "productName", value: event.target.value }],
				state,
				setState
			);

			if (!filterResult.productNotFound) {
				navigate(`/products?search=${event.target.value}`);
			}
			setState((prevState) => ({ ...prevState, searching: false }));
		}
	}
};