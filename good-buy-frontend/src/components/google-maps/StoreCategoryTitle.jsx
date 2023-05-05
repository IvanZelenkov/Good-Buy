import { ListItem, ListItemText, Typography } from "@mui/material";

const StoreCategoryTitle = ({ title,  customColors }) => {
	return (
		<ListItem
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: `${customColors[6]}`,
				borderRadius: "5px",
				width: 400,
			}}>
			<ListItemText>
				<Typography
					sx={{
						fontSize: "18px",
						color: `${customColors[1]}`,
						fontFamily: "Montserrat",
						fontWeight: "600",
						letterSpacing: "2px"
					}}
				>
					{title}
				</Typography>
			</ListItemText>
		</ListItem>
	);
}

export default StoreCategoryTitle;