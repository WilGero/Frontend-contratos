<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-bg-dark">
            <h2 class="mb-4">Registro de Usuario</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="registrarse">
              <!-- Campo Username -->
              <div class="mb-3">
                <label for="username" class="form-label"
                  >Nombre de usuario</label
                >
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  required
                />
              </div>

              <!-- Campo Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <!-- Campo Contraseña -->
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  v-model="user.password"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>

              <!-- Campo Rol -->
              <div class="mb-3">
                <label for="rol" class="form-label">Rol</label>
                <select
                  v-model="user.role"
                  class="form-select"
                  id="rol"
                  name="rol"
                  required
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <!-- Botón de Registro -->
              <button type="submit" class="btn btn-success">Registrarse</button>
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
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    registrarse() {
      this.axios
        .post("/users", this.user)
        .then((response) => {
          this.contrato = {
            username: "",
            email: "",
            password: "",
            role: "",
          };
          if (this.auth) {
            this.$router.push({ name: "users" }); 
          } else {
            this.$router.push({ name: "login" });
          }
        })  
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>