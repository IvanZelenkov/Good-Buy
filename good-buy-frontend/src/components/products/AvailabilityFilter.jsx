import FilterCategoryTitle from "./FilterCategoryTitle";
import FilterCheckbox from "./FilterCheckbox";
import { FormControl, FormGroup, ListItem } from "@mui/material";

const AvailabilityFilter = ({ filters, setState, handleFilter, customColors }) => {
	return (
		<>
			<FilterCategoryTitle title={"Availability"} customColors={customColors} />
			<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
				<FormControl sx={{ mt: 1, float: "left" }}>
					<FormGroup>
						<FilterCheckbox
							title={"Exclude Out of Stock Items"}
							filters={filters}
							setState={setState}
							handleFilter={handleFilter}
							k={"availability"}
							v={true}
							customColors={customColors}
						/>
					</FormGroup>
				</FormControl>
			</ListItem>
		</>
	);
};

export default AvailabilityFilter;
