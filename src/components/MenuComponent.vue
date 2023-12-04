<template>
<nav class="navbar navbar-expand-lg bg-success navbar-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">
      <img class="img-thumbnail border border-4 border-warning-subtle" src="../assets/BSF logo.png" alt="logo" width="100" height="100">
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" :to="{name:'contratos'}">Contratos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'institutions'}">Instituciones</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/about">Acerca de</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" :to="{name:'users'}">Usuarios</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" :to="{name:'about'}">Acerca de...</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #ffffff;">
            Menú
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#" style="color: #000000;">Acción 1</a></li>
            <li><a class="dropdown-item" href="#" style="color: #000000;">Acción 2</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" style="color: #000000;">Otra acción</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped>
 li:hover{
  background: linear-gradient(to right, #00FF00,#298928);
 }
</style>