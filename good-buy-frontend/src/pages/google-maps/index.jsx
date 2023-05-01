import { motion } from "framer-motion";
import { useLoadScript } from '@react-google-maps/api';
import { useState } from "react";
import { Box, List, useTheme } from "@mui/material";
import CalculateRouteButton from "../../components/google-maps/CalculateRouteButton";
import GoogleMapsStoreCategory from "../../components/google-maps/GoogleMapsStoreCategory";
import Loader from "../../components/loader/Loader";
import Map from "../../components/google-maps/Map";
import { calculateRoute, getCurrentLocation, getDirection } from "../../utils/google-maps/utils";
import { tokens } from "../../theme";

const stores = {
	recommended: [
		{
			name: "Walmart",
			address: "6000 Bullard Ave, New Orleans",
			distance: "19 min (3.1 mi)",
			logo: "walmart-logo.png"
		},
		{
			name: "Walmart",
			address: "8101 W Judge Perez Dr, Chalmette",
			distance: "22 min (3.6 mi)",
			logo: "walmart-logo.png"
		},
		{
			name: "Rouses",
			address: "701 Baronne St, New Orleans",
			distance: "30 min (5 mi)",
			logo: "rouses-logo.png"
		}
	],
	alternate: [
		{
			name: "Winn-Dixie",
			address: "8101 W Judge Perez Dr, Chalmette",
			distance: "22 min (3.6 mi)",
			logo: "winn-dixie-logo.png"
		}
	]
};

const GoogleMaps = ({ topBarHeight }) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
						width: 400,
						height: `calc(100vh - ${topBarHeight}px)`,
						padding: "1.5vh",
						backgroundColor: `${colors.customColors[1]}`,
						justifyContent: "space-between",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<List sx={{ display: "flex", flexDirection: "column", overflowY: "auto", height: "75vh" }}>
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