// ===================================================
// MOTOR LÓGICO EXCLUSIVO: PANEL ADMINISTRADOR        
// ===================================================

function verificarClave() {
    const claveInput = document.getElementById('pass-admin').value;
    if (claveInput === "micho123") {
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('panel-carga').style.display = 'block';
    } else {
        alert("❌ Contraseña incorrecta.");
    }
}

function actualizarBadge() {
    const genero = document.getElementById('michi-genero').value;
    document.getElementById('michi-badge').value = (genero === "Macho") ? "boy" : "girl";
}

function generarCodigoJSON(e) {
    e.preventDefault();
    const nombre = document.getElementById('michi-nombre').value.trim();
    const genero = document.getElementById('michi-genero').value;
    const badge = document.getElementById('michi-badge').value;
    const edad = document.getElementById('michi-edad').value.trim();
    const precio = document.getElementById('michi-precio').value;
    const desc = document.getElementById('michi-descripcion').value.trim();
    const numFoto = document.getElementById('michi-foto').value;

    const nuevoGatitoJSON = `,
{
    "id": ${Date.now()},
    "nombre": "${nombre}",
    "genero": "${genero}",
    "badgeClass": "${badge}",
    "edad": "${edad}",
    "precio": ${precio},
    "descripcion": "${desc}",
    "imagen": "IMG/gatito_${numFoto}.jpeg",
    "galeria": [
        "IMG/gatito${numFoto}_foto1.jpeg",
        "IMG/gatito${numFoto}_foto2.jpeg",
        "IMG/gatito${numFoto}_foto3.jpeg",
        "IMG/gatito${numFoto}_foto4.jpeg",
        "IMG/gatito${numFoto}_foto5.jpeg"
    ],
    "reservado": false
}`;

    const txtArea = document.getElementById('json-resultado');
    txtArea.value = nuevoGatitoJSON;
    txtArea.style.display = 'block';
    txtArea.select();
    alert("✨ ¡Código comercial generado y seleccionado!");
}
