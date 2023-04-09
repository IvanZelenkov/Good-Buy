import { motion } from "framer-motion";
import { useJsApiLoader,GoogleMap, useLoadScript , Marker, DirectionsRenderer} from '@react-google-maps/api';
import { useState } from "react";
import {
	Avatar,
	Box, Button, ButtonGroup, IconButton, InputBase,
	List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme
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
	var waypts = [];
	const destination = "Walmart Supercenter, Metairie,LA"

	//SHOPPING CART EXAMPLE:
	var productsArray = ["92588066","90488608","17773456"];

	const getCurrentLocation = () => {
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
		setService(new google.maps.DirectionsService());
	}

	const calculateRoute = () => {
		waypts = [];
		var xhr = new XMLHttpRequest();
		var url = 'https://faa4mfet0g.execute-api.us-east-1.amazonaws.com/Development/google-maps';
		xhr.open("GET", url, true);
		
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var res = JSON.parse(this.responseText);
				var size = Object.keys(res).length;
				
				for (let i = 0; i < size; i++) {
					var product = JSON.parse(res[i]);
					var size2 = Object.keys(product).length;
					
					//console.log(product[0].ID);
					for(let j = 0; j < productsArray.length; j++){
						
						for (let k = 0; k < size2; k++) {
							if(product[k].ID == productsArray[j]) {
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
	const getDirection = () =>  {
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
									src={require("../../images/stores/rouses-logo.png")}
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
									src={require("../../images/stores/amazon.png")}
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
									src={require("../../images/stores/walmart-logo.png")}
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
									src={require("../../images/stores/bestbuy.png")}
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
					<GoogleMap
						zoom={12}
						center={currentPosition}
						onLoad={getCurrentLocation}
						mapContainerClassName="map_container"
					>
					<Marker
						position={currentPosition}
					/>
					{directions !== null && (
            			<DirectionsRenderer directions={directions} />
          			)}

				</GoogleMap>
					<Box sx={{
						width:500,
						height:400,
						position: "absolute",
						borderRadius:'lg',
						bgColor:'white',
						shadow:'base',
						minW:'container.md',
						
						zIndex:'1'}}
      				>
					<Button colorScheme='pink' type='submit' onClick={calculateRoute}>
						Calculate Route
					</Button>
      			</Box>
				</Box>
			</Box>
		</motion.div>
	);
};

export default GoogleMaps;