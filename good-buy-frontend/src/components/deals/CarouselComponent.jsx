import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";

const CarouselComponent = ({ carouselImagePaths }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleCarouselItemClick = (index) => {
		setCurrentSlide(index);
	};

	return (
		<Box sx={{ cursor: "pointer" }}>
			<Carousel
				stopOnHover={true}
				showArrows={false}
				showThumbs={false}
				showStatus={false}
				autoPlay={true}
				interval={4000}
				infiniteLoop={true}
				emulateTouch={true}
				selectedItem={currentSlide}
				onChange={setCurrentSlide}
			>
				{carouselImagePaths.map((path, index) => (
					<Box
						key={index}
						onClick={() => handleCarouselItemClick(index)}
						sx={{
							width: "100%"
						}}
					>
						<img
							src={path}
							alt=""
							style={{
								width: "100%",
								borderRadius: "10px"
							}}
						/>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default CarouselComponent;