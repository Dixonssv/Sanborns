/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/app/app.component.html",
    
    "./src/app/components/header/header.component.html",
    "./src/app/components/buscador/buscador.component.html",
    "./src/app/components/listado-empleados/listado-empleados.component.html",

    "./src/app/detalles/components/detalles/detalles.component.html",
    "./src/app/detalles/components/sidebar/sidebar.component.html",
    "./src/app/detalles/components/datos-personales/datos-personales.component.html",
    "./src/app/detalles/components/curriculum/curriculum.component.html",
    "./src/app/detalles/components/estudios/estudios.component.html",
    "./src/app/detalles/components/contrato/contrato.component.html",
    "./src/app/detalles/components/horario/horario.component.html",
    "./src/app/detalles/components/documentos/documentos.component.html",
    "./src/app/detalles/components/nomina/nomina.component.html",
    "./src/app/detalles/components/actas/actas.component.html",
    "./src/app/detalles/components/trayectoria/trayectoria.component.html",
    "./src/app/detalles/components/cursos/cursos.component.html"

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
