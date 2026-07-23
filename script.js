// ===================================================
// 1. LÓGICA INTERACTIVA PARA EL MENÚ HAMBURGUESA Y ARRANQUE
// ===================================================
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    // Lógica del menú hamburguesa (Se mantiene igual)
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("open");
        });

        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", function () {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("open");
            });
        });
    }

    // 🚀 DISPARADOR DIRECTO: Arranca el fetch de gatitos inmediatamente
    // Remueve cualquier validación extra para forzar la carga
    cargarGatitosDesdeAPI();

    // Inicializar el formulario si existe en pantalla
    if (document.getElementById('form-contacto')) {
        cargarGatitosEnFormulario();
    }
});


// ===================================================
// 2. SISTEMA DE GESTIÓN DEL CARRITO DE RESERVAS
// ===================================================
const carrito = [];

function agregarAlCarrito(nombreGatito) {
    if (!carrito.includes(nombreGatito)) {
        carrito.push(nombreGatito);
        actualizarInterfaz();
        // 🚨 Alerta personalizada con el nombre del michi elegido
        alert(`¡El Gatito ${nombreGatito} está reservado! Pasá por la sección Carrito para confirmar.`);
    } else {
        alert(nombreGatito + ' ya está en tu lista de reserva.');
    }
}

function removerDelCarrito(nombreGatito) {
    const index = carrito.indexOf(nombreGatito);
    if (index > -1) {
        carrito.splice(index, 1);
        actualizarInterfaz();
    }
}

function actualizarInterfaz() {
    const emptyMsg = document.getElementById('cart-empty-msg');
    const list = document.getElementById('cart-items-list');
    if (!list || !emptyMsg) return;

    list.innerHTML = '';

    if (carrito.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>🐱 ${item}</span> <button class="remove-btn" onclick="removerDelCarrito('${item}')">Quitar</button>`;
            list.appendChild(li);
        });
    }
}

function procesarCompra() {
    if (carrito.length === 0) {
        alert('Selecciona al menos un gatito antes de confirmar.');
    } else {
        localStorage.setItem('gatitosReservados', JSON.stringify(carrito));
        alert('¡Gatitos listos para reservar! Completa el formulario de contacto para finalizar.');
        window.location.href = "contacto.html";
    }
}

// ===================================================
// 3. VENTANAS EMERGENTES (MODAL & LIGHTBOX GALERÍA)
// ===================================================
let fotosActuales = [];
let indiceActual = 0;

function abrirGaleria(nombreGatito, listaFotos) {
    const modal = document.getElementById("miModal");
    const titulo = document.getElementById("modal-titulo");
    const grid = document.getElementById("modal-grid");
    if (!modal || !grid || !titulo) return;

    fotosActuales = listaFotos;
    titulo.innerText = "Fotos de " + nombreGatito;
    grid.innerHTML = "";

    listaFotos.forEach((fotoUrl, index) => {
        const img = document.createElement("img");
        img.src = fotoUrl;
        img.style.cursor = "zoom-in";
        img.onclick = () => abrirVisor(index);
        grid.appendChild(img);
    });

    modal.style.display = "block";
}

function abrirVisor(index) {
    const visor = document.getElementById("modalVisor");
    if (!visor) return;
    indiceActual = index;
    visor.style.display = "block";
    actualizarFotoVisor();
}

function cerrarGaleria() {
    const modal = document.getElementById("miModal");
    if (modal) modal.style.display = "none";
}

function cerrarVisor() {
    const visor = document.getElementById("modalVisor");
    if (visor) visor.style.display = "none";
}

function cambiarFoto(direccion) {
    indiceActual += direccion;
    if (indiceActual >= fotosActuales.length) { indiceActual = 0; }
    if (indiceActual < 0) { indiceActual = fotosActuales.length - 1; }
    actualizarFotoVisor();
}

function actualizarFotoVisor() {
    const visorImg = document.getElementById("fotoAmpliada");
    const caption = document.getElementById("caption");
    if (!visorImg || !caption) return;

    visorImg.src = fotosActuales[indiceActual];
    caption.innerText = `Imagen ${indiceActual + 1} de ${fotosActuales.length}`;
}

// Eventos de teclado globales
document.addEventListener('keydown', (e) => {
    const visor = document.getElementById("modalVisor");
    if (visor && visor.style.display === "block") {
        if (e.key === "Escape") cerrarVisor();
        if (e.key === "ArrowRight") cambiarFoto(1);
        if (e.key === "ArrowLeft") cambiarFoto(-1);
    }
});

// Cierre al hacer clic fuera de los modales
window.onclick = function (event) {
    const modal = document.getElementById("miModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// ===================================================
// 3.5 MOTOR DE CONSUMO DE API LOCAL (FETCH ASYNC)
// ===================================================
async function cargarGatitosDesdeAPI() {
    console.log("Intentando cargar la API de gatitos...");
    const gridContenedor = document.getElementById('contenedor-tarjetas');

    if (!gridContenedor) return; // Si no está en la página, frena de forma segura

    try {
        const respuesta = await fetch('gatitos.json');

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el catálogo de datos.");
        }

        const listaGatitos = await respuesta.json();
        gridContenedor.innerHTML = "";

        // 🎯 ORDENAMIENTO EN TIEMPO REAL: Fuerza a "disponible" a ir arriba de todo
        const gatitosOrdenados = [...listaGatitos].sort((a, b) => {
            if (a.estado === "disponible" && b.estado === "vendido") return -1;
            if (a.estado === "vendido" && b.estado === "disponible") return 1;
            return 0;
        });

        gatitosOrdenados.forEach(gatito => {
            const cardElement = document.createElement('div');
            cardElement.className = 'cat-card';

            // Lógica condicional de botones según tu campo "estado"
            let botonHTML = "";
            if (gatito.estado === "vendido") {
                cardElement.style.opacity = "0.7";
                botonHTML = `<button class="add-cart-btn" style="background-color: #d35400; cursor: not-allowed; box-shadow: none;" disabled>Vendido 🏡</button>`;
            } else if (gatito.reservado === true || gatito.reservado === "true") {
                cardElement.style.opacity = "0.8";
                botonHTML = `<button class="add-cart-btn" style="background-color: #7f8c8d; cursor: not-allowed; box-shadow: none;" disabled>Reservado 🔒</button>`;
            } else {
                botonHTML = `<button class="add-cart-btn" onclick="agregarAlCarrito('${gatito.nombre}')">Reservar</button>`;
            }

            // Inyección limpia: Ubica la píldora de Estado AL LADO del Género
            cardElement.innerHTML = `
                <div class="card-image">
                    <img src="${gatito.imagen}" alt="${gatito.nombre}" class="img-michi-galeria" style="cursor: pointer;">
                </div>
                <div class="card-content">
                    <h3>${gatito.nombre}</h3>
                    
                    <!-- 🏷️ SECCIÓN DE ETIQUETAS UNIFICADAS -->
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
                        <span class="badge ${gatito.badgeClass}">${gatito.genero}</span>
                        <span class="badge-estado" style="padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; 
                            background-color: ${gatito.estado === 'vendido' ? '#d35400' : '#38b000'}; color: white; display: inline-block;">
                            ${gatito.estado === 'vendido' ? 'En su nuevo hogar 🏡' : 'Disponible 🟢'}
                        </span>
                    </div>
                    
                    <p style="font-size: 0.95rem; font-weight: 700; color: var(--accent-color); margin: 6px 0;">
                        ⏳ Edad: ${gatito.edad}
                    </p>

                    <p>${gatito.descripcion}</p>

                    <p class="precio" style="font-weight: 800; font-size: 1.3rem; color: var(--text-color); margin: 8px 0 12px 0;">
                        $${gatito.precio.trim()}
                    </p>
                    
                    ${botonHTML}
                </div>
            `;

            // Atributos Data asíncronos para el carrusel de fotos
            const imgElement = cardElement.querySelector('.img-michi-galeria');
            imgElement.dataset.nombre = gatito.nombre;
            imgElement.dataset.galeria = JSON.stringify(gatito.galeria);

            imgElement.addEventListener('click', function () {
                const nombre = this.dataset.nombre;
                const galeriaFotos = JSON.parse(this.dataset.galeria);
                abrirGaleria(nombre, galeriaFotos);
            });

            gridContenedor.appendChild(cardElement);
        });

    } catch (error) {
        console.error("Error crítico en la API:", error);
        gridContenedor.innerHTML = `<p style="color:red; font-weight:bold;">⚠️ Error al cargar el catálogo de gatitos. Por favor, intente más tarde.</p>`;
    }
}

// ===================================================
// 4. CARGA DE GATITOS EN EL FORMULARIO
// ===================================================
function cargarGatitosEnFormulario() {
    const gatitos = JSON.parse(localStorage.getItem('gatitosReservados')) || [];
    const inputReserva = document.getElementById('reserva');
    if (inputReserva) {
        inputReserva.value = gatitos.length > 0 ? gatitos.join(', ') : "Ningún gatito seleccionado.";
    }
}

// ===================================================
// 5. VALIDACIÓN DE FORMULARIO Y ENVIO DE WHATSAPP
// ===================================================
function enviarWhatsApp(e) {
    e.preventDefault();

    // 🔴 CONFIGURACIÓN: Tu número de teléfono real
    const miTelefono = "5491123446028";

    const txtNombre = document.getElementById('nombre');
    const txtCorreo = document.getElementById('correo');
    const txtTelefono = document.getElementById('telefono');
    const txtReserva = document.getElementById('reserva');
    const txtMensaje = document.getElementById('mensaje');

    // Validar campos vacíos u obligatorios 
    if (txtNombre.value.trim() === "" || txtCorreo.value.trim() === "" || txtTelefono.value.trim() === "" || txtMensaje.value.trim() === "") {
        alert("❌ Por favor, completa todos los campos obligatorios del formulario.");
        return;
    }

    // Validar formato de Email mediante Expresión Regular (RegEx)
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionEmail.test(txtCorreo.value.trim())) {
        alert("❌ El formato del correo electrónico no es válido. Verifica que incluya '@' y un dominio correcto.");
        txtCorreo.focus();
        return;
    }

    // Validación del teléfono: verifica que solo tenga números y un largo coherente
    const expresionTelefono = /^[0-9]{8,15}$/;
    if (!expresionTelefono.test(txtTelefono.value.trim())) {
        alert("❌ Por favor, ingresa un número de teléfono válido (solo números, entre 8 y 15 dígitos).");
        txtTelefono.focus();
        return;
    }


    // Validación de seguridad por si olvide cambiar el teléfono por defecto
    if (miTelefono === "5491122334455") {
        alert("⚠️ Configuración incompleta: Modificá el número de teléfono en script.js");
        return;
    }

    // Si pasó todas las validaciones, procede con el armado del mensaje
    const textoMensaje = `¡Hola Criadero Gatitos Persas! 👋%0A%0AMi nombre es: *${encodeURIComponent(txtNombre.value)}*%0ACorreo: ${encodeURIComponent(txtCorreo.value)}%0ACelular Cliente: *${encodeURIComponent(txtTelefono.value)}*%0A%0AEstoy interesado en reservar: *${encodeURIComponent(txtReserva.value)}*%0A%0AMensaje adicional: ${encodeURIComponent(txtMensaje.value)}`;

    // Alerta de éxito en pantalla
    alert(`✨ ¡Gracias ${txtNombre.value}! Tus datos han sido validados correctamente!!.\n\nAl presionar ACEPTAR, se abrirá el chat oficial de WhatsApp. 🐾`);

    // Redirección segura anti-bloqueo
    const apiBase = "https:" + "//" + "wa.me" + "/";
    const urlFinal = new URL(apiBase + miTelefono);
    urlFinal.searchParams.append("text", decodeURIComponent(textoMensaje));

    // 🚀 MEJORA DE FLUJO: Abre WhatsApp en una pestaña nueva sin abandonar tu web
    window.open(urlFinal.href, '_blank');

    // Avisamos de forma prolija al usuario que la web sigue disponible de fondo
    alert("🟢 ¡Reserva enviada! El chat se abrió en una nueva pestaña de tu navegador. Podés seguir navegando en el criadero.");


    // Limpieza de estados
    localStorage.removeItem('gatitosReservados');
    document.getElementById('form-contacto').reset();
    document.getElementById('reserva').value = "Ningún gatito seleccionado.";

    // 🎯 REDIRECCIÓN COMPLETA: Devuelve al cliente directo al carrito vacío en disponibles.html
    window.location.href = "disponibles.html#carrito";
} // <-- ESTA ES LA LLAVE QUE FALTA PARA CERRAR LA FUNCIÓN ENVIARWHATSAPP
