<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-end">
      <div class="card row mt-2">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
        <button type="button" @click="imprimir" class="btn btn-warning">Imprimir</button>
          <button type="button" @click="PDF" class="btn btn-danger">PDF</button>
          <button type="button" @click="Excel" class="btn btn-success">Excel</button>
        </div>
      </div>
    </div>
    <div class="card text-center" ref="exportContent">
      <div class="card-header text-bg-dark d-flex justify-content-center">
        <h2 class="card-title">Seguimientos</h2>
      </div>
      <div class="card-body table-responsive">
        <table id="table" class="table table-bordered table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Institución</th>
              <th scope="col">Número de contrato</th>
              <th scope="col">Vigencia del Contrato</th>
              <th scope="col">Número de Policías</th>
              <th scope="col">Situación Actual del Contrato</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contrato, index) in contratos" :key="contrato.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ contrato.institution.name }}</td>
              <td>{{ contrato.number }}</td>
              <td>
                {{ fechaFormateada(contrato.startDate) }} a
                {{ fechaFormateada(contrato.finishDate) }}
              </td>
              <td>{{ contrato.cantPolice }}</td>
              <td>{{ contrato.stateContrato.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <section class="card-footer">
        <div class="mb-4">
          <label class="fw-bold">Cantidad total de Policias:</label>
          <span class="m-4 px-2 card-text border">{{ totalPolice }}</span>
        </div>
        <div>
          <label class="fw-bold">Cantidad total de Instituciones:</label>
          <span class="m-4 px-2 card-text border">{{ totalInstitutions }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import printJS from 'print-js';
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      contratos: [],
    };
  },
  created() {
    this.getContratos();
  },
  computed: {
    totalPolice() {
      return this.contratos.reduce(
        (suma, contrato) => suma + contrato.cantPolice,
        0
      );
    },
    totalInstitutions() {
      return this.contratos.length;
    },
  },
  methods: {
    PDF() {
      const content = this.$refs.exportContent; // Reemplaza con la referencia a tu contenido
      const pdfOptions = {
        margin: 10,
        filename: "exported-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf(content, pdfOptions);
    },
    getContratos() {
      this.axios
        .get("/contratos")
        .then((response) => {
          this.contratos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //para formatear la fecha
    fechaFormateada(fechaISO) {
      const fechaObj = new Date(fechaISO);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return fechaObj.toLocaleDateString("es-ES", options);
    },
    imprimir() {
      window.print();
    },
    imprimir2() {
      // Configuración de impresión

      const opcionesDeImpresion = {
        printable: "table", // ID o clase del elemento que deseas imprimir
        type: "html",
        // css: 'estilos-para-impresion.css' // Opcional: archivo de estilos para la impresión
      };

      // Llamada a la función de impresión
      printJS(opcionesDeImpresion);
    },
  },
};
</script>

<style scoped>
@media print {
  /* Estilos específicos para la impresión */
  body {
    font-size: 12pt;
    /* Agrega más estilos según sea necesario */
  }
  .no-imprimir {
    display: none;
  }
}
</style>