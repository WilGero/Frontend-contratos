<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-bg-dark">
            <h5 class="card-title">
              <i class="fas fa-building"></i> Institución:
              {{ institution.name }}
            </h5>
          </div>
          <div class="card-body text-bg-light">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fas fa-id-card"></i>
                <strong class="text-success">NIT:</strong> {{ institution.nit }}
              </li>
              <li class="list-group-item">
                <i class="fas fa-map-marker-alt"></i>
                <strong class="text-success">Dirección:</strong>
                {{ institution.address }}
              </li>
              <li class="list-group-item">
                <i class="fas fa-user"></i>
                <strong class="text-success">Gerente:</strong>
                {{ institution.gerente }} (CI: {{ institution.gerenteCi }})
              </li>
              <li class="list-group-item">
                <i class="fas fa-user"></i
                ><strong class="text-success">Subgerente:</strong>
                {{ institution.subgerente }} (CI:
                {{ institution.subgerenteCi }})
              </li>
              <li class="list-group-item">
                <i class="fas fa-info-circle"></i
                ><strong class="text-success">Tipo:</strong>
                {{ institution.description }}
              </li>
              <li class="list-group-item">
                <i class="fas fa-envelope"></i
                ><strong class="text-success">Email:</strong>
                {{ institution.email }}
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
      <div v-if="active == true" class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="card-title">Editar Institución</h2>
            <div class="my-auto">
              <a @click="cancelar" class="btn btn-danger"
                ><i class="fas fa-times"></i
              ></a>
            </div>
          </div>
          <div class="card-body text-bg-light p-4">
            <form class="row" @submit.prevent="updateInstitution">
              <!-- Nombre -->
              <div class="col-md-6 mb-3">
                <label for="nombre" class="form-label fw-bold"
                  >Nombre de la Institución</label
                >
                <input
                  v-model="institution.name"
                  type="text"
                  class="form-control"
                  id="nombre"
                  required
                />
              </div>

              <!-- NIT -->
              <div class="col-md-6 mb-3">
                <label for="nit" class="form-label fw-bold">NIT</label>
                <input
                  v-model="institution.nit"
                  type="text"
                  class="form-control"
                  id="nit"
                  required
                />
              </div>

              <!-- Dirección -->
              <div class="col-12 mb-3">
                <label for="direccion" class="form-label fw-bold"
                  >Dirección</label
                >
                <input
                  v-model="institution.address"
                  type="text"
                  class="form-control"
                  id="direccion"
                  required
                />
              </div>

              <!-- Gerente -->
              <div class="col-md-6 mb-3">
                <label for="gerente" class="form-label fw-bold">Gerente</label>
                <input
                  v-model="institution.gerente"
                  type="text"
                  class="form-control"
                  id="gerente"
                  required
                />
              </div>

              <!-- CI del Gerente -->
              <div class="col-md-6 mb-3">
                <label for="ci_gerente" class="form-label fw-bold"
                  >CI del Gerente</label
                >
                <input
                  v-model="institution.gerenteCi"
                  type="text"
                  class="form-control"
                  id="ci_gerente"
                  required
                />
              </div>

              <!-- Subgerente -->
              <div class="col-md-6 mb-3">
                <label for="subgerente" class="form-label fw-bold"
                  >Subgerente</label
                >
                <input
                  v-model="institution.subgerente"
                  type="text"
                  class="form-control"
                  id="subgerente"
                  required
                />
              </div>

              <!-- CI del Subgerente -->
              <div class="col-md-6 mb-3">
                <label for="ci_subgerente" class="form-label fw-bold"
                  >CI del Subgerente</label
                >
                <input
                  v-model="institution.subgerenteCi"
                  type="text"
                  class="form-control"
                  id="ci_subgerente"
                  required
                />
              </div>

              <!-- Tipo -->
              <div class="col-md-6 mb-3">
                <label for="tipo" class="form-label fw-bold">Tipo</label>
                <select
                  v-model="institution.description"
                  class="form-select"
                  id="tipo"
                  required
                >
                  <option value="" selected disabled>Seleccionar</option>
                  <option value="Empresa Estratégica">
                    Empresa Estratégica
                  </option>
                  <option value="Banco">Banco</option>
                  <option value="Entidad financiera">Entidad financiera</option>
                  <option value="Empresa Privada">Empresa Privada</option>
                  <!-- Agrega más opciones según sea necesario -->
                </select>
              </div>

              <!-- Email -->
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label fw-bold"
                  >Correo Electrónico</label
                >
                <input
                  v-model="institution.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <!-- Usuario -->
              <!-- Botón de enviar -->
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
      institution: {},
      users: [],
      user: [],
      institutions: [],
    };
  },
  created() {
    this.getUsers();
    this.getInstitution();
    this.getInstitutions();
  },
  methods: {
    getUsers() {
      this.axios
        .get("/users/")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getInstitution() {
      try {
        const response = await this.axios.get(
          `/institutions/${this.$route.params.id}`
        );
        this.institution = response.data;
        this.user = response.data.user;
      } catch (error) {
        console.error("Error fetching contrato:", error);
      }
    },
    getInstitutions() {
      this.axios
        .get("/institutions/")
        .then((response) => {
          this.institutions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editar() {
      this.active = true;
    },
    cancelar() {
      this.active = false;
    },
    atras() {
      this.$router.push({name:'institutions'});
    },
    updateInstitution() {
      console.log(this.institution);
      delete this.institution.id;
      delete this.institution.user;
      delete this.institution.createdAt;
      console.log(this.institution);
      this.axios
        .patch(`/institutions/${this.$route.params.id}`, this.institution)
        .then((response) => {
          this.institution = response.data;
          this.active = false;
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