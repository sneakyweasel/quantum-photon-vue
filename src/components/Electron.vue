
<template>
  <svg class="electron" :width="width + 2 * margin" :height="height + 2 * margin">
    <text v-once class="text" :x="this.width / 2" :y="this.height + 35">Spin {{ name }}</text>
    
    <g class="arrow" v-if="displayArrow">
      <!-- <circle
        v-for="(z, index) in zs"
        :key="`spiral-${index}`"
        class="point spiral"
        :cx="xScale(z)"
        :cy="yScale(z)"
        :r="sScale(z)"
        :style="{fill: eColor(z)}"
      /> -->
      <circle
        class="point arrow"
        :cx="xScale(cartesian.x)"
        :cy="yScale(cartesian.y)"
        :r="sScale(cartesian.z)"
        :style="{fill: eColor(z)}"
      />
    </g>

    <g class="sphere" v-if="displaySphere">
      <circle
        :cx="width / 2"
        :cy="height / 2"
        :r="minDim"
        :style="{fill: 'rgba(92, 0, 212, 0.3)'}"
      />
    </g>

    <g class="spiral" v-if="displaySpiral">
      <circle
        v-for="(z, index) in zs"
        :key="`spiral-${index}`"
        class="point spiral"
        :cx="xScale(z)"
        :cy="yScale(spiral(z))"
        :r="sScale(spiral(z))"
        :style="{fill: eColor(spiral(z))}"
      />
    </g>

  </svg>
</template>

<script lang="ts">
import { select } from "d3-selection";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateViridis, interpolateInferno } from "d3-scale-chromatic";
import { range } from "d3-array";
const d3 = {
  scaleLinear,
  scaleSequential,
  select,
  range,
  interpolateInferno,
  interpolateViridis
};

export default {
  name: "Electron",

  props: {
    name: { type: String, default: "" },
    theta: { type: Number, default: 0},
    phi: { type: Number, default: 0},
    width: { type: Number, default: 300 },
    height: { type: Number, default: 200 },
    margin: { type: Number, default: 20 },
    range: { type: Number, default: 0.001 },
    displaySphere: { type: Boolean, default: true },
    displaySpiral: { type: Boolean, default: true },
    displayArrow: { type: Boolean, default: true }
  },

  data() {
    return {
      xScale: d3
        .scaleLinear()
        .domain([-1, 1])
        .range([this.margin, this.width - this.margin]),
      yScale: d3
        .scaleLinear()
        .domain([-1, 1])
        .range([this.margin, this.height - this.margin]),
      sScale: d3
        .scaleLinear()
        .domain([-1, 1])
        .range([2, 10]),
      eColor: d3.scaleSequential(d3.interpolateInferno).domain([-1, 1]),
      mColor: d3.scaleSequential(d3.interpolateViridis).domain([-1, 1])
    };
  },

  computed: {
    zs(): number[] {
      return d3.range(-1, 1, this.range);
    },
    minDim(): number {
        return Math.min(this.height, this.width) / 2;
    },
    cartesian(): {x: number, y: number, z: number} {
        const coord = this.polarToCartesian(this.phi, this.theta);
        console.log(`From polar [phi: ${this.phi}, theta: ${this.theta}] to cartesian [${JSON.stringify(coord)}]`);
        return coord;
    }
  },

  methods: {
    cartesianToPolar(x: number, y: number, z: number): number[] {
      const RAD2DEG = 180 / Math.PI;
      const lon = Math.atan2(x, -z) * RAD2DEG;
      const length = Math.sqrt(x * x + z * z);
      const lat = Math.atan2(y, length) * RAD2DEG;
      return [lon, lat];
    },
    polarToCartesian(lon: number, lat: number): {x: number, y: number, z: number} {
      const DEG2RAD = Math.PI / 180;
      const phi = (90 - lat) * DEG2RAD;
      const theta = (lon + 180) * DEG2RAD;
      return {
        x: -(Math.sin(phi) * Math.sin(theta)),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.cos(theta)
      };
    },
    spiral(z: number): {x: number, y: number, z: number} {
        return {
            x: Math.cos(z),
            y: Math.sin(z),
            z: z
        }
    }
  }
};
</script>

<style lang="scss">
.electron {
//   background-color: black;
  background-color: purple;
  padding: 20px;
  .text {
    fill: lightgrey;
    stroke: lightgrey;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    text-anchor: middle;
  }
  .point {
    stroke-width: 3px;
    .sphere {
      stroke-width: 3px;
    }
    .spiral {
      stroke-width: 2px;
    }
    .arrow {
      stroke-width: 1px;
    }
  }
}
</style>
