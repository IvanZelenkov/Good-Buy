import { useState } from "react";
import {
	Avatar,
	Box, Button, ButtonGroup, IconButton, InputBase,
	List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import { LocationOn as LocationOnIcon } from '@mui/icons-material';

const GoogleMaps = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const topBarHeight = 65;

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box display="flex">
				<Box
					sx={{
						width: "20%",
						height: `calc(100vh - ${topBarHeight}px)`,
						padding: "1.5vh"
					}}
				>
					<List>
						<Box sx={{ backgroundColor: `${colors.customColors[1]}`, borderRadius: "10px" }}>
							<ListItem sx={{ display: "flex", flexDirection: "column" }}>
								<ListItemText>
									<Typography sx={{ fontSize: "1.5vh", color: `${colors.customColors[5]}`, fontFamily: "Montserrat" }}>
										Recommended
									</Typography>
								</ListItemText>
							</ListItem>
						</Box>
						<ListItem sx={{ marginTop: "1vh" }}>
							<ListItemAvatar>
								<Box
									component="img"
									alt="profile-user"
									width="5vh"
									height="3vh"
									src={require("../../images/stores/walmart-logo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "1.1vh",
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Walmart
								</Typography>
							} secondary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "0.9vh",
									fontFamily: "Montserrat"
								}}>
									6000 Bullard Ave, New Orleans
								</Typography>
							}
							/>
							<Typography sx={{ fontSize: "1.1vh", color: `${colors.customColors[1]}`, fontFamily: "Montserrat" }}>
								19 min (3.1 mi)
							</Typography>
						</ListItem>
						<ListItem sx={{ marginTop: "1vh" }}>
							<ListItemAvatar>
								<Box
									component="img"
									alt="profile-user"
									width="5vh"
									height="3vh"
									src={require("../../images/stores/walmart-logo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "1.1vh",
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Walmart
								</Typography>
							} secondary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "0.9vh",
									fontFamily: "Montserrat"
								}}>
									8101 W Judge Perez Dr, Chalmette
								</Typography>}
							/>
							<Typography sx={{ fontSize: "1.1vh", color: `${colors.customColors[1]}`, fontFamily: "Montserrat" }}>
								22 min (3.6 mi)
							</Typography>
						</ListItem>
						<ListItem sx={{ marginTop: "1vh" }}>
							<ListItemAvatar>
								<Box
									component="img"
									alt="profile-user"
									width="5vh"
									height="3vh"
									src={require("../../images/stores/rouses-logo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "1.1vh",
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Rouses
								</Typography>
							} secondary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "0.9vh",
									fontFamily: "Montserrat"
								}}>
									701 Baronne St, New Orleans
								</Typography>
							}
							/>
							<Typography sx={{ fontSize: "1.1vh", color: `${colors.customColors[1]}`, fontFamily: "Montserrat" }}>
								30 min (5 mi)
							</Typography>
						</ListItem>

						<Box sx={{ backgroundColor: `${colors.customColors[1]}`, borderRadius: "10px", marginTop: "1vh" }}>
							<ListItem sx={{ display: "flex", flexDirection: "column" }}>
								<ListItemText>
									<Typography sx={{ fontSize: "1.5vh", color: `${colors.customColors[5]}`, fontFamily: "Montserrat" }}>
										Alternate
									</Typography>
								</ListItemText>
							</ListItem>
						</Box>
						<ListItem sx={{ marginTop: "1vh" }}>
							<ListItemAvatar>
								<Box
									component="img"
									alt="profile-user"
									width="5vh"
									height="3vh"
									src={require("../../images/stores/winn-dixie-logo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "1.1vh",
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Winn-Dixie
								</Typography>
							} secondary={
								<Typography sx={{
									color: `${colors.customColors[1]}`,
									fontSize: "0.9vh",
									fontFamily: "Montserrat"
								}}>
									5400 Tchoupitoulas St, New Orleans
								</Typography>
							}
							/>
							<Typography sx={{ fontSize: "1.1vh", color: `${colors.customColors[1]}`, fontFamily: "Montserrat" }}>
								40 min (8 mi)
							</Typography>
						</ListItem>
					</List>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "82%",
						height: `calc(100vh - ${topBarHeight}px)`,
						alignItems: "center"
					}}
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
			</Box>
		</motion.div>
	);
};

export default GoogleMaps;