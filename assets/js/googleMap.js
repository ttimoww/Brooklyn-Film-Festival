function initMap(){
  var brooklynBridgePark = {lat: 40.695710, lng: -74.004060};
  var map = new google.maps.Map(document.getElementById('googleMap'), {
          center: brooklynBridgePark,
          zoom: 7
        });
  var marker = new google.maps.Marker({
          map: map,
          position: brooklynBridgePark,
          title: 'Brooklyn Bridge Park!'
        });
}

initMap();
