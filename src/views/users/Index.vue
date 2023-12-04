<template>
    <div class="container mt-5">
      <h2>Usuarios</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            <!-- Datos de ejemplo, reemplázalos con tus propios datos dinámicamente -->
            <tr v-for="(user,index) in users" :key="user.id">
              <th scope="row">{{ index +1}}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                {{ user.rol }}
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
        users: [],
      };
    },
    created() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        this.axios
          .get("http://localhost:3000/api/v1/users/")
          .then((response) => {
            this.users = response.data;
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