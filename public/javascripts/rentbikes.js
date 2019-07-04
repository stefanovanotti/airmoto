// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     console.log("IronGenerator JS imported successfully!");
//   },
//   false
// );

var geocoder;
var map;

function getBikesCites() {
  axios
    .get("http://localhost:3000/allBikes/api")
    .then(dbRes => {
      const citiesArray = [];
      const coordinates = [];
      // dbRes.data.forEach(oneBike => {
      //   citiesArray.push(oneBike.location);
      // });
      console.log(citiesArray);

      dbRes.data.forEach(element => {
        console.log(element);
        geocoder.geocode({ address: element.location }, function(
          results,
          status
        ) {
          console.log(results);
          //coordinates.push(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: results[0].geometry.location,
            title: element.location
          });
          marker.addListener("click", function() {
            window.location = `/rentbike/${element._id}`;
          });
        });
      });
      // console.log(coordinates);
      // console.log(coordinates);
      // coordinates.forEach(citycoord => {
      //   console.log(citycoord);
      //   console.log("hey ya");
      //   // var marker = new google.maps.Marker({
      //   //   map: map,
      //   //   position: citycoord
      //   // });
      // });
    })
    .catch(dbErr => console.log(dbErr));
}

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(45.46427, 9.18951);
  var mapOptions = {
    zoom: 8,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

initialize();
getBikesCites();

// function codeAddress(e) {
//   e.preventDefault();
//   console.log("hey");
//   var address = document.getElementById("address").value;
//   geocoder.geocode({ address: address }, function(results, status) {
//     console.log(results[0].geometry.location);

//     // if (status == "OK") {
//     //   map.setCenter(results[0].geometry.location);
//     //   var marker = new google.maps.Marker({
//     //     map: map,
//     //     position: results[0].geometry.location
//     //   });
//     //   console.log(marker);
//     // } else {
//     //   alert("Geocode was not successful for the following reason: " + status);
//     // }
//   });
// }
