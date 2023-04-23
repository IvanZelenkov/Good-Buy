import { Box, Typography } from "@mui/material";

const ErrorPopup = ({ searchHelperText }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "red",
				position: "absolute",
				bottom: "-2vh",
				width: "100%",
				animation: "Shake 0.5s",
				animationIterationCount: "infinite",
				borderRadius: "10px"
			}}
		>
			<Typography
				sx={{
					fontSize: "1vh",
					fontFamily: "Montserrat",
					fontWeight: "900",
					color: "white"
				}}
			>
				{searchHelperText}
			</Typography>
		</Box>
	);
}

export default ErrorPopup;