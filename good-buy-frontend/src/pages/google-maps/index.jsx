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
						width: "18%",
						height: `calc(100vh - ${topBarHeight}px)`,
						backgroundColor: `${colors.customColors[1]}`,
						padding: "1.5vh"
					}}
				>
					<List>
						<Box sx={{ backgroundColor: `${colors.customColors[5]}`, borderRadius: "10px" }}>
							<ListItem sx={{ display: "flex", flexDirection: "column" }}>
								<ListItemText>
									<Typography sx={{ fontSize: "1.5vh", color: `${colors.customColors[1]}` }}>
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
									src={require("../../images/stores/walmartLogo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary="Walmart" secondary="6000 Bullard Ave, New Orleans"/>
							<Typography sx={{ fontSize: "1.2vh", color: `${colors.customColors[4]}` }}>
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
									src={require("../../images/stores/walmartLogo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary="Walmart" secondary="8101 W Judge Perez Dr, Chalmette"/>
							<Typography sx={{ fontSize: "1.2vh", color: `${colors.customColors[4]}` }}>
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
									src={require("../../images/stores/rousesLogo.png")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary="Rouses" secondary="701 Baronne St, New Orleans"/>
							<Typography sx={{ fontSize: "1.2vh", color: `${colors.customColors[4]}` }}>
								30 min (5 mi)
							</Typography>
						</ListItem>

						<Box sx={{ backgroundColor: `${colors.customColors[5]}`, borderRadius: "10px", marginTop: "1vh" }}>
							<ListItem sx={{ display: "flex", flexDirection: "column" }}>
								<ListItemText>
									<Typography sx={{ fontSize: "1.5vh", color: `${colors.customColors[1]}` }}>
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
									src={require("../../images/stores/winnDixieLogo.jpg")}
									sx={{ borderRadius: "10px", marginRight: "1vh" }}
								/>
							</ListItemAvatar>
							<ListItemText primary="Winn-Dixie" secondary="5400 Tchoupitoulas St, New Orleans"/>
							<Typography sx={{ fontSize: "1.2vh", color: `${colors.customColors[4]}` }}>
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