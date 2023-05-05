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

export function calculateRoute(shoppingCartData) {
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
	switch(storename) {
		case "Rouses":
			return "rouses-logo.png";
		case "Walmart":
			return "walmart-logo.png";
		case "Winn-Dixie":
			return "winn-dixie-logo.png";
		default:
			return "";
	}
}

export function getStores(state, setState, currentPosition) {
	const { shoppingCartData } = state;
	// eslint-disable-next-line no-undef
	let matrixService = new google.maps.DistanceMatrixService();
	let stores = [];
	let addedStores = {};
	if (currentPosition.lat !== 0 && currentPosition.lng !== 0 && shoppingCartData.length !== 0) {
		const destinations = [];
		for (let i = 0; i < shoppingCartData.length; i++)
			destinations.push(shoppingCartData[i].store_location)

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
						const storeLocation = shoppingCartData[i].store_location;
						// Check if the store has not been added already
						if (!addedStores[storeLocation]) {
							// Mark added store as true
							addedStores[storeLocation] = true;
							stores.push({
								product_id: shoppingCartData[i].ID,
								product_name: shoppingCartData[i].Name,
								product_image_url: shoppingCartData[i].image_url,
								store_name: shoppingCartData[i].store_name,
								store_address: shoppingCartData[i].store_location,
								store_logo: getStoreImage(shoppingCartData[i].store_name),
								distance: result.rows[0].elements[i].distance.text + " (" + result.rows[0].elements[i].duration.text + ")"
							});
						}
					}
					setState((prevState) => ({
						...prevState,
						googleMapsStoreData: stores
					}));
				} else {
					console.error(`Error when fetching directions ${result}`);
				}
			});
	}
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