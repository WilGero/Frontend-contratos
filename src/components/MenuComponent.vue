<template>
  <nav v-if="auth" class="navbar navbar-expand-lg bg-success navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          class="img-thumbnail border border-4 border-warning-subtle"
          src="../assets/BSF logo.png"
          alt="logo"
          width="100"
          height="100"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav nav-tabs me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'contratos' }"
              style="color: #ffffff"
              >Contratos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'institutions' }"
              style="color: #ffffff"
              >Instituciones</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'users' }"
              style="color: #ffffff"
              >Usuarios</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'seguimientos' }"
              style="color: #ffffff"
              >Seguimientos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'grafico' }"
              style="color: #ffffff"
              >Grafico</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'about' }"
              style="color: #ffffff"
              >Acerca de...</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'dashboard' }"
              class="nav-link"
              style="color: #ffffff"
            >
              Dashboard
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" id="salir">
            <button @click="logout" class="nav-link" style="color: #ffffff">
              Cerrar sesión <i class="fas fa-sign-out-alt"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav v-else class="navbar navbar-expand-lg bg-success navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          class="img-thumbnail border border-4 border-warning-subtle"
          src="../assets/BSF logo.png"
          alt="logo"
          width="100"
          height="100"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav nav-tabs ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'login' }"
              style="color: #ffffff"
              ><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              style="color: #ffffff"
              ><i class="fas fa-user-plus"></i> Registrarse</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style scoped>
li:hover {
  background: linear-gradient(to right, #0f1002, #a6b1a6);
  font-size: large;
}
#salir:hover {
  background: linear-gradient(to right, rgb(233, 67, 6), #cad43b);
  font-size: large;
}
</style>