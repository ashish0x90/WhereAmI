function geo(onSuccessFunction, onErrorFunction )
{
    onSuccess = onSuccessFunction; //On Success, execute this function in global context;
    onError = onErrorFunction; //On Error, execute this function in global context;
    extractError = function (geoErrObj)
	{
	    var message;
	    switch(geoErrObj.code)
		{
		case 0:
		    message = "Unknown Error";
		    break;
		case 1:
		    message = "Did you share your Location??";
		    break;
		case 2:
		    message = "Location information UNAVAILABLE at the moment";
		    break;
		case 3:
		    message = "Location Query Request timed out";
		    break;
		default:
		    message = "Unknown Error";
		    break;
		    
		}
	    return message;
	};


this.errorCallback = function (geoErrorObj) {
    var status={'status':false, 'message':extractError(geoErrorObj)};
    onError(status);
};

this.successCallback = function(position) {
    var locationString = "Latitude:" + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude + 
    "<br/>With Accuracy: "+position.coords.accuracy;
    var status={'status':true, 'message':"Got your position!!!", 'data':{'latitude':position.coords.latitude, 
		'longitude':position.coords.longitude,
		'userLocation':locationString} };
    onSuccess(status);
};

this.getCurrentPosition  = function() {
    var defaults =  {timeout:10000, maximumAge: 75000};
    if(navigator.geolocation){
	//console.log(getp(window.navigator));
	return navigator.geolocation.getCurrentPosition(this.successCallback , this.errorCallback , defaults);
    }
    else{
	return {"status":false, "message":"Oh, GeoLocation Functionality isn't supported by your browser."};
    }
};
};
