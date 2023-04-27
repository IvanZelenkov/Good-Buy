import React from "react";
import { FormControl, FormGroup, ListItem } from "@mui/material";
import FilterCategoryTitle from "./FilterCategoryTitle";
import FilterCheckbox from "./FilterCheckbox";
import RatingStars from "./RatingStars";

const ratings = [
	{ title: "5", key: "customerRating", value: 5 },
	{ title: "4 & Up", key: "customerRating", value: 4 },
	{ title: "3 & Up", key: "customerRating", value: 3 },
	{ title: "2 & Up", key: "customerRating", value: 2 },
	{ title: "1 & Up", key: "customerRating", value: 1 }
];

const RatingStrategyFilter = ({ filters, setState, handleFilter, customColors }) => {
	return (
		<>
			<FilterCategoryTitle title={"Customer Rating"} customColors={customColors} />
			<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
				<FormControl sx={{ mt: 1, float: "left" }}>
					<FormGroup>
						{ratings.map((rating, id) => (
							<FilterCheckbox
								key={id}
								title={
									<RatingStars
										title={rating.title}
										rating={rating.value}
										starStyle={{ color: "gold", fontSize: "1.5vh" }}
									/>
								}
								filters={filters}
								setState={setState}
								handleFilter={handleFilter}
								k={rating.key}
								v={rating.value}
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
