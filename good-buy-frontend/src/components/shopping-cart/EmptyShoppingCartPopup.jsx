import { Box, Typography } from "@mui/material";

const EmptyShoppingCartPopup = ({ title }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "red",
				width: "100%",
				animation: "Shake 0.5s",
				animationIterationCount: "infinite",
				borderRadius: "5px",
				padding: "0.5vh"
			}}
		>
			<Typography
				sx={{
					fontSize: "14px",
					fontFamily: "Montserrat",
					fontWeight: "900",
					color: "white"
				}}
			>
				{title}
			</Typography>
		</Box>
	);
}

export default EmptyShoppingCartPopup;