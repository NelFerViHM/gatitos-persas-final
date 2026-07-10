# 📚Criadero Familiar de Gatitos Persas

Este proyecto consiste en una plataforma web estatica y responsive diseñada para la gestión, exhibición y pre-reserva de gatitos de raza Persa. El sitio web funciona como un catálogo interactivo optimizado para dispositivos móviles.

El objetivo principal es ofrecer una experiencia de usuario alegre, confiable y funcional para facilitar la adopción responsable de felinos en un entorno campestre, sirviendo además como una herramienta de emprendimiento económico personal y un canal de adopción responsable en la zona de Bernal Oeste, Buenos Aires.

## 🛠️Arquitectura principal del Proyecto

La web está construida bajo una arquitectura de sitio estático optimizado, dividida en los siguientes módulos:

* **Interfaz de Usuario (HTML5):** Esta estructurada en dos paginas, la pagina principal Inicio y una pagina de Contacto.
* La pagina de **Inicio** posee una Cabecera fija con logotipo, area de navegación, catálogo de 6 tarjetas dinámicas con sistema de identificación por género, un carrito de reservas funcional, area inferior de Footer  con iconos de acceso a las redes sociales.
* La pagina de **Contacto** posee una Cabecera fija con logotipo, area de navegación, formulario para el envio de los datos del interesado y boton de envio de mensaje por Whatsapp, area inferior de Footer  con iconos de acceso a las redes sociales.
* **Diseño y Estética (CSS3):** Estética campestre basada en variables (`:root`) para colores verdes y naranjas. Diseño 100% responsive mediante Flexbox y CSS Grid.
* **Funcionalidad (JavaScript):** Lógica de carrito con persistencia de datos (`localStorage`), galería de fotos dinámica con visor Lightbox (navegación por flechas y teclado) e integración directa con la API de WhatsApp.

## 🛠️1. Estructura y Maquetación del Proyecto (Layout)

La arquitectura de la página se diseñó siguiendo los estándares de **HTML5 Semántico**, garantizando accesibilidad, y una separación clara de las areas del documento.

* **Estructura Global (`<body>`):** El documento está configurado bajo un flujo vertical limpio, envuelto en una tipografía dual (`Fredoka` para títulos y `Quicksand` para textos de lectura) importada de Google Fonts para transmitir calidez, amabilidad y estética campestre.
* **Encabezado Global (`<header>`):** Actúa como el bloque de identidad visual de la empresa. Contiene:
  * Un contenedor flexible (`.header-container`) que agrupa el logotipo circular texturizado y un bloque de texto jerárquico (`<h1>` y `<p class="subtitle">`).
  * Una barra de navegación (`<nav>`) con listas no ordenadas (`<ul>`) que enlazan las secciones internas mediante anclas de desplazamiento suave e interconectan la página secundaria.
* **Contenedor Principal (`<main>`):** Centraliza la lógica de negocio y el contenido dinámico mediante un layout de caja flexible (`flex-direction: column`) con espaciados calculados (`gap: 40px`) para evitar la fatiga visual.
* **Pie de Página (`<footer>`):** Cierra el documento con las responsabilidades legales de Copyright y un módulo de conversión secundaria que expone los enlaces a redes sociales.

---

## 🧩 2. Componentes e Interfaz de Usuario (UI Components)

El sitio se estructuró basándose en componentes reutilizables y modulares controlados mediante clases de CSS:

* **Secciones de Contenido Comunes (`.content-section`):** Cajas contenedoras que funcionan como paneles independientes. Utilizan un fondo blanco de alta opacidad (`rgba`) para contrastar con la imagen de fondo, bordes suavizados (`border-radius: 24px`) y sombras sutiles para generar profundidad visual (efecto de elevación).
* **Sección Destacada (`.highlight-section`):** Variante del componente común que altera su paleta cromática hacia un fondo verdoso suave con bordes punteados naranja, utilizado estratégicamente para capturar la atención del usuario en bloques educativos (Cuidados de la raza).
* **Módulo de Catálogo de Productos (`.cards-grid`):** Un contenedor de rejilla adaptativa que distribuye las tarjetas de los felinos de forma dinámica según el espacio disponible en pantalla.
* **Tarjeta de Producto (`.cat-card`):** Componente crítico de conversión que encapsula:
  * Un contenedor de imagen recortada y simétrica (`object-fit: cover`) con efecto de zoom interno en *hover*.
  * Etiquetas de estado (`.badge`) con colores condicionales según el género del felino (Rosa para hembras, Azul para machos).
  * Botones de acción primaria (`.add-cart-btn`) con transiciones suaves de color y elevación al pasar el cursor.
* **Ventana Emergente de Galería (Componente Modal):** Estructura oculta por defecto (`display: none`) posicionada en la capa más alta del eje Z (`z-index: 200`). Cuenta con un fondo traslúcido oscuro y desenfoque de fondo (`backdrop-filter: blur`) que aisla el contenido de la galería del resto de la página.
* **Visor de Pantalla Completa (Componente Lightbox):** Un segundo sub-modal avanzado con controles nativos de navegación (flechas vectoriales) que permite expandir imágenes individuales sin sobrecargar la memoria de la página.
* **Módulo de Persistencia de Compra (`.cart-box`):** Componente de tipo caja de estado que renderiza una lista dinámica basada en las selecciones previas del usuario, sirviendo como paso intermedio antes de la facturación o reserva.

---

## 🎯 3. Características Técnicas y Optimizaciones

* **Responsive Web Design (Mobile-First Focus):** La página no tiene anchos fijos. En resoluciones de escritorio se despliega en múltiples columnas y cuadrículas, mientras que en pantallas móviles (< 600px) el menú de navegación se transforma automáticamente en un **carrusel horizontal deslizable al tacto (estilo Netflix)** para maximizar el área de visualización útil.
* **Diseño Fluido y Moderno:** Implementación de layouts avanzados mediante **CSS Grid** (`repeat(auto-fit, minmax(280px, 1fr))`) y **Flexbox** que eliminan la necesidad de hacks estructurales antiguos.
* **Persistencia de Estado Local:** Integración de la API de JavaScript `localStorage` para retener la lista de gatitos reservados por el cliente y transferirla sin pérdidas de datos entre `index.html` y la pasarela de `contacto.html`.
* **Redirección Externa Segura (Anti-Bloqueo):** Uso del constructor nativo `new URL()` de JavaScript y propiedades de sanitización de texto (`encodeURIComponent`) para empaquetar de forma robusta la solicitud de reserva y forzar la apertura del cliente oficial de WhatsApp en cualquier sistema operativo móvil, evitando errores de página no encontrada (404).

---

## 🛠️ 4. Cronología del Proceso de Desarrollo

El proyecto fue desarrollado de forma incremental a través de un ciclo de vida iterativo, aplicando conceptos consolidados y quitando el óxido de conocimientos previos de programación:

1. **Fase 1: Maquetación Base y Estructura Semántica:** Se tomó un documento HTML crudo y se reestructuró por completo usando las etiquetas semánticas de HTML5 (`header`, `nav`, `main`, `section`, `footer`) para sentar bases sólidas de accesibilidad.
2. **Fase 2: Identidad Cromática e Identidad Visual:** Se definió la arquitectura de variables en el selector `:root` de CSS. Se pasó de un entorno oscuro a una interfaz campestre de alta vibración basada en verdes esmeralda, cremas y naranjas cálidos, enlazando una imagen de fondo fija (*parallax*) para simular profundidad natural.
3. **Fase 3: Modularización del Catálogo:** Se programó el grid adaptativo de 6 tarjetas individuales, estandarizando el tamaño de las imágenes para evitar deformaciones estéticas.
4. **Fase 4: Programación de la Lógica del Carrito:** Se codificaron las funciones en JavaScript Vanilla para añadir, validar la existencia y remover elementos del array de reservas en tiempo real.
5. **Fase 5: Ingeniería de la Galería y Controles de Teclado:** Se desarrolló el sistema de modales encadenados (Modal + Lightbox), agregando eventos de escucha en JavaScript (`addEventListener`) para permitir al usuario cambiar de foto usando las flechas físicas del teclado o la tecla *Escape* para salir.
6. **Fase 6: Optimización Mobile y Menú Deslizable:** Al detectar el colapso del menú en celulares, se reescribieron las reglas del `@media (max-width: 600px)` implementando propiedades de desbordamiento horizontal (`overflow-x: auto`) y cancelando el salto de línea (`white-space: nowrap`) para lograr un menú móvil compacto y moderno.
7. **Fase 7: Integración y Despliegue con la API de WhatsApp:** Se superaron las restricciones de seguridad del servidor utilizando fragmentación de texto para el protocolo seguro `https://` y forzando la redirección mediante `window.location.replace` para garantizar que las reservas se envíen directamente al teléfono móvil del criador. Finalmente, el sitio fue desplegado exitosamente a través de **GitHub Pages**.

---

## 📚 5. Metodología de Elaboración y Fuentes

Este desarrollo combina conocimientos técnicos que poseo en el area de programacion y el uso de herramientas de programacion de paginas WEB adquiridos a traves de mi recorrido academico:

* **Formación Académica:** Aplicación de fundamentos de ingeniería de software y lógica estructural adquiridos durante la carrera de **Analista de Sistemas**.
* **Capacitación Específica:** Reutilización y actualización de conceptos de desarrollo web del curso **Full Stack Python** (Programa Codo a Codo), integrados con el material bibliográfico y audiovisual del programa actual **Talento Tech Front End JS**.
* **Asistencia con Inteligencia Artificial:** Uso de soporte online mediante la **IA Gemini** para la optimización de algoritmos de JavaScript, depuración de estilos CSS avanzados y resolución de problemas de caché de red.
* **Benchmarking Digital:** Análisis de interfaces de comercio electrónico y criaderos líderes en internet para adoptar las mejores prácticas de experiencia de usuario (UX/UI).

## 🛠️ Tecnologías Utilizadas

* **HTML5** (Semántica y Estructura)
* **CSS3** (Diseño, Animaciones y Variables)
* **JavaScript Vanilla** (Lógica de Carrito y Galerías)
* **Google Fonts** (Tipografías 'Fredoka' y 'Quicksand')

## 📌 Nota de Uso

Para una correcta visualización de las imágenes, se deben alojar los archivos de fotografía en la carpeta `/IMG/` respetando las rutas y nombres definidos en el código fuente.
