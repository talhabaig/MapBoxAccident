<template>
  <div style="display: flex; width: 99vw">
    <div style="height: 96vh; width: 70%">
       <mapbox-map
        accessToken="pk.eyJ1IjoidGFsaGFiYWlnIiwiYSI6ImNsODNodGMzNjAxenozcHA4ZDlxeGZvZHQifQ.RV8XczBNnZV4Nfs3BY1YHQ"
        :flyToOptions="{ maxDuration: 2000, speed: 1.2 }"
        :center="[-76.5036932,39.2772628]"
        zoom="6" 
      >
        <mapbox-marker
          :lngLat="[d.longitude, d.latitude]"
          v-for="(d, i) in filterdata"
          :key="i"
        >
          <mapbox-popup style="text-align: start">
            <span style="text-align: start; border-radius: 10px solid">
              Date:{{ d.acc_date.toString().substring(4, 6) }}/{{
                d.acc_date.toString().substring(6, 9)
              }}/ {{ d.acc_date.toString().substring(0, 4) }} Hour:{{
                d.acc_time
              }}
              <br />
              Collision Type: {{ d.collision_type_desc }} <br />
              Report Type: {{ d.report_type }} <br />
              Light Description: {{ d.light_desc }}
            </span>
          </mapbox-popup>
        </mapbox-marker></mapbox-map
      >
    </div>
    <div
      style="
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        background: #e6f9ff;
        text-align: start;
        padding: 3rem;
        box-sizing: border-box;
      "
    >
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div>Total Crashes : {{ this.filterdata.length }}</div>
        <label for="">Year</label>
        <select v-model="year" @change="Filter">
          <option value="">No Filter</option>
          <option :value="y" :key="i" v-for="(y, i) in years">{{ y }}</option>
        </select>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <label for="">Type of Collision</label>
        <select v-model="collision" @change="Filter">
          <option value="">No Filter</option>
          <option :value="c" :key="i" v-for="(c, i) in collision_type_desc">
            {{ c }}
          </option>
        </select>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <label for="">Type of Report</label>
        <select v-model="report" @change="Filter">
          <option value="">No Filter</option>
          <option :value="r" :key="i" v-for="(r, i) in report_type_desc">
            {{ r }}
          </option>
        </select>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <label for="">Light Description</label>
        <select v-model="report" @change="Filter">
          <option value="">No Filter</option>
          <option :value="l" :key="i" v-for="(l, i) in light_desc">
            {{ l }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import { MapboxMap } from "vue-mapbox-ts";

export default defineComponent({
  name: "HelloWorld",

  data() {
    return {
      data: [] as Array<any>,
      filterdata: [] as Array<any>,
      years: [] as Array<any>,
      collision_type_desc: [] as Array<any>,
      report_type_desc: [] as Array<any>,
      light_desc: [] as Array<any>,
      year: "",
      collision: "",
      report: "",
      light: "",
    };
  },
  components: {
    MapboxMap,
  },
  async mounted() {
    var res = await axios.get(
      "https://opendata.maryland.gov/resource/65du-s3qu.json"
    );
    this.data = res.data;
    this.filterdata = this.data;
    res.data.forEach((x: any) => {
      if (!this.years.includes(x.year) && x.year != undefined) {
        this.years.push(x.year);
      }
      if (
        !this.collision_type_desc.includes(x.collision_type_desc) &&
        x.collision_type_desc != undefined
      ) {
        this.collision_type_desc.push(x.collision_type_desc);
      }
      if (
        !this.report_type_desc.includes(x.report_type) &&
        x.report_type != undefined
      ) {
        this.report_type_desc.push(x.report_type);
      }
      if (
        !this.light_desc.includes(x.light_desc) &&
        x.light_desc != undefined
      ) {
        this.light_desc.push(x.light_desc);
      }
    });
  },
  methods: {
    Filter() {
      this.filterdata = this.data;
      if (this.year != "") {
        this.filterdata = this.data.filter((x) => {
          if (x.year == this.year) {
            return x;
          }
        });
      }
      if (this.collision != "") {
        this.filterdata = this.filterdata.filter((x) => {
          if (x.collision_type_desc == this.collision) {
            return x;
          }
        });
      }
      if (this.report != "") {
        this.filterdata = this.filterdata.filter((x) => {
          if (x.report_type == this.report) {
            return x;
          }
        });
      }
      if (this.light != "") {
        this.filterdata = this.filterdata.filter((x) => {
          if (x.light_desc == this.light) {
            return x;
          }
        });
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
