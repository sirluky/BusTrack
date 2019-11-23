<template>
  <div class="home">
    <div class="container p-4">
      <table class="w-100">
        <tr>
          <th></th>
          <th>Bus Name</th>
          <th>CO2</th>
          <th>Temperature</th>
        </tr>
        <tr v-for="bus in buses" :key="bus.id">
          <td>
            <img src="/img/busIconWhite.png" alt />
          </td>
          <td>{{ bus.bus.name }}</td>

          <td>{{ bus.co2 }}</td>
          <td>
            <!-- bus.temperature || -->
            {{
            Math.floor((Math.random() * 10 + 20) * 100) / 100
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import _ from "lodash";

export default {
  name: "home",
  components: {},
  computed: {
    buses() {
      let buses = this.$store.state.buses;
      buses = buses.map(b => ({ ...b, busid: b.bus.id }));
      // console.log();
      // buses = _.sortBy(_.sortBy(buses, "createDate").reverse(), "busid");
      // buses.reduce((v, p = []) => {
      //   if (v.busid !== p[p.length - 1].busid) {
      //     p.push(v);
      //   }
      //   return p;
      // });
      // console.log(buses);

      return buses;
    }
  }
};
</script>
