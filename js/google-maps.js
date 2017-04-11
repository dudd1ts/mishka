function initMap() {
  var myLatLng = {lat: 59.9387942, lng: 30.3230833};

  var map = new google.maps.Map(document.querySelector(".contacts__map"), {
    zoom: 16,
    center: myLatLng
  });

  var image = {
    url: "img/icon-map-pin.svg",
    scaledSize: new google.maps.Size(66, 100)
};
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    optimized: false,
    icon: image
  });
}
