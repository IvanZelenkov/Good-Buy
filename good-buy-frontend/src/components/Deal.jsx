import { Paper, Box, Button, Typography } from "@mui/material";

const Deal = ({ title, description, imageUrl }) => {
	const topBarHeight = 65;

	return (
		<Paper style={{
			display: "flex",
			height: `calc(100vh - ${topBarHeight}px - 10vh)`,
			justifyContent: "center",
			alignItems: "center",
			backgroundImage: `url(${imageUrl})`,
			backgroundSize: 'cover'
		}}>
			<Box style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20 }}>
				<h2 style={{ color: '#fff' }}>{title}</h2>
				<p style={{ color: '#fff' }}>{description}</p>
				<Button variant="contained" color="primary">
					Buy Now
				</Button>
			</Box>
		</Paper>
	);
}

export default Deal;