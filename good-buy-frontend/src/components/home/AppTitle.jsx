import { Typography } from "@mui/material";

const AppTitle = ({ title, customColors }) => {
	return (
		<Typography
			noWrap
			component="a"
			sx={{
				fontWeight: 700,
				letterSpacing: "0.3rem",
				color: customColors[1],
				textDecoration: "none",
				fontSize: "2vw",
				fontFamily: "Montserrat"
			}}
		>
			{title}
		</Typography>
	)
}

export default AppTitle;