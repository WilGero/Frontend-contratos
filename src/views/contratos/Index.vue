<template>
  <div class="container mt-5">
    <h2 class="mb-4">Contratos</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Número de Contrato</th>
            <th>Nombre de la Institución</th>
            <th>Estado del Contrato</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contrato, index) in contratos" :key="contrato.id">
            <th scope="row">{{ index+1}}</th>
            <td>{{ contrato.number }}</td>
            <td>{{ contrato.institution.name }}</td>
            <td>{{ contrato.stateContrato.name }}</td>
            <td>
              <router-link
                :to="{ name: 'contratoDetails',params:{id:contrato.id} }"
                class="btn btn-secondary btn-detalle"
                data-toggle="collapse"
                data-target="#detalleContrato1"
                aria-expanded="false"
                aria-controls="detalleContrato1"
              >
                <i class="fas fa-info-circle"></i> Ver Detalles
              </router-link>
            </td>
          </tr>
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contratos: [],
    };
  },
  created() {
    this.getContratos();
  },
  methods: {
    getContratos() {
      this.axios
        .get("http://localhost:3000/api/v1/contratos")
        .then((response) => {
          this.contratos = response.data;
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