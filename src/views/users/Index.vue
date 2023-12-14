<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card">
          <div class="card-header text-bg-dark d-flex justify-content-between">
            <h2 class="card-title">Usuarios</h2>
            <div class="my-auto">
              <RouterLink
                :to="{ name: 'register' }"
                type="button"
                class="btn btn-success"
              >
                <i class="fas fa-plus"></i> Nuevo Usuario
              </RouterLink>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead class="table-success">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <!-- Datos de ejemplo, reempl ázalos con tus propios datos dinámicamente -->
                <tr v-for="(user, index) in users" :key="user.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    {{ user.role }}
                  </td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{name:'edituser',params: { id: user.id }}" class="btn btn-warning">
                        Editar
                      </router-link>
                      <button @click="deleteUser(user.id)" class="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      this.getUsers()
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

    saveUser() {
      console.log(this.user);
      this.axios
        .post("/users/", this.user)
        .then((response) => {
          this.getUsers();
          this.user = {
            username: "",
            email: "",
            password: "",
            role: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(id) {
      this.axios
        .delete("/users/"+id)
        .then(() => {
          this.users = this.users.filter(
            (user) => user.id != id
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
