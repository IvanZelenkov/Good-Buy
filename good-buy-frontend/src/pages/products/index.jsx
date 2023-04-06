import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import axios from "axios";
import { Box } from "@mui/material";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Products = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [productsData, setProductsData] = useState([]);

	const getUserData = async () => {
		try {
			const productsDataResponse = await axios.get(
				"https://" +
				process.env.REACT_APP_REST_API_ID +
				".execute-api.us-east-1.amazonaws.com/Development/store-apis/get-all-products"
			);
			console.log(productsDataResponse)
			setProductsData(JSON.parse(productsDataResponse));
			setInfoLoaded(true);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserData();
	}, [])

	if (infoLoaded === false || productsData !== []) {
		return (
			<motion.div exit={{ opacity: 0 }}>
				<Box margin="1.5vh">
					<Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
						<UseAnimations animation={loading} size={50} fillColor={colors.customColors[1]} strokeColor={colors.customColors[1]}/>
					</Box>
				</Box>
			</motion.div>
		);
	}
	return (
		<motion.div exit={{ opacity: 0 }}>

		</motion.div>
	);
}

export default Products;