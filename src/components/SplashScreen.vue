<template>
    <div class="splashscreen">
        <img
            src="@/assets/BSF logo.png"
            alt="Logo"
        />
        <h1><span>Batallón de </span>Seguridad Física</h1>
    </div>
</template>

<style scoped>
.splashscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
h1 {
  color: var(--brand-dark);
}
h1 span {
  color: var(--brand-green);
}
</style>