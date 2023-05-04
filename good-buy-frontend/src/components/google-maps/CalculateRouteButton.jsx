import { Box, Button } from "@mui/material";

const CalculateRouteButton = ({ isDisabled, calculateRoute, customColors }) => {
	return (
		<Box sx={{ zIndex: "1", shadow: "base" }}>
			{!isDisabled && (
				<Button
					type="submit"
					onClick={calculateRoute}
					sx={{
						marginBottom: "30px",
						backgroundColor: customColors[6],
						color: customColors[1],
						fontFamily: "Montserrat",
						fontSize: "14px",
						fontWeight: "600",
						paddingLeft: "10px",
						paddingRight: "10px",
						letterSpacing: "1px",
						"&:hover": {
							backgroundColor: customColors[5],
							color: customColors[1]
						}
					}}
				>
					Calculate Route
				</Button>
			)}
		</Box>
	);
}

export default CalculateRouteButton;