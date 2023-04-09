import { motion } from "framer-motion";
import { useJsApiLoader,GoogleMap, useLoadScript , Marker, DirectionsRenderer} from '@react-google-maps/api';
import { useState } from "react";
import {
	Avatar,
	Box, Button, ButtonGroup, IconButton, InputBase,
	List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme, UseAnimations
} from "@mui/material";
import { tokens } from "../../theme";
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
/*global google*/

const GoogleMaps = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const topBarHeight = 65;
	const[currentPosition, setLocation] = useState({ lat: 0, lng: 0 })
	const[directions, setDirections] = useState(null)
	const[directionsService, setService] = useState(null)
	let waypts = [];
	const destination = "Walmart Supercenter, Metairie,LA"

	//SHOPPING CART EXAMPLE:
	let productsArray = ["92588066","90488608","17773456"];

	function getCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			  (position) => {
				const pos = {
				  lat: position.coords.latitude,
				  lng: position.coords.longitude,
				};
				setLocation(pos);
			  }
			);
		}
		// eslint-disable-next-line no-undef	
		setService(new window.google.maps.DirectionsService());
	}

	const calculateRoute = () => {
		waypts = [];
		var xhr = new XMLHttpRequest();
		var url = 'https://faa4mfet0g.execute-api.us-east-1.amazonaws.com/Development/google-maps';
		xhr.open("GET", url, true);
		
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				var res = JSON.parse(this.responseText);
				var size = Object.keys(res).length;
				
				for (let i = 0; i < size; i++) {
					var product = JSON.parse(res[i]);
					var size2 = Object.keys(product).length;
					
					//console.log(product[0].ID);
					for(let j = 0; j < productsArray.length; j++){
						
						for (let k = 0; k < size2; k++) {
							if(product[k].ID === productsArray[j]) {
								waypts.push({
									location: product[k].store_location,
									stopover: true,
								});
								console.log(product[k]);
							}
						}  
					} 

				}
				console.log(waypts);
				getDirection();
			} 
  		}
  		xhr.send();
	}

	//function that is calling the directions service
	function getDirection() {
		directionsService.route(
			{
			  origin: currentPosition,
			  destination: destination,
			  
			  waypoints: waypts,
			  optimizeWaypoints:true,
			  // eslint-disable-next-line no-undef
			  travelMode: google.maps.TravelMode.DRIVING,
			},
			// eslint-disable-next-line no-undef
			(result, status) => {
			  // eslint-disable-next-line no-undef	
			  if (status === google.maps.DirectionsStatus.OK) {
				//changing the state of directions to the result of direction service
				setDirections(result);
			  } else {
				console.error(`error fetching directions ${result}`);
			  }
			}
		  );
	};

	if (isLoaded === false) {
        return (
            <motion.div exit={{ opacity: 0 }}>
                <Box margin="1.5vh">
                    <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        
                    </Box>
                </Box>
            </motion.div>
        );
    }
	return (
		<motion.div exit={{ opacity: 0 }}>
			<Box display="flex">
				<Box
					sx={{
						display: "flex",
						width: "20%",
						height: `calc(100vh - ${topBarHeight}px)`,
						padding: "1.5vh",
						backgroundColor: `${colors.customColors[5]}`,
						justifyContent: "space-between",
						flexDirection: "column",
						alignItems: "center"
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
					<Box sx={{
						zIndex: "1",
						minW: "container.md",
						shadow: "base"
					}}>
						<Button
							colorScheme='pink'
							type='submit'
							onClick={calculateRoute}
							sx={{
								height: "4vh",
								width: "15vh",
								marginBottom: "5vh",
								backgroundColor: colors.customColors[1],
								color: colors.customColors[5],
								fontFamily: "Montserrat",
								"&:hover": {
									backgroundColor: "#c1c1c1",
									color: colors.customColors[1],
								}
							}}
						>
							Calculate Route
						</Button>
					</Box>
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
					<GoogleMap
						zoom={12}
						center={currentPosition}
						onLoad={getCurrentLocation}
						mapContainerClassName="map_container"
					>
						<Marker position={currentPosition}/>
						{directions !== null && (
							<DirectionsRenderer directions={directions} />
						)}
					</GoogleMap>
				</Box>
			</Box>
		</motion.div>
	);
};

export default GoogleMaps;