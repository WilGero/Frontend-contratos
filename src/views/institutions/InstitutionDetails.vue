<template>
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header bg-success text-white">
          <h5 class="card-title"><i class="fas fa-building"></i> Institución: {{ institution.name }}</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <i class="fas fa-id-card"></i> <strong class="text-success">NIT:</strong> {{ institution.nit }}
            </li>
            <li class="list-group-item">
              <i class="fas fa-map-marker-alt"></i> <strong class="text-success">Dirección:</strong> {{ institution.address }}
            </li>
            <li class="list-group-item">
              <i class="fas fa-user"></i> <strong class="text-success">Gerente:</strong> {{ institution.gerente }} (CI: {{ institution.gerenteCi }})
            </li>
            <li class="list-group-item">
              <i class="fas fa-user"></i><strong class="text-success">Subgerente:</strong>  {{institution.subgerente}} (CI: {{institution.subgerenteCi}})
            </li>
            <li class="list-group-item">
              <i class="fas fa-info-circle"></i><strong class="text-success">Tipo:</strong> {{ institution.description }}
            </li>
            <li class="list-group-item">
              <i class="fas fa-envelope"></i><strong class="text-success">Email:</strong> {{ institution.email }} 
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
      institution: {},
    };
  },
  created() {
    this.getInstitution();
  },
  methods: {
    getInstitution() {
      this.axios
        .get(
          "http://localhost:3000/api/v1/institutions/" + this.$route.params.id
        )
        .then((response) => {
          this.institution = response.data;
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