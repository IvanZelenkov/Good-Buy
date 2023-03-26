import { Box } from "@mui/material";
import { motion } from "framer-motion";

const GoogleMaps = () => {
	const topBarHeight = 65;

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box sx={{
				display: "flex",
				justifyContent: "center",
				height: `calc(100vh - ${topBarHeight}px)` }}
			>
				<iframe
					style={{ border: 0, width: "100%", height: "100%" }}
					loading="lazy"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
					src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=New+Orleans,Louisiana+LA`}
				>
				</iframe>
			</Box>
		</motion.div>
	);
};

export default GoogleMaps;