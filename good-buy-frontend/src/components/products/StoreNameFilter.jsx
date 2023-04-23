import FilterCheckbox from "./FilterCheckbox";
import { FormControl, FormGroup, ListItem } from "@mui/material";
import FilterCategoryTitle from "./FilterCategoryTitle";

const storeNames = [
	{ title: "Rouses", key: "storeName", value: "Rouses" },
	{ title: "Walmart", key: "storeName", value: "Walmart" },
	{ title: "Winn-Dixie", key: "storeName", value: "Winn-Dixie" }
];

const StoreNameFilter = ({ filters, setState, handleFilter, customColors }) => {
	return (
		<>
			<FilterCategoryTitle title={"Store Name"} customColors={customColors}/>
			<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
				<FormControl sx={{ mt: 1, float: "left" }}>
					<FormGroup>
						{storeNames.map((storeName, id) => (
							<FilterCheckbox
								key={id}
								title={storeName.title}
								filters={filters}
								setState={setState}
								handleFilter={handleFilter}
								k={storeName.key}
								v={storeName.value}
								customColors={customColors}
							/>
						))}
					</FormGroup>
				</FormControl>
			</ListItem>
		</>
	);
};

export default StoreNameFilter;