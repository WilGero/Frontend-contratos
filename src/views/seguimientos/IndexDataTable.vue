<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="card">
        <div class="card-header text-bg-dark">
          <h2 class="card-title text-sm-center">Seguimientos</h2>
          <button @click="exportToExcel" class="btn btn-success">Excel</button>
        </div>
        <div class="card-body text-bg-light">
          <div class="table-responsive">
            <DataTable
              ref="dataTable"
              :data="contratos"
              :columns="columns"
              class="table table-bordered table-hover display"
              :options="{
                responsive: true,
                autoWidth: false,
                dom: 'Bfrtip',
                language: {
                  search: 'Buscar',
                  zeroRecords: 'No hay registros para mostrar',
                  info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                  infoFiltered: '(Filtrados de _MAX_ registros.)',
                  paginate: {
                    first: 'Primero',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    last: 'ultimo',
                  },
                },
                buttons: botones,
              }"
            >
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
            </DataTable>
          </div>
        </div>
        <section class="card" ref="totalsCard">
          <div class="card-body">
            <div class="mb-4">
              <label class="fw-bold">Cantidad total de Policias:</label>
              <span class="m-4 px-2 card-text border">{{ totalPolice }}</span>
            </div>
            <div>
              <label class="fw-bold">Cantidad total de Instituciones:</label>
              <span class="m-4 px-2 card-text border">{{
                totalInstitutions
              }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake.vfs = pdfFonts.pdfMake.vfs;
import "datatables.net-responsive-bs5";
import JsZip from "jszip";
window.JSZip = JsZip;
DataTable.use(DataTable);
DataTable.use(pdfMake);
DataTable.use(ButtonsHtml5);
export default {
  components: { DataTable },
  data() {
    return {
      contratos: [],
      botones: [
        {
          title: "Seguimientos",
          extend: "excelHtml5",
          text: '<i class="fa-solid fa-file-excel"></i> Excel',
          className: "btn btn-success",

        },
        {
          title: "Seguimientos",
          extend: "pdfHtml5",
          text: '<i class="fa-solid fa-file-pdf"></i> PDF',
          className: "btn btn-danger",
        },
        {
          title: "Seguimientos",
          extend: "print",
          text: '<i class="fa-solid fa-print"></i> Imprimir',
          className: "btn btn-warning",
        },
        {
          title: "Seguimientos",
          extend: "copy",
          text: '<i class="fa-solid fa-copy"></i> Copiar',
          className: "btn btn-light",
        },
      ],
    };
  },
  mounted() {
    this.getContratos();
  },
  methods: {
    formatDate(date) {
      const fechaObj = new Date(date);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return fechaObj.toLocaleDateString("es-ES", options);
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
    exportToExcel() {
      const dataTable = this.$refs.dataTable;

      if (dataTable && dataTable.api) {
        const totalsCard = this.$refs.totalsCard.innerHTML;
        dataTable.api().buttons.exportData({
          modifier: {
            page: "all",
            // Agrega el contenido del card al inicio del documento exportado
            header: `<h1>Reporte de Seguimientos</h1>${totalsCard}`,
          },
        });
      }
    },
    exportToPDF() {
      const dataTable = this.$refs.dataTable;

      if (dataTable && dataTable.api) {
        const totalsCard = this.$refs.totalsCard.innerHTML;
        dataTable.api().buttons.exportData({
          modifier: {
            // Agrega el contenido del card al inicio del documento exportado
            title: `<h1>Reporte de Seguimientos</h1>${totalsCard}`,
          },
        });
      }
    },
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
    columns() {
      return [
        {
          data: null,
          render: function (data, type, row, meta) {
            return `${meta.row + 1}`;
          },
        },
        { data: "institution.name" },
        { data: "number" },
        {
          data: null,
          render: (data, type, row) => {
            const startDateFormatted = this.formatDate(row.startDate);
            const finishDateFormatted = this.formatDate(row.finishDate);
            return `${startDateFormatted} a ${finishDateFormatted}`;
          },
        },
        { data: "cantPolice" },
        { data: "stateContrato.name" },
      ];
    },
  },
};
</script>

<style>
@import "datatables.net-bs5";
</style>