/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/app/app.component.html",
    
    "./src/app/modules/shared/components/header/header.component.html",
    "./src/app/modules/shared/components/search-bar/search-bar.component.html",

    "./src/app/modules/inicio/components/empleado-card-list/empleado-card-list.component.html",

    "./src/app/modules/detalles/components/detalles/detalles.component.html",
    "./src/app/modules/detalles/components/dashboard/dashboard.component.html",
    "./src/app/modules/detalles/components/pdf-download-btn/pdf-download-btn.component.html",
    "./src/app/modules/detalles/components/sidebar/sidebar.component.html",
    "./src/app/modules/detalles/components/cards/card/card.component.html",
    "./src/app/modules/detalles/components/cards/datos-personales/datos-personales.component.html",
    "./src/app/modules/detalles/components/cards/curriculum/curriculum.component.html",
    "./src/app/modules/detalles/components/cards/estudios/estudios.component.html",
    "./src/app/modules/detalles/components/cards/contrato/contrato.component.html",
    "./src/app/modules/detalles/components/cards/horario/horario.component.html",
    "./src/app/modules/detalles/components/cards/documentos/documentos.component.html",
    "./src/app/modules/detalles/components/cards/nomina/nomina.component.html",
    "./src/app/modules/detalles/components/cards/actas/actas.component.html",
    "./src/app/modules/detalles/components/cards/trayectoria/trayectoria.component.html",
    "./src/app/modules/detalles/components/cards/cursos/cursos.component.html"

  ],
  safelist: [

    'dash-card',
    'dash-card-x1',
    'dash-card-x2',
    'dash-card-x3',
    'dash-card-x4',
    'dash-card-y1',
    'dash-card-y2',
    'dash-card-y3',
    'dash-card-y4',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
