<template>
  <div v-if="auth" class="container">
    <h2>BIENVENIDO AL BATALLÓN DE SEGURIDAD FÍSICA ORURO</h2>
  </div>
  <div v-else class="container">
    <LoginView></LoginView>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginView from "./auth/Login.vue";
export default {
  data() {
    return {};
  },
  components: {
    LoginView,
  },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>