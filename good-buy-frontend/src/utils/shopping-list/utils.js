export const handleCheck = (id, state, setState) => {
	const updatedShoppingListData = state.shoppingListData.map(product => {
		if (product.id === id) {
			return {
				...product,
				checked: !product.checked
			};
		}
		return product;
	});
	setState((prevState) => ({
		...prevState,
		shoppingListData: updatedShoppingListData
	}));
	localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));
};


export const handleRemove = (id, state, setState) => {
	const updatedShoppingListData = state.shoppingListData.filter((item) => item.id !== id);
	setState((prevState) => ({
		...prevState,
		shoppingListData: updatedShoppingListData
	}));
	localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));
};

export const handleAdd = (state, setState, newShoppingListProductName, setNewShoppingListProductName) => {
	const updatedShoppingListData = JSON.parse(localStorage.getItem("shoppingListData")) || [];
	const newShoppingListProduct = {
		id: state.shoppingListData.length + 1,
		name: newShoppingListProductName,
		checked: false
	};
	setState((prevState) => ({
		...prevState,
		shoppingListData: [...updatedShoppingListData, newShoppingListProduct]
	}));
	localStorage.setItem("shoppingListData", JSON.stringify([...updatedShoppingListData, newShoppingListProduct]));
	setNewShoppingListProductName("");
};