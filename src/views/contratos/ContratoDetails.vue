<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
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
                {{ contrato.finishDate }}
              </li>
              <li class="list-group-item">
                <strong>Cantidad de Policías:</strong> {{ contrato.cantPolice }}
              </li>
              <li class="list-group-item">
                <strong>Institución:</strong> {{ contrato.institution.name }}
              </li>
              <li class="list-group-item">
                <strong>Estado del Contrato:</strong>
                {{ contrato.stateContrato.name }}
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-warning">
              <i class="fas fa-edit"></i> Editar
            </button>
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
      contrato: { institution: { name: "" }, stateContrato: { name: "" } },
    };
  },
  async created() {
    await this.getContrato();
  },
  methods: {
    async getContrato() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/api/v1/contratos/${this.$route.params.id}`
        );
        this.contrato = response.data;
      } catch (error) {
        console.error("Error fetching contrato:", error);
      }
    },
  },
};
</script>



<style>
</style>