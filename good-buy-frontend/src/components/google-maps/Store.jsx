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
							fontSize: "15px",
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
							fontSize: "13px",
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
					fontSize: "14px",
					fontFamily: "Montserrat"
				}}
			>
				{distance}
			</Typography>
		</>
	);
};

export default Store;