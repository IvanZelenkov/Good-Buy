import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const FilterCheckbox = ({ title, filters, setFilters, handleFilter, k, v, customColors }) => {
	const isChecked = filters.some((filter) => {
		return filter.key === k && (filter.key === "storeName" ? filter.values.includes(v) : filter.value === v);
	});

	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={isChecked}
					onChange={() => handleFilter({ key: k, value: v }, filters, setFilters)}
					style={{ color: customColors[6] }}
				/>
			}
			label={
				<Typography sx={{ fontFamily: "Montserrat", fontSize: "1vh", fontWeight: "900", color: customColors[6]}}>
					{title}
				</Typography>
			}
			sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
		/>
	);
};

export default FilterCheckbox;