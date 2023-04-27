import React from "react";
import { FormControl, FormGroup, ListItem } from "@mui/material";
import FilterCategoryTitle from "./FilterCategoryTitle";
import FilterCheckbox from "./FilterCheckbox";

const currentDeals = [
	{ title: "5", key: "customerRating", value: 5 },
	{ title: "4", key: "customerRating", value: 4 },
	{ title: "3", key: "customerRating", value: 3 },
	{ title: "2", key: "customerRating", value: 2 },
	{ title: "1", key: "customerRating", value: 1 }
];

const RatingStrategyFilter = ({ filters, setState, handleFilter, customColors }) => {
	return (
		<>
			<FilterCategoryTitle title={"Customer Rating"} customColors={customColors} />
			<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
				<FormControl sx={{ mt: 1, float: "left" }}>
					<FormGroup>
						{currentDeals.map((currentDeal, id) => (
							<FilterCheckbox
								key={id}
								title={currentDeal.title}
								filters={filters}
								setState={setState}
								handleFilter={handleFilter}
								k={currentDeal.key}
								v={currentDeal.value}
								customColors={customColors}
							/>
						))}
					</FormGroup>
				</FormControl>
			</ListItem>
		</>
	);
};

export default RatingStrategyFilter;
