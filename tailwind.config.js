/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/app/app.component.html",
    
    "./src/app/components/header/header.component.html",
    "./src/app/components/buscador/buscador.component.html",
    "./src/app/components/listado-empleados/listado-empleados.component.html",

    "./src/app/detalles/components/detalles/detalles.component.html",
    "./src/app/detalles/components/dashboard/dashboard.component.html",
    "./src/app/detalles/components/pdf-download-btn/pdf-download-btn.component.html",
    "./src/app/detalles/components/sidebar/sidebar.component.html",
    "./src/app/detalles/components/cards/card/card.component.html",
    "./src/app/detalles/components/cards/datos-personales/datos-personales.component.html",
    "./src/app/detalles/components/cards/curriculum/curriculum.component.html",
    "./src/app/detalles/components/cards/estudios/estudios.component.html",
    "./src/app/detalles/components/cards/contrato/contrato.component.html",
    "./src/app/detalles/components/cards/horario/horario.component.html",
    "./src/app/detalles/components/cards/documentos/documentos.component.html",
    "./src/app/detalles/components/cards/nomina/nomina.component.html",
    "./src/app/detalles/components/cards/actas/actas.component.html",
    "./src/app/detalles/components/cards/trayectoria/trayectoria.component.html",
    "./src/app/detalles/components/cards/cursos/cursos.component.html"

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
