<template>
    <header>
        <img
            @click="reload"
            src="@/assets/BSF logo.png"
            alt="Logo"
        />
        <h1><span>Batallón de</span> Seguridad Física</h1>
        <span></span>
    </header>
</template>

<script>
export default {
    methods: {
        reload() {
            location.reload();
        }
    },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  /* background:#004C25; */
}

img,
span {
  width: 48px;
}

h1 {
  font-size: 1.4rem;
  color: var(--brand-dark);
}

h1 span {
  color: var(--brand-green);
}
</style>