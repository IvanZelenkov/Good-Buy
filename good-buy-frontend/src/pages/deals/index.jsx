import {Box, Button, Typography, useTheme, Grid, Container, Paper, Card} from "@mui/material";
import { motion } from "framer-motion";
import mainImage from "../../images/deals/dealsMainImage.avif";
import saleImage from "../../images/deals/saleImage.avif";
import { tokens, itemData0, itemData1, itemData2, itemData3 } from "../../theme";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Deals = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box sx={{ display: "flex", flexDirection: "column", backgroundColor: colors.customColors[5] }}>
				<Box sx={{
					display: "flex",
					height: "5vh",
					backgroundColor: colors.customColors[5],
				}}/>
				<Box sx={{ position: "relative" }}>
					<Box sx={{
						display: "flex",
						height: `calc(100vh - ${65}px - 50vh)`,
						backgroundImage: `url(${mainImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundAttachment: "fixed",
						boxShadow: "inset 0px 0px 30px 10px rgba(0.5, 0, 0, 0.5)",
						position: "relative",
						zIndex: "1"
					}}/>
					<Box sx={{
						position: "absolute",
						top: "20%",
						left: "20%",
						width: "25vh",
						height: "25vh",
						zIndex: "2",
						backgroundImage: `url(${saleImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}/>
				</Box>
				<Box sx={{
					display: "flex",
					height: "10vh",
					backgroundColor: colors.customColors[5],
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 2rem",
					boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.5)",
				}}>
					<Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Box>
							<Typography variant="h4" sx={{ color: colors.customColors[1], fontFamily: "Montserrat", }}>Spring Sale</Typography>
							<Typography variant="subtitle1" sx={{ color: colors.customColors[1], fontFamily: "Montserrat" }}>
								Don’t miss deals on thousands of games and add-ons.
							</Typography>
						</Box>
						<Button
							variant="contained"
							sx={{
								backgroundColor: colors.customColors[1],
								color: colors.customColors[5],
								fontFamily: "Montserrat"
							}}
						>
							Save Now
						</Button>
					</Container>
				</Box>
				<Box sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "5vh"
				}}>
					<Container maxWidth="lg">
						<Grid container spacing={2}>
							{/* Large Screen */}
							<Grid item xs={12}>
								<Grid container spacing={2}>
									{itemData0.slice(0, 4).map((item, id) => (
										<Grid item key={id} xs={3} align="center" sx={{
											cursor: "pointer",
											filter: "brightness(100%)",
											transition: "filter 1s ease",
											"&:hover": {
												filter: "brightness(75%)"
											}
										}}>
											<img
												src={`${item.img}`}
												alt=""
												loading="lazy"
												style={{
													borderRadius: "5px",
													maxWidth: "100%",
													height: "auto",
												}}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									{itemData0.slice(4, 7).map((item, id) => (
										<Grid item key={id} xs={4} align="center" sx={{
											cursor: "pointer",
											filter: "brightness(100%)",
											transition: "filter 1s ease",
											"&:hover": {
												filter: "brightness(75%)"
											}
										}}>
											<img
												src={`${item.img}`}
												alt=""
												loading="lazy"
												style={{
													borderRadius: "5px",
													maxWidth: "100%",
													height: "auto",
												}}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</motion.div>
	);
}

export default Deals;