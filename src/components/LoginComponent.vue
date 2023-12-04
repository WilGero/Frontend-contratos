<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Inicio de Sesión</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent>
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input
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
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-primary">
                    Iniciar sesion
                </button>
              </div>
              <div class="text-center">
                <p>
                  ¿No tienes una cuenta? <a href="registro.html">Regístrate</a>
                </p>
              </div>
            </form>
            <router-link :to="{name:'home'}">
                    Iniciar sesion
                  </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

