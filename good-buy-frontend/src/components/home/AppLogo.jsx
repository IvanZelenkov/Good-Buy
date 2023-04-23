import { Box } from "@mui/material";

const AppLogo = () => {
	return (
		<Box
			component="img"
			src={require("../../images/appLogo.png")}
			sx={{
				display: { xs: "none", md: "flex" },
				mr: 1,
				color: "black",
				width: "8vw"
			}}
			alt="Good Buy logo"
		/>
	);
}

export default AppLogo;
