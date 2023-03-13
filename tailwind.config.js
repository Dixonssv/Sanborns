/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/app.component.{html,ts}",
    "./src/app/components/buscador/buscador.component.{html, ts}",
    "./src/app/components/detalles/detalles.component.{html, ts}",
    "./src/app/components/listado-empleados/listado-empleados.component.{html, ts}",
    "./src/app/components/header/header.component.{html, ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
