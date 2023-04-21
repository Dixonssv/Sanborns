/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/app/app.component.html",
    
    "./src/app/modules/common/presentation/header/header.component.html",
    "./src/app/modules/common/presentation/search-bar/search-bar.component.html",

    "./src/app/modules/inicio/presentation/empleado-card-list/empleado-card-list.component.html",

    "./src/app/detalles/ui/detalles/detalles.component.html",
    "./src/app/detalles/ui/dashboard/dashboard.component.html",
    "./src/app/detalles/ui/pdf-download-btn/pdf-download-btn.component.html",
    "./src/app/detalles/ui/sidebar/sidebar.component.html",
    "./src/app/detalles/ui/cards/card/card.component.html",
    "./src/app/detalles/ui/cards/datos-personales/datos-personales.component.html",
    "./src/app/detalles/ui/cards/curriculum/curriculum.component.html",
    "./src/app/detalles/ui/cards/estudios/estudios.component.html",
    "./src/app/detalles/ui/cards/contrato/contrato.component.html",
    "./src/app/detalles/ui/cards/horario/horario.component.html",
    "./src/app/detalles/ui/cards/documentos/documentos.component.html",
    "./src/app/detalles/ui/cards/nomina/nomina.component.html",
    "./src/app/detalles/ui/cards/actas/actas.component.html",
    "./src/app/detalles/ui/cards/trayectoria/trayectoria.component.html",
    "./src/app/detalles/ui/cards/cursos/cursos.component.html"

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
