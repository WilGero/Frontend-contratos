<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow ">
          <div class="card-header">
            <h3 class="text-center">Inicio de Sesión</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input 
                v-model="form.email"
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-dark" :class="{
                  'disabled':disabled
                }">
                  Iniciar sesion
                </button>
              </div>
              <div class="text-center">
                <p>
                  ¿No tienes una cuenta? <router-link :to="{name:'register'}">Regístrate</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  data(){
    return{
      form:{
        email:'',
        password:""
      },
      disabled:false
    }
  },
  computed:{
    ...mapState([
      'auth'
    ])
  },
  methods:{
    ...mapMutations(['setAuth']),
    login(){
      this.axios.post('/auth/login/',this.form)
      .then((response)=>{ 
        localStorage.setItem('auth',JSON.stringify(response.data));
        this.form=response.data;
        console.log(this.form);
        this.setAuth(response.data);
        this.disabled=false
        this.$router.push({
          name:'dashboard'
        })
      })
      .catch(error=>{
        console.log(error);
      })
    }
  }
}
</script>