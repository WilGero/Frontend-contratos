<template>
  <MenuComponent></MenuComponent>
  <router-view></router-view>
</template>

<script>
import {mapActions} from 'vuex';
import MenuComponent from "./components/MenuComponent.vue";
export default {
  components: {
    MenuComponent,
  },
  created(){
    this.setAuth();
  },
  methods:{
    ...mapActions([
      'setAuth',
      ])
  }
};
</script>

<style>
body{
  background: linear-gradient(to right, #83e18e, #a6b1a6);
}
</style>