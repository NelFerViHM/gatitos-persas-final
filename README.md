# 🐾 Criadero Familiar de Gatitos Persas - Plataforma de Reservas (Versión Final)

Este proyecto consiste en una plataforma web interactiva y responsive diseñada para la gestión, exhibición y pre-reserva de gatitos de raza Persa. 

Desarrollado originalmente para efectuar la Pre Entrega como un sitio estático, esta versión final representa una evolución arquitectónica hacia un modelo dinámico basado en componentes desacoplados, sirviendo como herramienta de emprendimiento económico personal en Bernal Oeste y como entrega final para el programa de formación de desarrollo de software de Talento Tech.

---

## 🏗️ 1. Evolución de la Arquitectura (De Estático a API Dinámica)

El hito técnico más importante de esta versión es la transición de un catálogo rígido ("hardcodeado") a un ecosistema dinámico y escalable:

* **Desacoplamiento de Datos (`gatitos.json`):** Toda la información de los felinos, géneros, descripciones, imágenes de portada y arrays de galerías fue extraída del HTML y estructurada en un archivo JSON en la raíz del proyecto. Este archivo actúa como una base de datos local / API simulada.
* **Consumo Asíncrono (`fetch` + `async/await`):** Se programó un motor de carga asíncrona en JavaScript Vanilla (`cargarGatitosDesdeAPI()`) que realiza una petición HTTP al archivo JSON, procesa la promesa de datos y maneja de forma robusta las excepciones mediante bloques `try/catch`.
* **Renderizado Dinámico del DOM:** El contenedor principal del catálogo (`#contenedor-tarjetas`) se limpia y se dibuja en tiempo real al cargar el documento. Utilizando `document.createElement` y mecanismos avanzados de atributos personalizados (`element.dataset`), la lógica de programación inyecta las tarjetas de los componentes y enlaza los escuchadores de eventos de forma aislada, solucionando conflictos de escape de caracteres en las rutas de las imágenes.

---

## 🧩 2. Componentes e Interactividad Avanzada

* **Menú Hamburguesa Responsive:** Diseñado con un enfoque mobile-first. En pantallas de celulares (< 768px), la barra de navegación tradicional colapsa en un botón interactivo de tres líneas (☰). Mediante manipulación dinámica de clases (`classList.toggle`) en JavaScript, el botón ejecuta una animación fluida de transformación en una "X" de cierre, mientras despliega verticalmente un panel compacto de opciones.
* **Validación de Formulario en JavaScript Puro:** Para cumplir con los máximos estándares de seguridad y validación de datos exigidos, se anuló la dependencia nativa de HTML5 para implementar lógica de control estricta en el script antes del envío de datos:
  * **Control de campos obligatorios:** Uso de `.trim() === ""` para rechazar entradas vacías o compuestas únicamente por espacios en blanco falsos.
  * **Validación de Identidad de Correo (RegEx):** Implementación de una Expresión Regular estricta (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) para verificar la existencia del `@` y un formato de dominio web real.
* **Ventanas Emergentes (Modal & Lightbox):** Las galerías de imágenes operan de manera fluida renderizando carruseles infinitos de fotos a pantalla completa, permitiendo al usuario la navegación táctil, mediante clics asistidos por puntero o a través de eventos físicos del teclado (flechas direccionales y tecla *Escape*).
* **Persistencia de Estado del Carrito:** Uso de la API `localStorage` para serializar y retener las pre-selecciones de los gatitos durante el cambio de páginas entre `index.html` y la pasarela de `contacto.html`.

---

## 🛠️ 3. Estructura y Modularización de Archivos

Cumpliendo con las directrices de orden y separación de responsabilidades en ingeniería de software, el proyecto quedó completamente modularizado en su directorio raíz de la siguiente manera:

* `index.html`: Estructura semántica de la portada y contenedor de inyección dinámica.
* `contacto.html`: Formulario de reserva asistido por script.
* `style.css`: Estilos visuales globales, variables `:root`, box model unificado (`border-box`) y media queries para el menú hamburguesa.
* `script.js`: Archivo independiente que centraliza el 100% de la lógica de negocio, comportamiento interactivo y consumo de API.
* `gatitos.json`: Repositorio local de datos estructurado en formato clave-valor.
* `/IMG/`: Directorio local estandarizado para almacenamiento de recursos multimedia optimizados (`.jpeg`).

---

## 📚 4. Metodología de Elaboración y Fuentes

* **Formación de Grado:** Aplicación de fundamentos de ingeniería de requerimientos y lógica estructural de la carrera de **Analista de Sistemas**.
* **Actualización Tecnológica:** Integración de conceptos adquiridos en el trayecto de **Full Stack Python** (Programa Codo a Codo) y la cursada actual dentro del programa de **Talento Tech**.
* **Asistencia y Code Review:** Uso estratégico del soporte en línea de la **IA Gemini** para la reestructuración de algoritmos asíncronos y depuración de selectores CSS.
* **Despliegue Continuo (CI/CD):** Alojado de forma pública y gratuita mediante **GitHub Pages**, permitiendo actualizaciones en caliente sincrónicas.
