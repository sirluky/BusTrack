<template>
  <div>
    <h1>Current location of buses</h1>
    <div class="rounded" id="mapid" ref="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import { URL } from "@/config.js";
let locationUpdate;
let markers = [];
let circles = [];
// let currentLocation;
let mymap;
let color;
let fill;

const busIcon = L.icon({
  iconUrl: "/img/busIcon.png",
  iconSize: [16, 19],
  iconAnchor: [8, 0]
});

// navigator.geolocation.getCurrentPosition(function(position) {
//   //   return { lat: position.coords.latitude, lng: position.coords.longitude };
//   currentLocation = [position.coords.latitude, position.coords.longitude];
//   console.log(currentLocation);
// });
//   ? navigator.geolocation.getCurrentPosition(showPosition)
//   : {};

export default {
  //props: ["data"],
  mounted() {
    // this.$refs.map;
    //console.log(Leaflet);

    // if (currentLocation === undefined) {
    //   mymap = L.map("mapid").setView([49.828786, 15.528162], 7);
    // } else mymap = L.map("mapid").setView(currentLocation, 10);

    mymap = L.map("mapid").setView([49.19176, 16.605804], 12);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 16,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1Ijoiam9oYW5vdmVjIiwiYSI6ImNrM2E1eDM3ZzA5NmozbXFqNjIxMDVzbHYifQ.EwjFFC1Wdg9dLxODo-Zhpw"
      }
    ).addTo(mymap);

    // marker1 = L.marker([lat, lng], { title: "test" }).addTo(mymap);
    // marker1.bindPopup(`<b>BUS1</b><br>placeholder ${this.response}`);

    locationUpdate = setInterval(() => {
      axios.get(URL + "/location/all").then(v => {
        this.response = v.data;
        if (this.response != undefined) {
          for (let { lat, lng, bus, temperature, co2 } of this.response) {
            //   console.log(this.response);
            //   console.log("BUS ID " + this.response[i].bus.id);
            //   console.log("LAT " + this.response[i].lat);
            //   console.log("lng " + this.response[i].lng);
            // console.log(lat, lng);
            let marker = markers.find(v => v.busid === bus.id);
            if (marker) {
              marker.setLatLng([lat, lng]).update();
              marker
                .bindPopup(
                  `<h3 class="h5 font-weight-bold">BUS ${bus.label}</h3><b>Temperature:</b> ${temperature}°C<br><b>CO2:</b>  ${co2}ppm`
                )
                .update();

              if (co2 < 1000) {
                color = "green";
                fill = "#8aff8a";
              } else if (1000 <= co2 <= 5000) {
                color = "yellow";
                fill = "##f5ff52";
              } else if (co2 > 5000) {
                color = "red";
                fill = "##ff6363";
              }

              let circle = L.circle([lat, lng], {
                color: color,
                fillcolor: fill,
                opacity: 0.1,
                radius: 150
              }).addTo(mymap);

              circle.bindPopup(
                `<h3 class="h5 font-weight-bold">CO2:</h3> ${co2}`
              );

              circles.push(circle);
            } else {
              let marker = L.marker([lat, lng], { icon: busIcon }).addTo(mymap);
              marker
                .bindPopup(
                  `<h3 class="h5 font-weight-bold">BUS ${bus.label}</h3><b>Temperature:</b> ${temperature}°C<br><b>CO2:</b> ${co2}ppm`
                )
                .openPopup();
              marker.busid = bus.id;
              markers.push(marker);

              if (co2 < 1000) {
                color = "green";
                fill = "#8aff8a";
              } else if (1000 <= co2 <= 5000) {
                color = "yellow";
                fill = "##f5ff52";
              } else if (co2 > 5000) {
                color = "red";
                fill = "##ff6363";
              }

              let circle = L.circle([lat, lng], {
                color: color,
                fillcolor: fill,
                opacity: 0.1,
                radius: 150
              }).addTo(mymap);

              circle.bindPopup(
                `<h3 class="h5 font-weight-bold">CO2:</h3> ${co2}`
              );
              circles.push(circle);

              if (circles.length > 3) {
                mymap.removeLayer(circles[0]);
                circles.splice(0, 1);
              }
            }
          }
          //   mymap.setView([this.response[0].lat, this.response[0].lng], 5);
        }
      });
      //   marker1.setLatLng([lat, lng]).update();
      //   marker1.bindPopup(`<b>BUS1</b><br>placeholder ${this.response}`).update();
    }, 5000);
  },

  beforeDestroy() {
    clearInterval(locationUpdate);
  }
};
</script>

<style>
#mapid {
  height: 600px;
  width: 60%;
  display: inline-block;
}

h3 {
  margin: 0;
}
</style>
