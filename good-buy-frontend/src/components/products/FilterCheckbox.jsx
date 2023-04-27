import { Checkbox, FormControlLabel } from "@mui/material";

const FilterCheckbox = ({ title, filters, setState, handleFilter, k, v, customColors }) => {
	const isChecked = filters.some((filter) => {
		return filter.key === k && filter.value.includes(v);
	});

	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={isChecked}
					onChange={() => handleFilter({ key: k, value: v }, filters, setState)}
					style={{ color: customColors[6] }}
				/>
			}
			label={title}
			sx={{ fontFamily: "Montserrat", fontSize: "0.8vh" }}
		/>
	);
};

export default FilterCheckbox;