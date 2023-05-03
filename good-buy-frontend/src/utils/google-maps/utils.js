import { DistanceMatrixService } from "@react-google-maps/api";

export function getCurrentLocation(setLocation, setService) {
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

export function calculateRoute(productsArray,shoppingCartData) {
	return new Promise((resolve, reject) => {
		const wayPoints = [];
		let size = shoppingCartData.length
		for (let i = 0; i < size; i++) {
			wayPoints.push({
				location: shoppingCartData[i].store_location,
				stopover: true,
			});
		}
		resolve(wayPoints);
	});
}

function getStoreImage(storename) {
	var storeImage = ""
	if(storename == "Rouses") {
		storeImage = "rouses-logo.png"
	}
	if(storename == "Walmart") {
		storeImage = "walmart-logo.png"
	}
	if(storename == "Winn-Dixie") {
		storeImage = "winn-dixie-logo.png"
	}
	
	return storeImage
}
export function getStores(shoppingCartData,currentPosition,setStores) {
	// eslint-disable-next-line no-undef
	var matrixService = new google.maps.DistanceMatrixService();
	let stores = []
	if(currentPosition.lat != 0 && currentPosition.lng != 0 && shoppingCartData.length != 0) {
		var destinations = []
		for (let i = 0; i < shoppingCartData.length; i++) {
			destinations.push(shoppingCartData[i].store_location)
		}
		matrixService.getDistanceMatrix({
			origins: [currentPosition],
			destinations: destinations,
			// eslint-disable-next-line no-undef
			travelMode: google.maps.TravelMode.DRIVING,
			// eslint-disable-next-line no-undef
			unitSystem: google.maps.UnitSystem.IMPERIAL
			// eslint-disable-next-line no-undef
		}, 
			(result, status) => {
			// eslint-disable-next-line no-undef
			if (status === google.maps.DirectionsStatus.OK) {
				// Changing the state of directions to the result of direction service
				for (let i = 0; i < result.rows[0].elements.length; i++) {
					stores.push({
						name: shoppingCartData[i].store_name,
						address: shoppingCartData[i].store_location,
						distance: result.rows[0].elements[i].distance.text + " (" + result.rows[0].elements[i].duration.text + ")",
						logo: getStoreImage(shoppingCartData[i].store_name)
					})
				}
				setStores(stores)
				
			} else {
				console.error(`Error when fetching directions ${result}`);
			}
		}
		);
	}
	
	return stores
	
}

// Function that is calling the directions service
export function getDirection(directionsService, currentPosition, waypoints, setDirections) {
	const destination = waypoints[waypoints.length - 1].location
	waypoints = waypoints.slice(0, -1);
	
	directionsService.route(
		{
			origin: currentPosition,
			destination: destination,
			waypoints: waypoints,
			optimizeWaypoints:true,
			// eslint-disable-next-line no-undef
			travelMode: google.maps.TravelMode.DRIVING
		},
		// eslint-disable-next-line no-undef
		(result, status) => {
			// eslint-disable-next-line no-undef
			if (status === google.maps.DirectionsStatus.OK) {
				// Changing the state of directions to the result of direction service
				setDirections(result);
			} else {
				console.error(`Error when fetching directions ${result}`);
			}
		}
	);
}