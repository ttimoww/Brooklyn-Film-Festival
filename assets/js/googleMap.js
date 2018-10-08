function initMap(){
  var brooklynBridgePark = {lat: 40.697880, lng: -73.997841};
  var map = new google.maps.Map(document.getElementById('googleMap'), {
          center: brooklynBridgePark,
          zoom: 15
        });
  var marker = new google.maps.Marker({
          map: map,
          position: brooklynBridgePark,
          title: 'Brooklyn Bridge Park!'
        });
}

initMap();
