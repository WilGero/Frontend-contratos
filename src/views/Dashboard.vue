<template>
  <div class="container">
    <h2 class="text-center mt-2" v-if="auth">
      Bienvenido Usuario {{ auth.user.username }}
    </h2>
    <h3 class="card-title p-2 text-center text-warning bg-success mb-4">
      Contratos próximos a finalizar
    </h3>
    <div class="d-flex flex-wrap justify-content-between">
      <div v-for="item in contratosProximosFinalizar" :key="item.id">
        <div class="card mb-4">
          <div class="card-header text-bg-dark">
            <h3 class="card-title">Número de contrato: {{ item.number }}</h3>
          </div>
          <div class="card-body text-bg-light">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                >Institución:</span
              >
              <input
                v-model="item.institution.name"
                type="text"
                class="form-control"
                aria-describedby="basic-addon1"
                disabled
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                >Cantidad de Policias:</span
              >
              <input
                v-model="item.cantPolice"
                type="number"
                class="form-control"
                aria-describedby="basic-addon1"
                disabled
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                >Fecha de finalización:</span
              >
              <input
                v-model="item.finishDate"
                type="text"
                class="form-control"
                aria-describedby="basic-addon1"
                disabled
              />
            </div>
            <div class="text-center">
              <p class="cursiva-y-movimiento">
                Días restantes: {{ item.difDias }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      contratos: [],
      contratosProximosFinalizar: [],
    };
  },
  created() {
    this.getContratos();
  },
  computed: {
    ...mapState(["auth"]),
    contratosProximosFinalizar() {
      const fechaActual = moment();
      const contratosProximos = [];

      // Itera sobre el array de objetos y verifica cada fecha de vencimiento
      this.contratos.forEach((item) => {
        const fechaFinalizacion = moment(item.finishDate);
        // Agrega el contrato al array si la diferencia es menor o igual a 30 días
        if (
          this.calcularDiferenciaEnDias(fechaActual, fechaFinalizacion) <= 30
        ) {
          let difDias = this.calcularDiferenciaEnDias(
            fechaActual,
            fechaFinalizacion
          );
          item.difDias = difDias;
          contratosProximos.push(item);
        }
      });

      contratosProximos.forEach((contrato) => {
        contrato.finishDate = this.formatearFecha(contrato.finishDate);
      });
      console.log(contratosProximos);
      return contratosProximos;
    },
  },
  methods: {
    getContratos() {
      this.axios
        .get("/contratos")
        .then((response) => {
          this.contratos = response.data;
          console.log(this.contratos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calcularDiferenciaEnDias(fechaInicio, fechaFin) {
      return fechaFin.diff(fechaInicio, "days");
    },
    formatearFecha(fecha) {
      const fechaFormateada = moment(fecha).format("DD/MM/YYYY");
      return fechaFormateada;
    },
  },
};
</script>

<style scoped>
.cursiva-y-movimiento {
  font-style: italic;
  animation: mover 2s infinite alternate;
}

@keyframes mover {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(10px); /* O la cantidad de movimiento que desees */
  }
}
</style>