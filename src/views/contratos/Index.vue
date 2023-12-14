<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="mb-4 card-title text-center">Contratos</h2>
            <div class="my-auto">
              <button @click="nuevo" type="button" class="btn btn-success">
                <i class="fas fa-plus"></i> Nuevo contrato
              </button>
            </div>
          </div>
          <div class="card-body text-bg-light p-2">
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="table-success">
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
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ contrato.number }}</td>
                    <td>{{ contrato.institution.name }}</td>
                    <td>{{ contrato.stateContrato.name }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link
                          :to="{
                            name: 'contratoDetails',
                            params: { id: contrato.id },
                          }"
                          class="btn btn-secondary btn-sm"
                          data-toggle="collapse"
                          data-target="#detalleContrato1"
                          aria-expanded="false"
                          aria-controls="detalleContrato1"
                        >
                          <i class="fas fa-info-circle"></i> Ver Detalles
                        </router-link>
                        <button
                          @click="deleteContrato(contrato.id)"
                          type="button"
                          class="btn btn-danger btn-sm"
                        >
                          <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                        <button @click="subirArchivo()" class="btn btn-outline-warning btn-sm">
                          <i class="fas fa-upload"></i> Subir Archivo
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!-- Agrega más filas según sea necesario -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active" class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="card-title">Nuevo Contrato</h2>
            <div class="my-auto">
              <a @click="cancelar" class="btn btn-danger"
                ><i class="fas fa-times"></i
              ></a>
            </div>
          </div>
          <div class="card-body text-bg-light p-4">
            <form class="row" @submit.prevent="saveContrato">
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
                <label for="institucion" class="form-label">Institución</label>
                <select
                  class="form-select"
                  v-model="contrato.institutionId"
                  id="institucion"
                  required
                >
                  <option value="" selected disabled>
                    Selecciona una institución
                  </option>
                  <option
                    v-for="institution in institutions"
                    :key="'institution-' + institution.id"
                    :value="institution.id"
                  >
                    {{ institution.name }}
                  </option>
                </select>
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
      <div v-if="active2" class="col-md-6">
        <SubirArchivo></SubirArchivo>
      </div>
    </div>
  </div>
</template>

<script>
import SubirArchivo from '@/components/SubirArchivo.vue';
export default {
  components:{
    SubirArchivo
  },
  data() {
    return {
      active: false,
      active2:false,
      institutions: [{ name: "" }],
      stateContratos: [{ name: "" }],
      contratos: [],
      contrato: {
        number: "",
        startDate: "",
        finishDate: "",
        cantPolice: "",
        institutionId: "",
        stateContratoId: "",
      },
    };
  },
  created() {
    this.getInstitutions();
    this.getStateContratos();
    this.getContratos();
  },
  methods: {
    getInstitutions() {
      this.axios
        .get("/institutions")
        .then((response) => {
          this.institutions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStateContratos() {
      this.axios
        .get("/state-contratos")
        .then((response) => {
          this.stateContratos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    nuevo() {
      this.active = true;
    },
    cancelar() {
      this.active = false;
    },
    saveContrato() {
      console.log(this.contrato);
      this.axios
        .post("/contratos/", this.contrato)
        .then((response) => {
          this.getContratos();
          //   this.contratos.push(response.data);
          this.contrato = {
            number: "",
            startDate: "",
            finishDate: "",
            cantPolice: "",
            institutionId: "",
            stateContratoId: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteContrato(id) {
      this.axios
        .delete("/contratos/" + id)
        .then(() => {
          this.contratos = this.contratos.filter(
            (contrato) => contrato.id != id
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    subirArchivo(){
      this.active2=true;
    }
  },
};
</script>

<style>
</style>