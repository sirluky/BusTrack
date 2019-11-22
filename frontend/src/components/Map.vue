<template>
  <div id="mapid" ref="map"></div>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import { URL } from "@/config.js";
let locationUpdate;
let markers = [];
// let currentLocation;
let mymap;

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

    mymap = L.map("mapid").setView([49.828786, 15.528162], 7);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 32,
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
          for (let { lat, lng, bus_id } of this.response) {
            //   console.log(this.response);
            //   console.log("BUS ID " + this.response[i].bus_id);
            //   console.log("LAT " + this.response[i].lat);
            //   console.log("lng " + this.response[i].lng);
            // console.log(lat, lng);
            let marker = markers.find(v => v.bus_id === bus_id);
            if (marker) {
              marker.setLatLng([lat, lng]).update();
              marker.bindPopup(`<b>BUS1</b><br>Info placeholder`).update();
            } else {
              let marker = L.marker([lat, lng]).addTo(mymap);
              marker
                .bindPopup(`<b>BUS ${this.bus_id}</b><br>Info placeholder`)
                .openPopup();
              marker.bus_id = bus_id;
              markers.push(marker);
            }
          }
          //   mymap.setView([this.response[0].lat, this.response[0].lng], 5);
        }
      });

      //   marker1.setLatLng([lat, lng]).update();
      //   marker1.bindPopup(`<b>BUS1</b><br>placeholder ${this.response}`).update();
    }, 3000);
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
</style>
