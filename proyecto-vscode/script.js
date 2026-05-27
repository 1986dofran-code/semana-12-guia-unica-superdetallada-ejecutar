/*
  StudyFlow - Laboratorio de pruebas de interacción

  Archivo corregido para evitar errores en consola y mantener
  funcionando el formulario, los filtros y los contadores.
*/

document.addEventListener("DOMContentLoaded", function () {
  iniciarAplicacion();
});

function iniciarAplicacion() {
  const formulario = obtenerElemento("#formTareas");
  const nombreTarea = obtenerElemento("#nombreTarea");
  const asignatura = obtenerElemento("#asignatura");
  const fechaEntrega = obtenerElemento("#fechaEntrega");
  const prioridad = obtenerElemento("#prioridad");

  const errorNombre = obtenerElemento("#errorNombre");
  const errorAsignatura = obtenerElemento("#errorAsignatura");
  const errorFecha = obtenerElemento("#errorFecha");
  const errorPrioridad = obtenerElemento("#errorPrioridad");

  const mensajeGeneral = obtenerElemento("#mensajeGeneral");
  const listaTareas = obtenerElemento("#listaTareas");

  const totalTareas = obtenerElemento("#totalTareas");
  const totalPendientes = obtenerElemento("#totalPendientes");
  const totalCompletadas = obtenerElemento("#totalCompletadas");

  const btnLimpiarFormulario = obtenerElemento("#btnLimpiarFormulario");
  const btnLimpiarCompletadas = obtenerElemento("#btnLimpiarCompletadas");
  const botonesFiltro = document.querySelectorAll(".filtro");

  const elementosRequeridos = [
    formulario,
    nombreTarea,
    asignatura,
    fechaEntrega,
    prioridad,
    errorNombre,
    errorAsignatura,
    errorFecha,
    errorPrioridad,
    mensajeGeneral,
    listaTareas,
    totalTareas,
    totalPendientes,
    totalCompletadas,
    btnLimpiarFormulario,
    btnLimpiarCompletadas,
  ];

  if (elementosRequeridos.includes(null)) {
    console.error(
      "StudyFlow no pudo iniciar porque faltan elementos del HTML. Revise los IDs marcados arriba."
    );
    return;
  }

  let tareas = [];
  let filtroActual = "todas";

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    if (formularioEsValido()) {
      agregarTarea();
      formulario.reset();
      mostrarMensaje("Tarea agregada correctamente.", "exito");
    } else {
      mostrarMensaje("Revisa los campos marcados.", "alerta");
    }
  });

  btnLimpiarFormulario.addEventListener("click", function () {
    formulario.reset();
    limpiarErrores();
    mostrarMensaje("", "");
  });

  btnLimpiarCompletadas.addEventListener("click", function () {
    tareas = tareas.filter(function (tarea) {
      return !tarea.completada;
    });

    dibujarTareas();
    actualizarContadores();
    mostrarMensaje("Se limpiaron las tareas completadas.", "exito");
  });

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
      filtroActual = boton.dataset.filtro;

      botonesFiltro.forEach(function (item) {
        item.classList.remove("activo");
      });

      boton.classList.add("activo");
      dibujarTareas();
    });
  });

  listaTareas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-accion]");

    if (!boton) {
      return;
    }

    const id = Number(boton.dataset.id);

    if (boton.dataset.accion === "completar") {
      cambiarEstado(id);
    }

    if (boton.dataset.accion === "eliminar") {
      eliminarTarea(id);
    }
  });

  function formularioEsValido() {
    let esValido = true;

    if (nombreTarea.value.trim() === "") {
      errorNombre.textContent = "Escribe el nombre de la tarea.";
      esValido = false;
    }

    if (asignatura.value === "") {
      errorAsignatura.textContent = "Selecciona una asignatura.";
      esValido = false;
    }

    if (fechaEntrega.value === "") {
      errorFecha.textContent = "Selecciona una fecha de entrega.";
      esValido = false;
    } else {
      const hoy = obtenerFechaHoy();

      if (fechaEntrega.value < hoy) {
        errorFecha.textContent = "La fecha no puede ser anterior a hoy.";
        esValido = false;
      }
    }

    if (prioridad.value === "") {
      errorPrioridad.textContent = "Selecciona una prioridad.";
      esValido = false;
    }

    return esValido;
  }

  function obtenerFechaHoy() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  }

  function agregarTarea() {
    const nuevaTarea = {
      id: Date.now(),
      nombre: nombreTarea.value.trim(),
      asignatura: asignatura.value,
      fecha: fechaEntrega.value,
      prioridad: prioridad.value,
      completada: false,
    };

    tareas.push(nuevaTarea);
    dibujarTareas();
    actualizarContadores();
  }

  function dibujarTareas() {
    listaTareas.innerHTML = "";

    const tareasFiltradas = obtenerTareasFiltradas();

    if (tareasFiltradas.length === 0) {
      listaTareas.innerHTML = "<li class='tarea'>No hay tareas para mostrar.</li>";
      return;
    }

    tareasFiltradas.forEach(function (tarea) {
      const item = document.createElement("li");
      item.className = tarea.completada ? "tarea completada" : "tarea";

      item.innerHTML = `
        <div>
          <h3 class="tarea__titulo">${tarea.nombre}</h3>
          <p class="tarea__meta">
            Asignatura: ${tarea.asignatura} ·
            Fecha: ${tarea.fecha} ·
            Prioridad: ${tarea.prioridad}
          </p>
        </div>
        <div class="tarea__acciones">
          <button class="boton secundario" type="button" data-accion="completar" data-id="${tarea.id}">
            ${tarea.completada ? "Marcar pendiente" : "Completar"}
          </button>
          <button class="boton peligro" type="button" data-accion="eliminar" data-id="${tarea.id}">
            Eliminar
          </button>
        </div>
      `;

      listaTareas.appendChild(item);
    });
  }

  function cambiarEstado(id) {
    const tarea = tareas.find(function (item) {
      return item.id === id;
    });

    if (tarea) {
      tarea.completada = !tarea.completada;
      dibujarTareas();
      actualizarContadores();
    }
  }

  function eliminarTarea(id) {
    tareas = tareas.filter(function (tarea) {
      return tarea.id !== id;
    });

    dibujarTareas();
    actualizarContadores();
    mostrarMensaje("Tarea eliminada.", "exito");
  }

  function obtenerTareasFiltradas() {
    if (filtroActual === "pendientes") {
      return tareas.filter(function (tarea) {
        return !tarea.completada;
      });
    }

    if (filtroActual === "completadas") {
      return tareas.filter(function (tarea) {
        return tarea.completada;
      });
    }

    return tareas;
  }

  function actualizarContadores() {
    const completadas = tareas.filter(function (tarea) {
      return tarea.completada;
    }).length;

    const pendientes = tareas.length - completadas;

    totalTareas.textContent = tareas.length;
    totalPendientes.textContent = pendientes;
    totalCompletadas.textContent = completadas;
  }

  function limpiarErrores() {
    errorNombre.textContent = "";
    errorAsignatura.textContent = "";
    errorFecha.textContent = "";
    errorPrioridad.textContent = "";
  }

  function mostrarMensaje(texto, tipo) {
    mensajeGeneral.textContent = texto;

    if (tipo === "") {
      mensajeGeneral.className = "mensaje";
    } else {
      mensajeGeneral.className = `mensaje ${tipo}`;
    }
  }
}

function obtenerElemento(selector) {
  const elemento = document.querySelector(selector);

  if (!elemento) {
    console.error(`No se encontro el elemento ${selector}.`);
  }

  return elemento;
}
