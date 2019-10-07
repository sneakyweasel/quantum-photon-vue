<template>
  <div id="app">
    <!-- <photon-component name="Horizontal" :are="1" :k="20" :sigma="0.2" :width="600" :height="600" />
    <photon-component name="Vertical" :bre="1" :k="20" :sigma="0.2" />
    <photon-component name="Diagonal" :are="1 / Math.sqrt(2)" :bre="1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
    <photon-component name="Antidiagonal" :are="1 / Math.sqrt(2)" :bre="-1 / Math.sqrt(2)" :k="20" :sigma="0.2" />
    <photon-component name="circularCW" :are="1 / Math.sqrt(2)" :bim="1 / Math.sqrt(2)" :k="20" :sigma="0.2" />-->
    <photon-component
      name="circularCCW"
      :are="1 / Math.sqrt(2)"
      :aim="0"
      :bre="0"
      :bim="-1 / Math.sqrt(2)"
      :k="this.k"
      :sigma="this.sigma"
      :height="this.height"
      :width="this.width"
      :range="this.range"
      :displayElectric="this.displayElectric"
      :displayMagnetic="this.displayMagnetic"
      :displayGaussian="this.displayGaussian"
    />
    <photon-component
      name="circularCCW"
      :are="-1 / Math.sqrt(2)"
      :aim="0"
      :bre="0"
      :bim="1 / Math.sqrt(2)"
      :k="this.k"
      :sigma="this.sigma"
      :height="this.height"
      :width="this.width"
      :range="this.range"
      :displayElectric="this.displayElectric"
      :displayMagnetic="this.displayMagnetic"
      :displayGaussian="this.displayGaussian"
    />

    <div id="inputs">
      <h3>Inputs</h3>
      <div>
        <label for="electric">Electric</label>
        <input type="checkbox" id="electric" v-model="displayElectric" />
      </div>
      <div>
        <label for="magnetic">Magnetic</label>
        <input type="checkbox" id="magnetic" v-model="displayMagnetic" />
      </div>
      <div>
        <label for="magnetic">Gaussian</label>
        <input type="checkbox" id="gaussian" v-model="displayGaussian" />
      </div>
      <div>
        <label for="width">Width</label>
        <input id="width" v-model.number="width" type="number" />
      </div>
      <div>
        <label for="height">Height</label>
        <input id="height" v-model.number="height" type="number" />
      </div>
      <div>
        <label for="range">Range</label>
        <input id="range" v-model.number="range" type="number" />
      </div>
      <div>
        <label for="k">K</label>
        <input id="k" v-model.number="k" type="number" />
      </div>
      <div>
        <label for="sigma">Sigma</label>
        <input id="sigma" v-model.number="sigma" type="number" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PhotonComponent from "./components/Photon.vue";

export default Vue.extend({
  name: "app",

  components: {
    PhotonComponent
  },

  data: () => {
    return {
      displayElectric: true,
      displayMagnetic: true,
      displayGaussian: true,
      width: 600,
      height: 300,
      range: 0.001,
      k: 20,
      sigma: 0.3
    };
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
#inputs {
  padding-top: 10px;
  padding-bottom: 30px;
  background-color: #111;
}
</style>
