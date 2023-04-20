import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const FilterCheckbox = ({ title, filters, setFilters, handleFilter, k, v, customColors }) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={filters.some((filter) => filter.key === k && filter.value === v)}
					onChange={() => handleFilter({ key: k, value: v }, filters, setFilters)}
					sx={{ color: customColors[5] }}
				/>
			}
			label={<Typography sx={{ fontFamily: "Montserrat", fontSize: "1vh" }}>{title}</Typography>}
			sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
		/>
	);
}

export default FilterCheckbox;