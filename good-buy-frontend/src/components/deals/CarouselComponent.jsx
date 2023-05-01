import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import { handleCarouselItemClick } from "../../utils/deals/utils";

const CarouselComponent = ({ carouselImagePaths }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<Box sx={{ cursor: "pointer" }}>
			<Carousel
				stopOnHover={true}
				showArrows={true}
				showThumbs={false}
				showStatus={false}
				autoPlay={true}
				interval={3000}
				infiniteLoop={true}
				emulateTouch={true}
				selectedItem={currentSlide}
				onChange={setCurrentSlide}
			>
				{carouselImagePaths.map((path, index) => (
					<Box
						key={index}
						onClick={() => handleCarouselItemClick(index)}
						sx={{ width: "100%" }}
					>
						<img src={path} alt="product-ad" style={{ borderRadius: "10px" }}/>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default CarouselComponent;