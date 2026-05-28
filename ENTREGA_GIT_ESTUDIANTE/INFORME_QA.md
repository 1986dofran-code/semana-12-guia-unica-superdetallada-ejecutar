# Informe QA - AgroDatos

Fecha de revision: 28 de mayo de 2026

## Datos del taller

| Campo | Informacion |
|---|---|
| Asignatura / modulo | Ejecutar el codigo de programacion del software |
| Tema | Diseno y ejecucion de pruebas, escenarios de uso y verificacion de interaccion |
| Modalidad | Individual con coevaluacion |
| Producto | Registro de bugs priorizado, correcciones aplicadas, comparacion antes/despues y plan de mejora |
| Nombre(s) | Doralba Franco |
| Proyecto revisado | AgroDatos - Panel de analisis de datos rurales |

## Desarrollo

El proyecto fue revisado como ejercicio de aseguramiento de calidad. Primero se comprobo la carga inicial, la consola, la navegacion, los filtros, la tabla, los indicadores y la vista movil. Despues se registraron los hallazgos, se priorizaron segun impacto, se aplicaron correcciones y se comparo el comportamiento antes y despues.

## Checklist QA

| ID | Revision | Resultado | Observaciones |
|---|---|---|---|
| QA-01 | El sitio abre correctamente en el navegador. | Si | El archivo `index.html` carga la estructura principal. |
| QA-02 | No aparecen errores rojos en la consola al cargar. | Si | `node --check` no reporto errores de sintaxis. La ejecucion simulada cargo 12 registros. |
| QA-03 | La navegacion entre secciones funciona. | Si | El enlace lleva al panel de analisis. Se agrego desplazamiento suave. |
| QA-04 | Los botones principales responden al clic. | Si | `Restablecer filtros` limpia busqueda y selectores. |
| QA-05 | Los formularios validan campos obligatorios. | No aplica | El proyecto no tiene formulario de envio; solo filtros. |
| QA-06 | Los mensajes de error son claros para el usuario. | Si | Cuando no hay resultados, se informa que no coinciden registros. |
| QA-07 | Los filtros o busquedas actualizan los datos correctamente. | Si | Categoria, vereda y busqueda actualizan tabla, KPIs e insight. |
| QA-08 | Las tablas o tarjetas muestran informacion coherente. | Si | Los valores se calculan desde cantidad por precio unitario. |
| QA-09 | La vista movil es usable y no se rompe el diseno. | Si | La tabla tiene desplazamiento horizontal y los paneles pasan a una columna. |
| QA-10 | Los colores, tamanos y espacios permiten buena lectura. | Si | Contraste y jerarquia visual adecuados. |
| QA-11 | No hay textos cortados, sobrepuestos o ilegibles. | Si | Se reforzo el ajuste de texto en KPIs y filas de analisis. |
| QA-12 | La funcionalidad principal del proyecto se puede demostrar. | Si | Se puede listar, filtrar, calcular indicadores y restablecer filtros. |

## Evidencias de revision

| Evidencia | Captura sugerida | Descripcion | Resultado |
|---|---|---|---|
| EV-01 | Captura 1 - Archivos de entrega en VS Code | Se evidencia la carpeta `ENTREGA_GIT_ESTUDIANTE` con `index.html`, `styles.css`, `script.js` e `INFORME_QA.md`. | La estructura solicitada para la entrega esta completa. |
| EV-02 | Captura 2 - Pagina cargada en navegador | Se observa la pagina principal de AgroDatos con tabla de registros rurales cargada. | El sitio abre correctamente y muestra informacion desde JavaScript. |
| EV-03 | Captura 3 - Consola del navegador | Se observa la consola abierta con el mensaje de Live Server y sin errores rojos. | No se evidencian errores criticos al cargar la pagina. |
| EV-04 | Captura 4 - Busqueda por `agricultura` | Se escribe `agricultura` en el campo Buscar y el panel muestra 4 registros, 136 unidades y valor total de $752.000. | La busqueda por categoria funciona despues de la correccion. |
| EV-05 | Captura 5 - Restablecer filtros | Despues de usar el boton `Restablecer filtros`, el panel vuelve a mostrar todos los registros. | El boton responde correctamente y recupera los 12 registros. |
| EV-06 | Captura 6 - Correccion semantica en `index.html` | Se observa el `caption` de la tabla y los encabezados `th` con `scope="col"`. | Se mejora la accesibilidad y estructura de la tabla. |
| EV-07 | Captura 7 - Datos en `script.js` | Se observan los registros almacenados en JavaScript con producto, categoria, productor, vereda, cantidad y precio. | La informacion base existe y permite alimentar tabla, filtros e indicadores. |

## Orden de capturas para anexar

| Orden | Nombre sugerido del archivo | Evidencia relacionada | Que muestra |
|---|---|---|---|
| 1 | `captura-01-archivos-entrega.png` | EV-01 | Carpeta `ENTREGA_GIT_ESTUDIANTE` con los archivos requeridos. |
| 2 | `captura-02-pagina-cargada.png` | EV-02 | Pagina AgroDatos cargada y tabla visible. |
| 3 | `captura-03-consola-sin-errores.png` | EV-03 | Consola del navegador sin errores rojos. |
| 4 | `captura-04-busqueda-agricultura.png` | EV-04 | Busqueda `agricultura` con 4 registros filtrados. |
| 5 | `captura-05-restablecer-filtros.png` | EV-05 | Panel restablecido con 12 registros. |
| 6 | `captura-06-correccion-index.png` | EV-06 | Codigo HTML con `caption` y `scope="col"`. |
| 7 | `captura-07-datos-script.png` | EV-07 | Registros almacenados en `script.js`. |
| 8 | `captura-08-vista-movil.png` | EV-08 opcional | Vista responsive en pantalla movil, si se toma la captura adicional. |

## Registro de bugs priorizado

| ID | Bug o hallazgo | Pasos para reproducir | Esperado | Obtenido | Prioridad | Evidencia |
|---|---|---|---|---|---|---|
| BUG-01 | La busqueda no incluia la categoria del producto. | Escribir `Agricultura` en el campo Buscar. | Ver registros de categoria Agricultura. | Antes no encontraba esos registros por texto. | Media | Afectaba una funcion principal de consulta, aunque el filtro por selector seguia disponible. Evidencia: `script.js`, funcion `obtenerDatosFiltrados`. |
| BUG-02 | La tabla no tenia `caption` para tecnologias de asistencia. | Revisar estructura HTML de la tabla. | La tabla debe tener una descripcion accesible. | Solo tenia encabezados visibles. | Media | Afectaba accesibilidad y comprension para lectores de pantalla. Evidencia: `index.html`, tabla de registros. |
| BUG-03 | Los encabezados de tabla no declaraban `scope="col"`. | Inspeccionar los elementos `th`. | Cada encabezado de columna debe indicar su alcance. | Los `th` no tenian atributo `scope`. | Baja | Mejoraba semantica y accesibilidad, sin bloquear el uso visual. Evidencia: `index.html`, encabezados de tabla. |
| BUG-04 | El enlace de navegacion no tenia foco visible especifico por teclado. | Navegar con Tab hasta el enlace del menu. | El foco debe ser claro. | Dependia del estilo por defecto del navegador. | Media | Afectaba navegacion por teclado y claridad de interaccion. Evidencia: `styles.css`, estilos de `.nav a`. |
| BUG-05 | Algunos textos largos en KPIs o analisis podian desbordarse en pantallas estrechas. | Reducir ancho de pantalla y usar textos largos. | El texto debe partir linea sin sobreponerse. | Existia riesgo de desborde. | Baja | Era un riesgo visual en responsive, sin bloquear la funcionalidad principal. Evidencia: `styles.css`, `.kpi span` y `.item-analisis__fila`. |

## Correcciones aplicadas

| ID bug | Archivo modificado | Correccion aplicada | Antes | Despues | Estado |
|---|---|---|---|---|---|
| BUG-01 | `script.js`, `index.html` | Se agrego `categoria` al texto buscable y se actualizo el placeholder. | Buscar `Agricultura` no coincidia por texto. | Buscar `Agricultura` muestra 4 registros. | Corregido |
| BUG-02 | `index.html`, `styles.css` | Se agrego `caption` oculto visualmente. | La tabla no tenia descripcion accesible. | La tabla tiene descripcion para lectores de pantalla. | Corregido |
| BUG-03 | `index.html` | Se agrego `scope="col"` a cada `th`. | Encabezados sin alcance semantico. | Encabezados asociados a sus columnas. | Corregido |
| BUG-04 | `styles.css` | Se agrego `:focus-visible` al enlace de navegacion. | Foco poco evidente. | Foco claro con contorno visible. | Corregido |
| BUG-05 | `styles.css` | Se agrego ajuste de texto en KPIs y envoltura en filas de analisis. | Riesgo de texto cortado o sobrepuesto. | Los textos largos pueden ajustarse en varias lineas. | Corregido |

## Comparacion antes y despues

| Caso | Antes de corregir | Cambio realizado | Despues de corregir | Evidencia |
|---|---|---|---|---|
| 1 | La busqueda no encontraba registros al escribir una categoria. | Se incluyo `registro.categoria` en `textoRegistro`. | Buscar `Agricultura` devuelve 4 registros. | Prueba con DOM simulado: `busqueda categoria Agricultura: 4`. |
| 2 | La tabla tenia menor informacion semantica. | Se agregaron `caption` y `scope="col"`. | Mejora la lectura con tecnologias de asistencia. | Revision de `index.html`. |
| 3 | El foco de navegacion por teclado no estaba personalizado. | Se agrego `.nav a:focus-visible`. | El usuario ve claramente el enlace activo al usar Tab. | Revision de `styles.css`. |

## Plan de mejora

| ID | Mejora propuesta | Justificacion | Prioridad | Responsable | Fecha estimada |
|---|---|---|---|---|---|
| M-01 | Agregar boton para exportar la tabla filtrada. | Facilita entregar resultados del analisis. | Media | Equipo propietario | Proxima entrega |
| M-02 | Agregar pruebas automatizadas simples para filtros y KPIs. | Evita regresiones al modificar JavaScript. | Alta | Equipo propietario | Proxima entrega |
| M-03 | Incluir grafico visual por vereda. | Mejora la comprension de los datos. | Media | Equipo propietario | Dos entregas |
| M-04 | Agregar mensaje de ayuda sobre como combinar filtros. | Reduce confusion en usuarios nuevos. | Baja | Equipo propietario | Dos entregas |

## Coevaluacion entre pares

| Criterio | 1 Bajo | 2 Basico | 3 Alto | 4 Superior | Comentario |
|---|---|---|---|---|---|
| La retroalimentacion fue clara y respetuosa. |  |  |  | X | Los hallazgos se describen con pasos y sin descalificar el trabajo. |
| Los bugs tienen pasos para reproducir. |  |  | X |  | Cada hallazgo tiene accion verificable. |
| Las prioridades fueron justificadas. |  |  | X |  | Se priorizo segun impacto en usuario y accesibilidad. |
| Las correcciones aplicadas responden a los bugs. |  |  |  | X | Cada correccion esta asociada a un bug. |
| La comparacion antes/despues es comprensible. |  |  | X |  | Se explica el comportamiento anterior y el resultado final. |

## Reflexion final

- Bug mas importante: BUG-01, porque afectaba la busqueda y podia confundir al usuario al no encontrar una categoria existente.
- Aprendizaje al recibir retroalimentacion: probar con pasos concretos ayuda a mejorar sin depender de opiniones generales.
- Correccion con mayor mejora: incluir categoria en la busqueda, porque amplia la funcionalidad principal.
- Diferencia entre bug y mejora futura: un bug es un comportamiento incorrecto o incompleto frente a lo esperado; una mejora futura agrega valor sin bloquear el uso actual.
- Comprobacion de la correccion: se ejecuto una prueba con DOM simulado; el proyecto cargo 12 registros, buscar `Agricultura` mostro 4 y restablecer volvio a 12.
- Proxima entrega incremental: incluir pruebas automaticas basicas desde el inicio.
