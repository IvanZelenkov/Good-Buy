import { Box } from "@mui/material";
import { DirectionsRenderer, GoogleMap, Marker, DistanceMatrixService } from "@react-google-maps/api";

const Map = ({ topBarHeight, currentLocation, getCurrentLocation, directions }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				width: "100%",
				height: `calc(100vh - ${topBarHeight}px)`,
				alignItems: "center"
			}}
		>
			<GoogleMap
				zoom={12}
				center={currentLocation}
				onLoad={getCurrentLocation}
				mapContainerClassName="map_container"
			>
				<Marker position={currentLocation}/>
				{directions !== null && (
					<DirectionsRenderer directions={directions}/>
				)}
			</GoogleMap>
		</Box>
	);
}

export default Map;