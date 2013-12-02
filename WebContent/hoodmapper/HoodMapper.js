var HoodMapper = {};

HoodMapper.downloadCurrentRouteAsGeoJSON = function() {
	routeLatLngs = OSRM.G.route._current_route.route._latlngs;
	geoJSONObject = HoodMapper.constructGeoJSONFromRoute(routeLatLngs);
	//dataToSave = geoJSONObject;
	textDataToSave = JSON.stringify(geoJSONObject, null, 2);
	blob = new Blob([textDataToSave], {type: "application/json"});
	//blob = new Blob([dataToSave], {type: "text/"});
	saveAs(blob, "new_hood.geojson");
};

HoodMapper.constructGeoJSONFromRoute = function(routeLatLngsArray) {
	// Convert the array of lat longs into an array of arrays (as GeoJSON wants)
	arrayOfArrays = this.convertArrayOfLatLngObjectsToArrayOfArrays(routeLatLngsArray);
	// Reverse each lat/long pair's order (lat/long != long/lat)
	reversedArrayOfLatLngs = this.reverseLatLngsInArray(arrayOfArrays);
	finalGeometry = reversedArrayOfLatLngs;
	// Copy the first lat/long as the last, to complete the polygon
	finalGeometry.push(reversedArrayOfLatLngs[0]);
	geoJSONObject = {};
	geoJSONObject.type = "Feature";
	geoJSONObject.properties = {};
	geoJSONObject.properties.name = "New Hood Shape";
	geoJSONObject.geometry = {};
	geoJSONObject.geometry.type = "Polygon";
	geoJSONObject.geometry.coordinates = [finalGeometry];
	console.log("Generated object:");
	console.log(geoJSONObject);
	return geoJSONObject;
}

// Helpers
HoodMapper.reverseLatLngsInArray = function(oldArray) {
	newArray = [];
	for(var i = 0; i < oldArray.length; i++) {
		oldElement = oldArray[i];
		newElement = [oldElement[1], oldElement[0]];
		newArray.push(newElement);
	}
	return newArray;
};
HoodMapper.convertArrayOfLatLngObjectsToArrayOfArrays = function(arrayOfLatLngs) {
	newArray = [];
	for(var i = 0; i < arrayOfLatLngs.length; i++) {
		newArray.push([arrayOfLatLngs[i].lat,arrayOfLatLngs[i].lng]);
	}
	return newArray;
};

HoodMapper.geojson_data = {};

HoodMapper.geojson_data.temescal = {
	"type":"Feature",
	"properties": {
		"name":"Temescal"
	},
	"geometry": {
		"type":"MultiPolygon",
		"coordinates":[[[[-122.267291,37.829348],[-122.267255,37.829526],[-122.267234,37.829634],[-122.267196,37.829823],[-122.267081,37.830403],[-122.267054,37.830527],[-122.266931,37.831098],[-122.266908,37.831207],[-122.266885,37.831314],[-122.266853,37.831463],[-122.266604,37.832746],[-122.266524,37.833075],[-122.266475,37.83326],[-122.266443,37.833413],[-122.266416,37.833545],[-122.266365,37.833797],[-122.266302,37.834106],[-122.266227,37.834474],[-122.266148,37.83487],[-122.266082,37.835204],[-122.266033,37.835446],[-122.265944,37.835893],[-122.265695,37.837236],[-122.265614,37.837579],[-122.265591,37.837676],[-122.265384,37.837709],[-122.265186,37.837728],[-122.264957,37.83775],[-122.264677,37.837799],[-122.264465,37.837836],[-122.264217,37.83786],[-122.264105,37.837906],[-122.263986,37.837932],[-122.263843,37.837937],[-122.263673,37.837924],[-122.263475,37.837893],[-122.263408,37.837897],[-122.263351,37.837897],[-122.263304,37.837897],[-122.26303,37.83791],[-122.262919,37.837913],[-122.262333,37.837975],[-122.262206,37.837995],[-122.262262,37.837645],[-122.262282,37.837308],[-122.261949,37.837238],[-122.261821,37.837222],[-122.261324,37.837156],[-122.260879,37.837111],[-122.260519,37.837068],[-122.259963,37.836982],[-122.259484,37.8369],[-122.258253,37.836712],[-122.257701,37.836631],[-122.257291,37.836569],[-122.256887,37.83646],[-122.256506,37.836333],[-122.255627,37.835971],[-122.255385,37.835883],[-122.25508,37.835767],[-122.254246,37.835431],[-122.253439,37.835126],[-122.253159,37.835016],[-122.252862,37.834864],[-122.252646,37.834793],[-122.252519,37.834769],[-122.252397,37.834753],[-122.252373,37.834755],[-122.252347,37.834491],[-122.252395,37.834526],[-122.252456,37.834428],[-122.253027,37.833532],[-122.253231,37.833202],[-122.253627,37.832563],[-122.254234,37.831633],[-122.254466,37.831252],[-122.255088,37.830228],[-122.255303,37.829873],[-122.25617,37.828501],[-122.256722,37.827629],[-122.256791,37.827518],[-122.257069,37.82707],[-122.259427,37.828277],[-122.261254,37.828704],[-122.267291,37.829348]]]]
	}
};

