<template>
  <div class="col-md-6 m-auto">
    <div class="card shadow">
      <div class="card-header text-bg-dark d-flex justify-content-between">
        <h2 class="card-title">Editar Usuario</h2>
        <div class="my-auto">
          <a @click="cancelar" class="btn btn-danger"
            ><i class="fas fa-times"></i
          ></a>
        </div>
      </div>
      <div class="card-body text-bg-light p-4">
        <form @submit.prevent="updateUser">
          <!-- Campo Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
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
          <button type="submit" class="btn btn-success">Actualizar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  async created() {
    await this.getUsers();
    await this.getUser();
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
    async getUser() {
      try {
        const response = await this.axios.get(
          `/users/${this.$route.params.id}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching contrato:", error);
      }
    },
    updateUser() {
      console.log(this.user);
      const propiedadesAEliminar = [
        "id",
        "stateContrato",
        "institutions",
        "recoveryToken",
        "createdAt",
      ];

      propiedadesAEliminar.forEach((propiedad) => {
        if (this.user.hasOwnProperty(propiedad)) {
          delete this.user[propiedad];
        }
      });
      console.log(this.user);
      this.axios
        .patch(`/users/${this.$route.params.id}`, this.user)
        .then((response) => {
          this.user = response.data;
          this.$router.push({name:'users'});
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
