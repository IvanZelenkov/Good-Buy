import { Box, ListItem, ListItemText, Typography } from "@mui/material";

const StoreCategoryTitle = ({ title,  customColors }) => {
	return (
		<Box
			sx={{
				backgroundColor: `${customColors[6]}`,
				borderRadius: "10px",
				width: 400
			}}
		>
			<ListItem sx={{ display: "flex", flexDirection: "column" }}>
				<ListItemText>
					<Typography
						sx={{
							fontSize: "18px",
							color: `${customColors[1]}`,
							fontFamily: "Montserrat",
							fontWeight: "600",
							letterSpacing: "1px"
						}}
					>
						{title}
					</Typography>
				</ListItemText>
			</ListItem>
		</Box>
	);
}

export default StoreCategoryTitle;