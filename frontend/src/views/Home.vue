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
          <td><img src="/img/busIconWhite.png" alt="" /></td>
          <td>{{ bus.bus.name }}</td>

          <td>
            {{ bus.co2 }}
          </td>
          <td>
            {{
              bus.temperature ||
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

export default {
  name: "home",
  components: {},
  computed: {
    buses() {
      return this.$store.state.buses;
    }
  }
};
</script>
