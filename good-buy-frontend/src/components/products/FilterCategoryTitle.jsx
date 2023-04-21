import { Box, Typography } from "@mui/material";

const FilterCategoryTitle = ({ title,  customColors }) => {
	return (
		<Box sx={{ display: "flex" }}>
			<Typography
				sx={{
					fontFamily: "Montserrat",
					color: customColors[6],
					fontSize: "1.2vh",
					float: "left",
					fontWeight: "900"
				}}
			>
				{title}
			</Typography>
		</Box>
	);
}

export default FilterCategoryTitle;