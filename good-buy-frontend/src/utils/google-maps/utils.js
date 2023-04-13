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

export function calculateRoute(productsArray) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		let url = 'https://faa4mfet0g.execute-api.us-east-1.amazonaws.com/Development/google-maps';
		xhr.open("GET", url, true);

		const wayPoints = [];

		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				let res = JSON.parse(this.responseText);
				let size = Object.keys(res).length;

				for (let i = 0; i < size; i++) {
					let product = JSON.parse(res[i]);
					let size2 = Object.keys(product).length;

					for(let j = 0; j < productsArray.length; j++){

						for (let k = 0; k < size2; k++) {
							if(product[k].ID === productsArray[j]) {
								wayPoints.push({
									location: product[k].store_location,
									stopover: true,
								});
							}
						}
					}
				}
				resolve(wayPoints);
			}
		}
		xhr.send();
	});
}

// Function that is calling the directions service
export function getDirection(directionsService, currentPosition, destination, waypoints, setDirections) {
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