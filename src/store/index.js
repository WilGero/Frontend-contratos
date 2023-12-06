import { createStore } from 'vuex'
import router from '@/router' 

export default createStore({
  state: {
    auth:null
  },
  getters: {
  },
  mutations: {
    setAuth(state,auth){
      state.auth=auth
    }
  },
  actions: {
    setAuth({commit}){
      if(localStorage.getItem('auth')){
        commit('setAuth',JSON.parse(localStorage.getItem('auth')));
      }
    },
    logout({commit}){
      localStorage.removeItem('auth');
      // location.reload();
      commit('setAuth', null)  // Asegúrate de limpiar el estado de autenticación
      router.push({name:'login'})
    }
  },
  modules: {
  }
})
