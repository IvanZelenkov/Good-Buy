import { Box, Typography } from "@mui/material";
import { Star as StarIcon, StarHalf as StarHalfIcon, StarBorder as StarBorderIcon } from "@mui/icons-material";

const RatingStars = ({ title, rating, starStyle }) => {
	const starArray = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = (rating - fullStars) >= 0.5;

	for (let i = 1; i <= fullStars; i++)
		starArray.push(<StarIcon key={i} sx={starStyle}/>);

	if (hasHalfStar)
		starArray.push(<StarHalfIcon key={fullStars + 1} sx={starStyle}/>);

	const emptyStars = 5 - starArray.length;

	for (let i = 1; i <= emptyStars; i++)
		starArray.push(
			<StarBorderIcon
				key={fullStars + i + (hasHalfStar ? 1 : 0)}
				sx={starStyle}
			/>
		);

	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			{starArray}
			<Typography
				sx={{
					fontSize: "1.1vh",
					fontFamily: "Montserrat",
					fontWeight: "900",
					marginLeft: "0.5vh"
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default RatingStars;