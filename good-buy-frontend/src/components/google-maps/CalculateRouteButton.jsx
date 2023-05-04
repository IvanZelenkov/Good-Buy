import { Box, Button } from "@mui/material";

const CalculateRouteButton = ({ calculateRoute, customColors }) => {
	return (
		<Box sx={{ zIndex: "1", shadow: "base" }}>
			<Button
				type="submit"
				onClick={calculateRoute}
				sx={{
					marginBottom: "5vh",
					backgroundColor: customColors[6],
					color: customColors[1],
					fontFamily: "Montserrat",
					fontSize: "1.2vh",
					fontWeight: "600",
					paddingLeft: "2vh",
					paddingRight: "2vh",
					"&:hover": {
						backgroundColor: customColors[5],
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