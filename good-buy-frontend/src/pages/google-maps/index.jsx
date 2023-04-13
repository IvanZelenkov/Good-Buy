import { motion } from "framer-motion";
import { useLoadScript } from '@react-google-maps/api';
import { useState } from "react";
import { Box, List, useTheme } from "@mui/material";
import { tokens, stores } from "../../theme";
import GoogleMapsStoreCategory from "../../components/google-maps/GoogleMapsStoreCategory";
import CalculateRouteButton from "../../components/google-maps/CalculateRouteButton";
import Map from "../../components/google-maps/Map";
import Loader from "../../components/Loader";
import { getCurrentLocation, calculateRoute, getDirection } from "../../utils/google-maps/utils";

const GoogleMaps = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const topBarHeight = 65;
	const [currentLocation, setLocation] = useState({ lat: 0, lng: 0 })
	const [directions, setDirections] = useState(null);
	const [directionsService, setService] = useState(null);
	const destination = "Walmart Supercenter, Metairie,LA";

	// SHOPPING CART EXAMPLE
	let productsArray = ["92588066", "90488608", "17773456"];

	if (isLoaded === false)
		return <Loader colors={colors}/>;
	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Box display="flex">
				<Box
					sx={{
						display: "flex",
						width: 360,
						height: `calc(100vh - ${topBarHeight}px)`,
						padding: "1.5vh",
						backgroundColor: `${colors.customColors[5]}`,
						justifyContent: "space-between",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<List>
						<GoogleMapsStoreCategory stores={stores.recommended} title={"Recommended"} colors={colors}/>
						<GoogleMapsStoreCategory stores={stores.alternate} title={"Alternate"} colors={colors}/>
					</List>
					<CalculateRouteButton
						calculateRoute={() => {
							calculateRoute(productsArray)
								.then(wayPoints => {
									getDirection(directionsService, currentLocation, destination, wayPoints, setDirections);
								})
								.catch(error => {
									console.error(error);
								});
						}
					}
						customColors={colors.customColors}
					/>
				</Box>
				<Map
					topBarHeight={topBarHeight}
					currentLocation={currentLocation}
					getCurrentLocation={() => getCurrentLocation(setLocation, setService)}
					directions={directions}
				/>
			</Box>
		</Box>
	);
};

export default GoogleMaps;