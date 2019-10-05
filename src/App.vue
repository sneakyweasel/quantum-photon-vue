<template>
  <div id="app">
    <photon-component name="Horizontal" :are="1" :k="20" :sigma="0.2" />
    <photon-component name="Vertical" :bre="1" :k="20" :sigma="0.2" />
    <photon-component name="Diagonal" :are="1 / Math.sqrt(2)" :bre="1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
    <photon-component name="Antidiagonal" :are="1 / Math.sqrt(2)" :bre="-1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
    <photon-component name="circularCW" :are="1 / Math.sqrt(2)" :bim="1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
    <photon-component name="circularCCW" :are="1 / Math.sqrt(2)" :bim="-1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PhotonComponent from "./components/Photon.vue";

export default Vue.extend({
  name: "app",
  components: {
    PhotonComponent
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  background-color: black;
}
</style>
