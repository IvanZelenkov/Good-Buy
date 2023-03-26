import { Link, Typography } from "@mui/material";

const Copyright = (props) => {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center" {...props}
			sx={{
				color: "black",
				marginTop: 4
			}}
		>
			{"Copyright © "}
			<Link sx={{ color: "black", textDecorationColor: "black" }} href="https://main.d1ch79678kx2mg.amplifyapp.com/">
				Good Buy
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default Copyright;