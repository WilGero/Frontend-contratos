<template>
  <div class="container mt-5">
    <h2>Instituciones</h2>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">NIT</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Datos de ejemplo, reemplázalos con tus propios datos dinámicamente -->
          <tr v-for="(institution,index) in institutions" :key="institution.id">
            <th scope="row">{{ index +1}}</th>
            <td>{{ institution.name }}</td>
            <td>{{ institution.nit }}</td>
            <td>
              <router-link
                :to="{
                  name: 'institutionDetails',
                  params: { id: institution.id },
                }"
                class="btn btn-success"
              >
                Ver Detalles <i class="fas fa-info-circle"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      institutions: [],
    };
  },
  created() {
    this.getInstitutions();
  },
  methods: {
    getInstitutions() {
      this.axios
        .get("http://localhost:3000/api/v1/institutions/")
        .then((response) => {
          this.institutions = response.data;
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