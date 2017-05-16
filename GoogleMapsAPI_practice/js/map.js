var nowMarker;
var opts;
var nowMap;
var watchID;

function initMap() {
    /*
      if (isUserAgentPortable()) {
          $("#now_map").width(100%);
          $("#now_map").height(100%);
          $("#access_map").width(100%);
          $("#access_map").height(100%);
      }
    */

    opts = {
        zoom: 15,
        center: new google.maps.LatLng(35.709984, 139.810703)
    };
    var accessMap = new google.maps.Map(document.getElementById("access_map"), opts);

    opts.zoom = 15;
    accessMap.setOptions(opts);

/*
    var latlng = new google.maps.LatLng(35.539001, 134.228468);
    var marker2 = new google.maps.Marker({
        position: latlng,
        map: nowMap
    });
*/
    if (navigator.geolocation) {
        var positionOptions = {
            "enableHighAccuracy": false,
            "timeout": 8000,
            "maximumAge": 5000,
        }
        watchID = navigator.geolocation.watchPosition(successFunc, errorFunc, positionOptions);
    }

}

function isUserAgentPortable() {
    var useragent = navigator.userAgent;
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        return true;
    }
    return false;
}

function successFunc(position) {
    opts = {
        zoom: 15,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    };
    nowMap = new google.maps.Map(document.getElementById("now_map"), opts);

    nowMarker = new google.maps.Marker({
        clickable: true,
        draggable: true,
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: nowMap,
    });
    alert(position.coords.latitude);
    alert(position.coords.longitude);
    navigator.geolocation.clearWatch(watchID);
}

function errorFunc(error) {
    alert("ERROR");
}
