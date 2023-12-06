<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header text-bg-dark">
        <h2 class="card-title">Seguimientos</h2>
      </div>
      <div class="card-body table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Institución</th>
              <th scope="col">Número de contrato</th>
              <th scope="col">Vigencia del Contrato</th>
              <th scope="col">Número de Policías</th>
              <th scope="col">Situación Actual del Contrato</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contrato, index) in contratos" :key="contrato.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ contrato.institution.name }}</td>
              <td>{{ contrato.number }}</td>
              <td>
                {{ fechaFormateada(contrato.startDate) }} a
                {{ fechaFormateada(contrato.finishDate) }}
              </td>
              <td>{{ contrato.cantPolice }}</td>
              <td>{{ contrato.stateContrato.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <section class="card">
      <div class="card-body">
        <div class="mb-4">
          <label class="fw-bold">Cantidad total de Policias:</label>
          <span class="m-4 px-2 card-text border">{{ totalPolice }}</span>
        </div>
        <div>
          <label class="fw-bold">Cantidad total de Instituciones:</label>
          <span class="m-4 px-2 card-text border">{{ totalInstitutions }}</span>
        </div>
      </div>
    </section>
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
  computed: {
    totalPolice() {
      return this.contratos.reduce(
        (suma, contrato) => suma + contrato.cantPolice,
        0
      );
    },
    totalInstitutions() {
      return this.contratos.length;
    },
  },
  methods: {
    getContratos() {
      this.axios
        .get("/contratos")
        .then((response) => {
          this.contratos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //para formatear la fecha
    fechaFormateada(fechaISO) {
      const fechaObj = new Date(fechaISO);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return fechaObj.toLocaleDateString("es-ES", options);
    },
  },
};
</script>

<style>
</style>