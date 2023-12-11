<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card border border-dark">
        <div class="card-header text-bg-dark"></div>
        <div class="card-body">
            <!-- <Bar :chart-options="chartOptions" :chart-data="charData"></Bar> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  components: { Bar },
};
</script>

<style>
</style>