import { motion } from "framer-motion";
import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import dealsMainImage from "../../images/deals/deals-main-image.webp";
import saleImage from "../../images/deals/sale-image.webp";
import { tokens } from "../../theme";
import { topDealsImages } from "../../utils/deals/utils";

const Deals = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const imagePaths = topDealsImages.map((image) => image);

	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Box sx={{ display: "flex", height: "5vh" }}/>
				<Box sx={{ position: "relative" }}>
					<Box
						sx={{
							display: "flex",
							height: `calc(100vh - ${65}px - 50vh)`,
							backgroundImage: `url(${dealsMainImage})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundAttachment: "fixed",
							boxShadow: "inset 0px 0px 30px 10px rgba(0.5, 0, 0, 0.5)",
							position: "relative",
							zIndex: "1"
						}}
					/>
					<Box
						sx={{
							position: "absolute",
							top: "20%",
							left: "20%",
							width: "25vh",
							height: "25vh",
							zIndex: "2",
							backgroundImage: `url(${saleImage})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						height: "10vh",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0 2rem",
						boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.5)"
					}}
				>
					<Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Box>
							<Typography variant="h4" sx={{ color: colors.customColors[6], fontFamily: "Montserrat", }}>Spring Sale</Typography>
							<Typography variant="subtitle1" sx={{ color: colors.customColors[6], fontFamily: "Montserrat" }}>
								Don’t miss deals on thousands of games and add-ons.
							</Typography>
						</Box>
						<Button
							sx={{
								backgroundColor: colors.customColors[6],
								color: colors.customColors[1],
								fontFamily: "Montserrat",
								fontWeight: "900",
								letterSpacing: "1px",
								px: "1vw",
								":hover": {
									backgroundColor: colors.customColors[5],
									color: colors.customColors[1]
								}
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
									{imagePaths.slice(0, 4).map((path, id) => (
										<Grid item key={id} xs={3} align="center" sx={{
											cursor: "pointer",
											filter: "brightness(100%)",
											transition: "filter 1s ease",
											"&:hover": {
												filter: "brightness(75%)"
											}
										}}>
											<img
												src={path}
												alt=""
												loading="lazy"
												style={{
													borderRadius: "5px",
													maxWidth: "100%",
													height: "auto"
												}}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									{imagePaths.slice(4, 7).map((path, id) => (
										<Grid item key={id} xs={4} align="center" sx={{
											cursor: "pointer",
											filter: "brightness(100%)",
											transition: "filter 1s ease",
											"&:hover": {
												filter: "brightness(75%)"
											}
										}}>
											<img
												src={path}
												alt=""
												loading="lazy"
												style={{
													borderRadius: "5px",
													maxWidth: "100%",
													height: "auto"
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
		</Box>
	);
}

export default Deals;