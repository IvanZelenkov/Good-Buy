import { AnimatePresence, motion } from "framer-motion";
import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from "react";
import { Box, List, useTheme } from "@mui/material";
import CalculateRouteButton from "../../components/google-maps/CalculateRouteButton";
import GoogleMapsStoreCategory from "../../components/google-maps/GoogleMapsStoreCategory";
import Loader from "../../components/loader/Loader";
import Map from "../../components/google-maps/Map";
import { calculateRoute, getCurrentLocation, getDirection,getStores } from "../../utils/google-maps/utils";
import { tokens } from "../../theme";
import StoreCategoryTitle from "../../components/google-maps/StoreCategoryTitle";

const GoogleMaps = ({ state, setState, topBarHeight }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [currentLocation, setLocation] = useState({ lat: 0, lng: 0 });
	const [directions, setDirections] = useState(null);
	const [directionsService, setService] = useState(null);
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
	});

	useEffect(() => {
		if (isLoaded === true)
			getStores(state, setState, currentLocation);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoaded, currentLocation]);

	if (isLoaded === false)
		return <Loader customColors={colors.customColors}/>;
	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			<Box display="flex">
				<AnimatePresence>
					{currentLocation.lat === 0 || currentLocation.lng === 0 ? null : (
						<motion.div
							key="box"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={{
								display: "flex",
								width: 500,
								height: `calc(100vh - ${topBarHeight}px)`,
								padding: "1.5vh",
								backgroundColor: `${colors.customColors[1]}`,
								flexDirection: "column",
								alignItems: "center"
							}}
						>
							<StoreCategoryTitle title={"Stores"} customColors={colors.customColors}/>
							<List
								sx={{
									display: "flex",
									flexDirection: "column",
									overflowY: "auto",
									height: "90vh",
									padding: 0,
									marginBottom: "20px",
									marginTop: "5px"
								}}
							>
								<GoogleMapsStoreCategory
									state={state}
									stores={state.googleMapsStoreData}
									customColors={colors.customColors}
								/>
							</List>
							<CalculateRouteButton
								calculateRoute={() => {
									calculateRoute(state.shoppingCartData)
										.then((wayPoints) => {
											getDirection(
												directionsService,
												currentLocation,
												wayPoints,
												setDirections
											);
										})
										.catch((error) => {
											console.error(error);
										});
								}}
								customColors={colors.customColors}
							/>
						</motion.div>
					)}
				</AnimatePresence>
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