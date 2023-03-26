import { Box, ImageList, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";

const OfferedProducts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const bestBuyLaptops = ["laptop-1", "laptop-2", "laptop-3"];
	const amazonLaptops = ["laptop-2", "laptop-3"];
	const walmartLaptops = ["laptop-1"];

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box sx={{ display: "flex", flexDirection: "column", margin: "1.5vh 1.5vh 1.5vh 3vh" }}>
				<ImageList sx={{ display: "flex", flexDirection: "column", width: "100%", height: "85vh" }}>
					<Box sx={{ display: "flex", flexDirection: "column", marginBottom: "5vh" }}>
						<Box>
							<img
								src={require(`../../images/stores/bestbuy.png`)}
								alt=""
								loading="lazy"
								className="store-logo"
							/>
						</Box>
						<Box sx={{ display: "flex" }}>
							{bestBuyLaptops?.map((product) => (
								<img
									src={require(`../../images/laptops/${product}.png`)}
									alt=""
									loading="lazy"
									className="product-logo"
								/>
							))}
						</Box>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", marginBottom: "5vh"}}>
						<Box>
							<img
								src={require(`../../images/stores/amazon.png`)}
								alt=""
								loading="lazy"
								className="store-logo"
							/>
						</Box>
						<Box sx={{ display: "flex" }}>
							{amazonLaptops?.map((product) => (
								<img
									src={require(`../../images/laptops/${product}.png`)}
									alt=""
									loading="lazy"
									className="product-logo"
								/>
							))}
						</Box>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", marginBottom: "5vh"}}>
						<Box>
							<img
								src={require(`../../images/stores/walmart.png`)}
								alt=""
								loading="lazy"
								className="store-logo"
							/>
						</Box>
						<Box sx={{ display: "flex" }}>
							{walmartLaptops?.map((product) => (
								<img
									src={require(`../../images/laptops/${product}.png`)}
									alt=""
									loading="lazy"
									className="product-logo"
								/>
							))}
						</Box>
					</Box>
				</ImageList>
			</Box>
		</motion.div>
	);
};

export default OfferedProducts;