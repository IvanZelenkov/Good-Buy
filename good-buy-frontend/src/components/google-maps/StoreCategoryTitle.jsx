import { Box, ListItem, ListItemText, Typography } from "@mui/material";

const StoreCategoryTitle = ({ title,  customColors }) => {
	return (
		<Box sx={{ backgroundColor: `${customColors[1]}`, borderRadius: "10px" }}>
			<ListItem sx={{ display: "flex", flexDirection: "column" }}>
				<ListItemText>
					<Typography sx={{ fontSize: "1.5vh", color: `${customColors[5]}`, fontFamily: "Montserrat" }}>
						{title}
					</Typography>
				</ListItemText>
			</ListItem>
		</Box>
	);
}

export default StoreCategoryTitle;