<template>
  <div class="container bg-white">
    <p v-if="lat == 0">Click somewhere in the map</p>
    <p v-else>{{lat + "N"}}, {{lng+"E"}}</p>
    <div class="rounded" id="mapid" ref="map"></div>

    <h1>Graf</h1>
    <canvas ref="myChart" width="200" height="100"></canvas>
  </div>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import Chart from "chart.js";
import { URL } from "@/config.js";

export default {
  data() {
    return {
      gps: [0, 0, 0, 0, 0, 0],
      lat: 49,
      lng: 16
    };
  },
  mounted() {
    const mymap = L.map("mapid").setView([49.19176, 16.605804], 12);

    // let marker = L.marker([lat, lng], { icon: "/img/busIcon.png" }).addTo(
    //   mymap
    // );

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

    setTimeout(() => {
      // for (let b of this.$store.state.buses) {
      //   L.circle([b.lan, b.lng], {
      //     color: "blue",
      //     fillcolor: "blue",
      //     opacity: 0.1,
      //     radius: 150
      //   }).addTo(mymap);
      //   // console.log(b);
      // }
    }, 5000);

    var ctx = this.$refs.myChart.getContext("2d");
    const graf = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["", "", "", "", "", ""],
        datasets: [
          {
            label: "Vyvoj ovzdusi v dane lokaci",
            data: [this.gps],

            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    // graf.data.labels = [
    //   "Red",
    //   "Blue",
    //   "Yellow",
    //   "Green",
    //   "Purple",
    //   "Orange",
    //   "Pink"
    // ];
    graf.data.labels = this.gps.map(() => 0);
    graf.data.datasets[0].data = this.gps;
    graf.update();
  },
  watch: {
    lat() {
      axios.post(URL + "/location/", { lat: 49, lng: 16 }).then(v => {
        // this.response = v.data;
        this.gps = v;
      });
    }
  }
};
</script>

<style>
.container p {
  padding: 2rem;
  font-size: 2rem;
  color: black;
}
</style>
