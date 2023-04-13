import { Box } from "@mui/material";
import { motion } from "framer-motion";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Deal = ({ colors: { customColors }}) => {
	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Box margin="1.5vh">
				<Box sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
					<UseAnimations
						animation={loading}
						size={50}
						fillColor={customColors[1]}
						strokeColor={customColors[1]}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Deal;