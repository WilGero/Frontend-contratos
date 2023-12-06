<template>
  <h2 v-if="auth">Bienvenido Usuario {{ auth.user.username }}</h2>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["auth"]),

  },
};
</script>

<style>
</style>