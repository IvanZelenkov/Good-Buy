import React from "react";
import {FormControl, FormGroup, ListItem, Typography} from "@mui/material";
import FilterCategoryTitle from "./FilterCategoryTitle";
import FilterCheckbox from "./FilterCheckbox";

const currentDeals = [
	{ title: "On Sale", key: "onSale", value: true },
	{ title: "Clearance", key: "onClearance", value: true }
];

const CurrentDealsFilter = ({ filters, setState, handleFilter, customColors }) => {
	return (
		<>
			<FilterCategoryTitle title={"Current Deals"} customColors={customColors} />
			<ListItem sx={{ display: "flex", borderRadius: "2px" }}>
				<FormControl sx={{ mt: 1, float: "left" }}>
					<FormGroup>
						{currentDeals.map((currentDeal, id) => (
							<FilterCheckbox
								key={id}
								title={
									<Typography sx={{ fontFamily: "Montserrat", fontSize: "1vh", fontWeight: "900", color: customColors[6]}}>
										{currentDeal.title}
									</Typography>
								}
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

export default CurrentDealsFilter;
