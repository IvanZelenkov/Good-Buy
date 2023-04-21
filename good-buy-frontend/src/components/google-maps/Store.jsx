import { Box, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const Store = ({ store: { logo, name, address, distance }, customColors }) => {
	return (
		<>
			<ListItemAvatar>
				<Box
					component="img"
					alt={`${name}-logo`}
					width="5vh"
					height="3vh"
					src={require(`../../images/stores/${logo}`)}
					sx={{ borderRadius: "10px", marginRight: "1vh" }}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<Typography
						sx={{
							color: customColors[6],
							fontSize: "1.1vh",
							fontFamily: "Montserrat",
							fontWeight: 600
						}}
					>
						{name}
					</Typography>
				}
				secondary={
					<Typography
						sx={{
							color: customColors[6],
							fontSize: "0.9vh",
							fontFamily: "Montserrat"
						}}
					>
						{address}
					</Typography>
				}
			/>
			<Typography
				sx={{
					color: customColors[6],
					fontSize: "0.9vh",
					fontFamily: "Montserrat"
				}}
			>
				{distance}
			</Typography>
		</>
	);
};

export default Store;