function initMap() {
  var map = new google.maps.Map(document.querySelector(".contacts__map"), {
    zoom: 16,
    center: {lat: 59.9387942, lng: 30.3230833}
  });

  var image = 'img/icon-map-pin.svg';
  var beachMarker = new google.maps.Marker({
    position: {lat: 59.9387942, lng: 30.3230833},
    map: map,
    icon: image
  });
}
