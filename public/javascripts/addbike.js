const geocoder = new google.maps.Geocoder();
// const map = new google.maps.Map(document.getElementById("map"), mapOptions);

// var mapOptions = {
//   zoom: 8,
//   center: latlng
// };

// map = new google.maps.Map(document.getElementById("map"), mapOptions);
// console.log(geocoder);

function codeAddress(e) {
  e.preventDefault();
  console.log("hey");
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    console.log(results[0].geometry.location);

    // if (status == "OK") {
    //   map.setCenter(results[0].geometry.location);
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     position: results[0].geometry.location
    //   });
    //   console.log(marker);
    // } else {
    //   alert("Geocode was not successful for the following reason: " + status);
    // }
  });
}

console.log(document.getElementById("clickman"));
document.getElementById("clickman").onclick = codeAddress;
