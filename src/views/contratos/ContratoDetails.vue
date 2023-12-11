<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6 m-auto">
        <div class="card shadow">
          <div class="card-header bg-dark text-white">
            <h5 class="card-title">Contrato - {{ contrato.number }}</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>Fecha de Inicio:</strong> {{ contrato.startDate }}
              </li>
              <li class="list-group-item">
                <strong>Fecha de Finalización:</strong>
                {{  contrato.finishDate }}
              </li>
              <li class="list-group-item">
                <strong>Cantidad de Policías:</strong> {{ contrato.cantPolice }}
              </li>
              <li class="list-group-item">
                <strong>Institución:</strong>
                {{ contrato.institution.name}}
              </li>
              <li class="list-group-item">
                <strong>Estado del Contrato:</strong>
                {{ contrato.stateContrato.name }}
              </li>
            </ul>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button @click="atras" type="button" class="btn btn-secondary">
              <i class="fas fa-arrow-left"></i> Atrás
            </button>
            <button @click="editar" type="button" class="btn btn-warning">
              <i class="fas fa-edit"></i> Editar
            </button>
          </div>
        </div>
      </div>
      <div v-if="active" class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="card-title">Editar Contrato</h2>
            <div class="my-auto">
              <a @click="cancelar" class="btn btn-danger"
                ><i class="fas fa-times"></i
              ></a>
            </div>
          </div>
          <div class="card-body text-bg-light p-4">
            <form class="row" @submit.prevent="updateContrato">
              <div class="col-md-6 mb-3">
                <label for="numeroContrato" class="form-label"
                  >Número de Contrato</label
                >
                <input
                  v-model="contrato.number"
                  type="text"
                  class="form-control"
                  id="numeroContrato"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="fechaInicio" class="form-label"
                  >Fecha de Inicio</label
                >
                <input
                  v-model="contrato.startDate"
                  type="date"
                  class="form-control"
                  id="fechaInicio"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="fechaFinalizacion" class="form-label"
                  >Fecha de Finalización</label
                >
                <input
                  v-model="contrato.finishDate"
                  type="date"
                  class="form-control"
                  id="fechaFinalizacion"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="cantidadPolicias" class="form-label"
                  >Cantidad de Policías</label
                >
                <input
                  v-model="contrato.cantPolice"
                  type="number"
                  class="form-control"
                  id="cantidadPolicias"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="estadoContrato" class="form-label"
                  >Estado del Contrato</label
                >
                <select
                  class="form-select"
                  v-model="contrato.stateContratoId"
                  id="estadoContrato"
                  required
                >
                  <option value="" selected disabled>
                    Selecciona un estado
                  </option>
                  <option
                    v-for="stateContrato in stateContratos"
                    :key="'stateContrato-' + stateContrato.id"
                    :value="stateContrato.id"
                  >
                    {{ stateContrato.name }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success">
                  <i class="fas fa-save"></i> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      contrato: {
        stateContrato:'',
        institutionId: "",
        institution: { name: '' },
        stateContrato: { name: '' },
      },
      institutions: [],
      stateContratos: [{ name: "" }],
    };
  },
  async created() {
    await Promise.all([this.getContrato(), this.getStateContratos()]);
  },
  methods: {
    fechaFormateada(fecha) {
      const fechaObj = new Date(fecha);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return fechaObj.toLocaleDateString("es-ES", options);
    },
    editar() {
      this.active = true;
    },
    cancelar() {
      this.active = false;
    },
    atras() {
      this.$router.push({
        name: "contratos",
      });
    },
    async getContrato() {
      try {
        this.contrato = (
          await this.axios.get(`/contratos/${this.$route.params.id}`)
        ).data;
      } catch (error) {
        console.error("Error fetching contrato:", error);
      }
    },
    async getStateContratos() {
      try {
        const response = await this.axios.get("/state-contratos");
        this.stateContratos = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    updateContrato() {
      console.log(this.contrato);
      const propiedadesAEliminar = [
        "id",
        "institution",
        "stateContrato",
        "institutionId",
        "files",
        "createdAt",
      ];

      propiedadesAEliminar.forEach((propiedad) => {
        if (this.contrato.hasOwnProperty(propiedad)) {
          delete this.contrato[propiedad];
        }
      });

      console.log(this.contrato);

      this.axios
        .patch(`/contratos/${this.$route.params.id}`, this.contrato)
        .then((response) => {
          this.contrato = response.data;
          this.active = false;
          this.getContrato();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>



<style>
</style>