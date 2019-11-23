<template>
  <div id="app" class="bg-secondary text-white">
    <div id="nav d-flex flex-row " class="p-3 mb-2 bg-primary text-white">
      <p class="h2 font-weight-bold">BUS TRACKER</p>
      <router-link to="/">
        <button type="button" class="btn btn-secondary mr-2 ml-2">Home</button>
      </router-link>
      <router-link to="/map">
        <button type="button" class="btn btn-secondary mr-2 ml-2">Map</button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { URL } from "@/config.js";
import axios from "axios";

export default {
  mounted() {
    setInterval(() => {
      axios.get(URL + "/location/all").then(v => {
        this.$store.commit("updatebuses", v.data);
      });
    }, 3000);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 800px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  margin: 0;
}
</style>
