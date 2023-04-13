import { Box, Button } from "@mui/material";

const CalculateRouteButton = ({ calculateRoute,  customColors }) => {
	return (
		<Box sx={{ zIndex: "1", shadow: "base" }}>
			<Button
				type="submit"
				onClick={calculateRoute}
				sx={{
					marginBottom: "5vh",
					backgroundColor: customColors[1],
					color: customColors[5],
					fontFamily: "Montserrat",
					fontSize: "1.2vh",
					"&:hover": {
						backgroundColor: "#AAAAAA",
						color: customColors[1]
					}
				}}
			>
				Calculate Route
			</Button>
		</Box>
	);
}

export default CalculateRouteButton;