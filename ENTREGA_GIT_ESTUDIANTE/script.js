const registros = [
  {
    producto: "Café campesino",
    categoria: "Agricultura",
    productor: "Familia Gómez",
    vereda: "El Progreso",
    cantidad: 25,
    precioUnitario: 18000
  },
  {
    producto: "Miel artesanal",
    categoria: "Alimentos",
    productor: "Asociación Dulce Campo",
    vereda: "La Esperanza",
    cantidad: 18,
    precioUnitario: 22000
  },
  {
    producto: "Panela orgánica",
    categoria: "Alimentos",
    productor: "Trapiche San Miguel",
    vereda: "El Progreso",
    cantidad: 30,
    precioUnitario: 9000
  },
  {
    producto: "Leche fresca",
    categoria: "Ganadería",
    productor: "Finca Los Pinos",
    vereda: "Santa Rita",
    cantidad: 40,
    precioUnitario: 3500
  },
  {
    producto: "Queso campesino",
    categoria: "Alimentos",
    productor: "Familia Rodríguez",
    vereda: "Santa Rita",
    cantidad: 16,
    precioUnitario: 16000
  },
  {
    producto: "Huevos criollos",
    categoria: "Avicultura",
    productor: "Granja La Aurora",
    vereda: "La Esperanza",
    cantidad: 60,
    precioUnitario: 700
  },
  {
    producto: "Tomate larga vida",
    categoria: "Agricultura",
    productor: "Cultivos El Lago",
    vereda: "San Isidro",
    cantidad: 35,
    precioUnitario: 2800
  },
  {
    producto: "Arequipe artesanal",
    categoria: "Alimentos",
    productor: "Dulces del Valle",
    vereda: "El Progreso",
    cantidad: 20,
    precioUnitario: 12000
  },
  {
    producto: "Plátano hartón",
    categoria: "Agricultura",
    productor: "Familia Martínez",
    vereda: "San Isidro",
    cantidad: 48,
    precioUnitario: 1800
  },
  {
    producto: "Yogur natural",
    categoria: "Ganadería",
    productor: "Lácteos Santa Rita",
    vereda: "Santa Rita",
    cantidad: 22,
    precioUnitario: 6500
  },
  {
    producto: "Artesanías en fique",
    categoria: "Artesanías",
    productor: "Manos de la Montaña",
    vereda: "La Esperanza",
    cantidad: 12,
    precioUnitario: 28000
  },
  {
    producto: "Mora fresca",
    categoria: "Agricultura",
    productor: "Cultivos La Cumbre",
    vereda: "El Progreso",
    cantidad: 28,
    precioUnitario: 4200
  }
];

const tablaDatos = document.querySelector("#tablaDatos");
const busqueda = document.querySelector("#busqueda");
const filtroCategoria = document.querySelector("#filtroCategoria");
const filtroVereda = document.querySelector("#filtroVereda");
const btnRestablecer = document.querySelector("#btnRestablecer");

const estadoFiltros = document.querySelector("#estadoFiltros");

const kpiRegistros = document.querySelector("#kpiRegistros");
const kpiUnidades = document.querySelector("#kpiUnidades");
const kpiValor = document.querySelector("#kpiValor");
const kpiPromedio = document.querySelector("#kpiPromedio");
const kpiCategoria = document.querySelector("#kpiCategoria");
const kpiVereda = document.querySelector("#kpiVereda");

const insightPrincipal = document.querySelector("#insightPrincipal");
const listaCategorias = document.querySelector("#listaCategorias");

busqueda.addEventListener("input", actualizarPanel);
filtroCategoria.addEventListener("change", actualizarPanel);
filtroVereda.addEventListener("change", actualizarPanel);

btnRestablecer.addEventListener("click", function () {
  busqueda.value = "";
  filtroCategoria.value = "todas";
  filtroVereda.value = "todas";
  actualizarPanel();
});

iniciarAplicacion();

function iniciarAplicacion() {
  cargarOpcionesDeFiltros();
  actualizarPanel();
}

function actualizarPanel() {
  const datosFiltrados = obtenerDatosFiltrados();
  const metricas = calcularMetricas(datosFiltrados);

  actualizarEstadoFiltros(datosFiltrados.length);
  mostrarKpis(metricas);
  mostrarInsight(metricas);
  mostrarValorPorCategoria(datosFiltrados, metricas.valorTotal);
  mostrarTabla(datosFiltrados);
}

function cargarOpcionesDeFiltros() {
  const categorias = obtenerValoresUnicos("categoria");
  const veredas = obtenerValoresUnicos("vereda");

  categorias.forEach(function (categoria) {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    filtroCategoria.appendChild(opcion);
  });

  veredas.forEach(function (vereda) {
    const opcion = document.createElement("option");
    opcion.value = vereda;
    opcion.textContent = vereda;
    filtroVereda.appendChild(opcion);
  });
}

function obtenerValoresUnicos(campo) {
  const valores = registros.map(function (registro) {
    return registro[campo];
  });

  const unicos = new Set(valores);

  return Array.from(unicos).sort();
}

function obtenerDatosFiltrados() {
  const texto = normalizarTexto(busqueda.value);
  const categoriaSeleccionada = filtroCategoria.value;
  const veredaSeleccionada = filtroVereda.value;

  return registros.filter(function (registro) {
    const textoRegistro = normalizarTexto(
      `${registro.producto} ${registro.categoria} ${registro.productor} ${registro.vereda}`
    );

    const coincideTexto = textoRegistro.includes(texto);

    const coincideCategoria =
      categoriaSeleccionada === "todas" ||
      registro.categoria === categoriaSeleccionada;

    const coincideVereda =
      veredaSeleccionada === "todas" ||
      registro.vereda === veredaSeleccionada;

    return coincideTexto && coincideCategoria && coincideVereda;
  });
}

function calcularMetricas(datos) {
  const totalRegistros = datos.length;

  const totalUnidades = datos.reduce(function (acumulado, registro) {
    return acumulado + registro.cantidad;
  }, 0);

  const valorTotal = datos.reduce(function (acumulado, registro) {
    return acumulado + calcularValorRegistro(registro);
  }, 0);

  const precioPromedio =
    totalRegistros === 0
      ? 0
      : datos.reduce(function (acumulado, registro) {
          return acumulado + registro.precioUnitario;
        }, 0) / totalRegistros;

  const categoriaLider = obtenerLiderPorCampo(datos, "categoria");
  const veredaLider = obtenerLiderPorCampo(datos, "vereda");

  return {
    totalRegistros,
    totalUnidades,
    valorTotal,
    precioPromedio,
    categoriaLider,
    veredaLider
  };
}

function obtenerLiderPorCampo(datos, campo) {
  if (datos.length === 0) {
    return null;
  }

  const resumen = {};

  datos.forEach(function (registro) {
    const clave = registro[campo];

    if (!resumen[clave]) {
      resumen[clave] = 0;
    }

    resumen[clave] += calcularValorRegistro(registro);
  });

  let lider = null;

  Object.keys(resumen).forEach(function (clave) {
    if (lider === null || resumen[clave] > lider.valor) {
      lider = {
        nombre: clave,
        valor: resumen[clave]
      };
    }
  });

  return lider;
}

function mostrarKpis(metricas) {
  kpiRegistros.textContent = metricas.totalRegistros;
  kpiUnidades.textContent = metricas.totalUnidades;
  kpiValor.textContent = formatearMoneda(metricas.valorTotal);
  kpiPromedio.textContent = formatearMoneda(metricas.precioPromedio);

  kpiCategoria.textContent = metricas.categoriaLider
    ? metricas.categoriaLider.nombre
    : "Sin datos";

  kpiVereda.textContent = metricas.veredaLider
    ? metricas.veredaLider.nombre
    : "Sin datos";
}

function actualizarEstadoFiltros(cantidad) {
  const partes = [];

  if (busqueda.value.trim() !== "") {
    partes.push(`búsqueda: "${busqueda.value.trim()}"`);
  }

  if (filtroCategoria.value !== "todas") {
    partes.push(`categoría: ${filtroCategoria.value}`);
  }

  if (filtroVereda.value !== "todas") {
    partes.push(`vereda: ${filtroVereda.value}`);
  }

  if (partes.length === 0) {
    estadoFiltros.textContent = `Mostrando todos los registros (${cantidad}).`;
  } else {
    estadoFiltros.textContent = `Mostrando ${cantidad} registro(s) con ${partes.join(", ")}.`;
  }
}

function mostrarInsight(metricas) {
  if (metricas.totalRegistros === 0) {
    insightPrincipal.textContent =
      "No hay registros para analizar con los filtros actuales. Restablezca los filtros o pruebe otra búsqueda.";
    return;
  }

  const categoria = metricas.categoriaLider
    ? metricas.categoriaLider.nombre
    : "sin categoría";

  const vereda = metricas.veredaLider
    ? metricas.veredaLider.nombre
    : "sin vereda";

  insightPrincipal.textContent =
    `Se analizaron ${metricas.totalRegistros} registro(s). ` +
    `La categoría con mayor valor estimado es ${categoria} ` +
    `y la vereda con mayor aporte es ${vereda}.`;
}

function mostrarValorPorCategoria(datos, valorTotalGeneral) {
  listaCategorias.innerHTML = "";

  if (datos.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay categorías para mostrar.";
    listaCategorias.appendChild(mensaje);
    return;
  }

  const resumen = agruparPorCategoria(datos);

  resumen.forEach(function (item) {
    const porcentaje =
      valorTotalGeneral === 0 ? 0 : (item.valor / valorTotalGeneral) * 100;

    const elemento = document.createElement("div");
    const fila = document.createElement("div");
    const categoria = document.createElement("span");
    const valor = document.createElement("span");
    const barra = document.createElement("div");
    const relleno = document.createElement("span");

    elemento.className = "item-analisis";
    fila.className = "item-analisis__fila";
    barra.className = "barra";
    barra.setAttribute("aria-hidden", "true");
    relleno.className = "barra__relleno";
    relleno.style.width = `${porcentaje}%`;

    categoria.textContent = item.categoria;
    valor.textContent = formatearMoneda(item.valor);

    fila.append(categoria, valor);
    barra.appendChild(relleno);
    elemento.append(fila, barra);
    listaCategorias.appendChild(elemento);
  });
}

function agruparPorCategoria(datos) {
  const resumen = {};

  datos.forEach(function (registro) {
    if (!resumen[registro.categoria]) {
      resumen[registro.categoria] = {
        categoria: registro.categoria,
        valor: 0
      };
    }

    resumen[registro.categoria].valor += calcularValorRegistro(registro);
  });

  return Object.values(resumen).sort(function (a, b) {
    return b.valor - a.valor;
  });
}

function mostrarTabla(datos) {
  tablaDatos.innerHTML = "";

  if (datos.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 7;
    celda.textContent = "No hay registros que coincidan con los filtros aplicados.";
    fila.appendChild(celda);
    tablaDatos.appendChild(fila);
    return;
  }

  datos.forEach(function (registro) {
    const fila = document.createElement("tr");
    const celdas = [
      registro.producto,
      registro.categoria,
      registro.productor,
      registro.vereda,
      registro.cantidad,
      formatearMoneda(registro.precioUnitario),
      formatearMoneda(calcularValorRegistro(registro))
    ];

    celdas.forEach(function (valor) {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.appendChild(celda);
    });

    tablaDatos.appendChild(fila);
  });
}

function calcularValorRegistro(registro) {
  return registro.cantidad * registro.precioUnitario;
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
