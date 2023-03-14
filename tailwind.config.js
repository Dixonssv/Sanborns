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
    "./src/app/detalles/components/datos-personales/datos-personales.component.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
