import { Box } from "@mui/material";
import { Star as StarIcon, StarHalf as StarHalfIcon } from "@mui/icons-material";

const RatingStars = ({ rating, starColor }) => {
	const starArray = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = (rating - fullStars) >= 0.5;

	for (let i = 1; i <= fullStars; i++)
		starArray.push(<StarIcon key={i} sx={{ color: starColor }}/>);

	if (hasHalfStar)
		starArray.push(<StarHalfIcon key={fullStars + 1} sx={{ color: starColor }}/>);

	const emptyStars = 5 - starArray.length;

	for (let i = 1; i <= emptyStars; i++)
		starArray.push(
			<StarIcon
				key={fullStars + i + (hasHalfStar ? 1 : 0)}
				sx={{ color: "white" }}
			/>
		);

	return (
		<Box sx={{ display: "flex" }}>
			{starArray}
		</Box>
	);
};

export default RatingStars;