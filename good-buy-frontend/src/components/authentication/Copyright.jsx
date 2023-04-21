import { Link, Typography } from "@mui/material";

const Copyright = (props) => {
	return (
		<Typography
			variant="body2"
			align="center" {...props}
			sx={{
				color: props.textdecorationcolor,
				fontFamily: "Montserrat",
				marginTop: 4
			}}
		>
			{"Copyright © "}
			<Link
				sx={{
					color: props.textdecorationcolor,
					textDecorationColor: props.textdecorationcolor,
					fontFamily: "Montserrat"
				}}
				href="https://main.d1ch79678kx2mg.amplifyapp.com/"
			>
				Good Buy
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default Copyright;