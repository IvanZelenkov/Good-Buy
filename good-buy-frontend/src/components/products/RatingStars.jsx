import { Box } from "@mui/material";
import { Star as StarIcon, StarHalf as StarHalfIcon, StarBorder as StarBorderIcon } from "@mui/icons-material";

const RatingStars = ({ rating, starColor }) => {
	const starArray = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = (rating - fullStars) >= 0.5;

	for (let i = 1; i <= fullStars; i++)
		starArray.push(<StarIcon key={i} sx={{ color: starColor, fontSize: "1.7vh" }}/>);

	if (hasHalfStar)
		starArray.push(<StarHalfIcon key={fullStars + 1} sx={{ color: starColor, fontSize: "1.7vh" }}/>);

	const emptyStars = 5 - starArray.length;

	for (let i = 1; i <= emptyStars; i++)
		starArray.push(
			<StarBorderIcon
				key={fullStars + i + (hasHalfStar ? 1 : 0)}
				sx={{ color: starColor, fontSize: "1.7vh" }}
			/>
		);

	return (
		<Box sx={{ display: "flex" }}>
			{starArray}
		</Box>
	);
};

export default RatingStars;