let datos = [];
let datosFiltrados = [];

// Cargar JSON dinámicamente
function cargarDatos(archivo) {
  fetch(archivo)
    .then(res => res.json())
    .then(data => {
      datos = data;
      datosFiltrados = data;
      mostrarResultados();
    })
    .catch(err => {
      console.error("Error al cargar JSON:", err);
    });
}

// Mostrar datos en pantalla
function mostrarResultados() {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (datosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>❌ No se encontraron resultados</p>";
    return;
  }

  datosFiltrados.forEach(item => {
    let html = `<h2>${item.marca} - ${item.modelo || ""}</h2>`;

    if (item.errores) {
      html += "<h3>Errores comunes:</h3><ul>";
      item.errores.forEach(err => {
        html += `<li><strong>${err.descripcion}:</strong> ${err.solucion} <br> <em>${err.notas || ""}</em></li>`;
      });
      html += "</ul>";
    }

    if (item.versiones) {
      html += "<h3>Actualizaciones BIOS:</h3><ul>";
      item.versiones.forEach(bios => {
        html += `<li><strong>Versión ${bios.version} (${bios.fecha}):</strong> ${bios.descripcion}<br>`;
        html += "<em>Instrucciones:</em><ul>";
        bios.instrucciones.forEach(paso => {
          html += `<li>${paso}</li>`;
        });
        html += "</ul></li>";
      });
      html += "</ul>";
    }

    contenedor.innerHTML += `<div class="card">${html}</div><hr>`;
  });
}

// Filtrar resultados con el buscador
function buscar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  datosFiltrados = datos.filter(item =>
    (item.marca && item.marca.toLowerCase().includes(texto)) ||
    (item.modelo && item.modelo.toLowerCase().includes(texto)) ||
    (item.errores && item.errores.some(e => e.descripcion.toLowerCase().includes(texto)))
  );
  mostrarResultados();
}
