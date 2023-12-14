<template>
  <div class="container">
    <div class="card">
      <div class="card-header text-bg-dark">
        <h2>Subir archivo</h2>
      </div>
      <div class="card-body">
        <div>
          <div>
            <h3>Paso 1: Selecciona archivos</h3>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              multiple
            />
            <button @click="uploadFiles">Cargar archivos</button>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <h3>Paso 2: Archivos seleccionados</h3>
            <ul>
              <li v-for="file in uploadedFiles" :key="file.name">
                {{ file.name }}
              </li>
            </ul>

            <button @click="processFiles">Procesar archivos</button>
          </div>

          <!-- Otros pasos de carga de archivos aquí -->

          <div v-if="processingFiles">
            <h3>Paso 3: Procesando archivos...</h3>
            <!-- Mostrar algún indicador de carga -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: null,
      uploadedFiles: [],
      processingFiles: false,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFiles = event.target.files;
    },
    uploadFiles() {
      // Puedes implementar la lógica de carga de archivos aquí
      // Por ejemplo, usar una biblioteca como axios para cargar archivos al servidor
      // Aquí, simplemente almacenamos los archivos seleccionados para mostrarlos en el siguiente paso
      this.uploadedFiles = Array.from(this.selectedFiles);
    },
    processFiles() {
      // Puedes implementar la lógica de procesamiento de archivos aquí
      // Por ejemplo, realizar operaciones en cada archivo
      // Mostrar algún indicador de carga mientras se procesan los archivos
      this.processingFiles = true;

      // Simulación de procesamiento con un temporizador (puedes reemplazar esto con tu lógica real)
      setTimeout(() => {
        this.processingFiles = false;
        alert("Archivos procesados con éxito.");
      }, 2000);
    },
  },
};
</script>

<style>
</style>