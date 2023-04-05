import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import axios from "axios";

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
				".execute-api.us-east-1.amazonaws.com/Development/stores"
			);
			setProductsData(JSON.parse(productsDataResponse));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserData();
	}, [])

	return (
		<motion.div exit={{ opacity: 0 }}>

		</motion.div>
	);
}

export default Products;