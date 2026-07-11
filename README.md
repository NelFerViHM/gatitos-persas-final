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

## 🏗️ 4. Evolución de la Arquitectura (Ecosistema de 3 Páginas)

El hito técnico más importante de esta fase de desarrollo es la transición de una landing page unificada hacia una arquitectura estructurada de tres pantallas independientes, optimizando drásticamente el flujo de usuario (UX) y eliminando redundancias de código en el DOM:

* **`index.html` (Portada Principal):** Centraliza la identidad de marca del criadero, la sección institucional ("Sobre Nosotros") y el bloque educativo de "Cuidados Esenciales". Se removieron los componentes del catálogo para aligerar el peso y mejorar los tiempos de carga inicial del sitio.
* **`disponibles.html` (Catálogo Exclusivo y Pasarela):** Nueva pantalla dedicada puramente al negocio. Aloja el contenedor dinámico de inyección de felinos y el componente del Carrito de Reservas, permitiendo al cliente seleccionar a su próximo compañero sin distracciones visuales.
* **`contacto.html` (Formulario de Reserva y Validación):** Interfaz dedicada al procesamiento de datos del cliente, persistencia de la selección y enlace final con la API externa de WhatsApp.
* **Navegación Cruzada Absoluta:** Se reestructuró la lista de navegación (`<ul class="nav-links">`) en los tres documentos utilizando rutas híbridas (ej: `index.html#presentacion` y `disponibles.html#carrito`). Esto garantiza que los hipervínculos respondan de forma fluida sin importar en qué pantalla esté navegando el usuario, evitando enlaces rotos o congelamientos lógicos del DOM.

---

## 🧩 5. Componentes e Interactividad Avanzada

* **Consumo Asíncrono (`fetch` + `async/await`):** Toda la información de los felinos vive desacoplada en `gatitos.json`. El motor asíncrono en `script.js` realiza la petición HTTP, procesa los datos y renderiza de forma dinámica las tarjetas mediante manipulación avanzada del DOM (`document.createElement` y `element.dataset`).
* **Manejo de Errores Silencioso:** Las funciones globales del script cuentan con condicionales de control estricto (ej: `if (!list) return;`). Esto blinda la aplicación, permitiendo que un único archivo `script.js` asista a las tres páginas en simultáneo sin disparar excepciones de nodos inexistentes en la consola del navegador.
* **Validación de Formulario en JavaScript Puro:** Se anula la dependencia nativa de HTML5 para implementar lógica de control robusta: uso de `.trim() === ""` anti-espacios vacíos y validación de identidad de correo mediante una Expresión Regular estricta (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
* **Persistencia de Estado del Carrito:** Uso de la API `localStorage` para serializar y retener los nombres de los gatitos seleccionados durante el salto de páginas entre `disponibles.html` y el formulario de `contacto.html`.

---

## 🛠️ 6. Estructura del Directorio de Trabajo

* `index.html`: Estructura semántica de la portada institucional.
* `disponibles.html`: Contenedor de catálogo dinámico y pasarela de pre-reserva.
* `contacto.html`: Formulario de validación de datos del cliente.
* `style.css`: Estilos visuales globales, variables `:root`, box model unificado y media queries de compactación responsive.
* `script.js`: Centraliza el 100% de la lógica de negocio, comportamiento interactivo, persistencia y consumo de API.
* `gatitos.json`: Repositorio local de datos estructurado en formato clave-valor.
* `README_old.md`: Archivo histórico conservado localmente como bitácora de control de cambios.
* `/IMG/`: Directorio local estandarizado para almacenamiento de recursos multimedia optimizados (`.jpeg`).

---

## 🚀 Próximos Hitos de Desarrollo (Escalabilidad Comercial)

De cara a la expansión del negocio, el mapa de ruta contempla:

1. Migración de la sección de cuidados hacia un módulo independiente (`cuidados.html`).
2. Implementación de una base de datos local secundaria (`accesorios.json`) para la recomendación y futura venta de accesorios y productos premium del criadero.

## 📚 Metodología de Elaboración y Fuentes

* **Formación de Grado:** Aplicación de fundamentos de ingeniería de requerimientos y lógica estructural de la carrera de **Analista de Sistemas**.
* **Actualización Tecnológica:** Integración de conceptos adquiridos en el trayecto de **Full Stack Python** (Programa Codo a Codo) y la cursada actual dentro del programa de **Talento Tech**.
* **Asistencia y Code Review:** Uso estratégico del soporte en línea de la **IA Gemini** para la reestructuración de algoritmos asíncronos y depuración de selectores CSS.
* **Despliegue Continuo (CI/CD):** Alojado de forma pública y gratuita mediante **GitHub Pages**, permitiendo actualizaciones en caliente sincrónicas.
