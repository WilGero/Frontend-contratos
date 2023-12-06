<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="card-title text-center">Instituciones</h2>
            <div class="my-auto">
              <button @click="nuevo" type="button" class="btn btn-success">
                <i class="fas fa-plus"></i> Nueva Institución
              </button>
            </div>
          </div>
          <div class="card-body text-bg-light p-2">
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead class="table-success">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">NIT</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Datos de ejemplo, reemplázalos con tus propios datos dinámicamente -->
                  <tr
                    v-for="(institution, index) in institutions"
                    :key="institution.id"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ institution.name }}</td>
                    <td>{{ institution.nit }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'institutionDetails',
                          params: { id: institution.id },
                        }"
                        class="btn btn-secondary"
                      >
                        Ver Detalles <i class="fas fa-info-circle"></i>
                      </router-link>

                      <button
                        @click="deleteInstitution(institution.id)"
                        type="button"
                        class="btn btn-danger"
                      >
                        <i class="fas fa-trash-alt"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active" class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2>Nueva Institución</h2>
            <div class="my-auto">
              <a @click="cancelar" class="btn btn-danger"
                ><i class="fas fa-times"></i
              ></a>
            </div>
          </div>
          <div class="card-body text-bg-light p-4">
            <form class="row" @submit.prevent="saveInstitution">
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

              <!-- Botón de guardar -->
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: false,
      users: [],
      institutions: [],
      institution: {
        name: "",
        nit: "",
        address: "",
        gerente: "",
        gerenteCi: "",
        subgerente: "",
        subgerenteCi: "",
        description: "",
        email: "",
        userId:''
      },
      errors: [],
    };
  },
  created() {
    this.getUsers();
    this.getInstitutions();
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    nuevo() {
      this.active = true;
    },
    cancelar() {
      this.active = false;
    },
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
    saveInstitution() {
      this.institution.userId=this.auth.user.id;
      console.log(this.institution);
      this.axios
        .post("/institutions", this.institution)
        .then((response) => {
          console.log(response.data);
          this.institutions.push(response.data);
          this.institution = {
            name: "",
            nit: "",
            address: "",
            gerente: "",
            gerenteCi: "",
            subgerente: "",
            subgerenteCi: "",
            description: "",
            email: "",
          };
          this.errors = [];
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.message;
        });
    },
    deleteInstitution(id) {
      this.axios
        .delete("/institutions/" + id)
        .then(() => {
          this.institutions = this.institutions.filter(
            (institution) => institution.id != id
          );
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