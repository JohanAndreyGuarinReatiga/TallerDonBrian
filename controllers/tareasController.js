import inquirer from "inquirer"
import _ from "lodash"
import { tareas } from "../data/tareas.js"
import { guardarTareas } from "../utils/archivo.js"

async function sincronizarArchivo() {
  const guardado = await guardarTareas(tareas)
  if (!guardado) {
    console.log("No se pudo guardar en archivo")
  }
}

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: "input",
      name: "descripcion",
      message: "Descripción de la tarea:",
      validate: (input) => {
        // MEJORA 3: Validar con _.isEmpty
        if (_.isEmpty(input.trim())) {
          return "La descripción no puede estar vacía"
        }
        return true
      },
    },
  ])

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false,
    fechaCreacion: new Date().toISOString(),
  }

  tareas.push(nueva)
  
  // MEJORA 4: Eliminar duplicados con _.uniqBy
  const tareasSinDuplicados = _.uniqBy(tareas, 'descripcion')
  tareas.length = 0
  tareas.push(...tareasSinDuplicados)
  
  await sincronizarArchivo()
  console.log("Tarea agregada y guardada.")
}

// ✅ CORRECCIÓN: Cambiar a async function
export async function listarTareas() {
  if (tareas.length === 0) {
    console.log(" No hay tareas registradas.")
    return
  }

  // MEJORA 2: Agregar opción de búsqueda
  const { opcionFiltro } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionFiltro",
      message: "¿Qué tareas desea ver?",
      choices: [
        { name: "Todas las tareas", value: "todas" },
        { name: "Solo completadas", value: "completadas" },
        { name: "Solo pendientes", value: "pendientes" },
        { name: "Buscar por palabra clave", value: "buscar" },
      ],
    },
  ])

  let tareasFiltradas = tareas

  if (opcionFiltro === "completadas") {
    tareasFiltradas = _.filter(tareas, { completada: true })
  } else if (opcionFiltro === "pendientes") {
    tareasFiltradas = _.filter(tareas, { completada: false })
  } else if (opcionFiltro === "buscar") {
    // MEJORA 2: Buscar por palabra clave
    const { palabraClave } = await inquirer.prompt([
      {
        type: "input",
        name: "palabraClave",
        message: "Ingrese la palabra clave:",
        validate: (input) => _.isEmpty(input.trim()) ? "Debe ingresar una palabra clave" : true
      }
    ])
    
    tareasFiltradas = _.filter(tareas, (tarea) => 
      _.includes(_.toLower(tarea.descripcion), _.toLower(palabraClave.trim()))
    )
  }

  if (tareasFiltradas.length === 0) {
    console.log(" No se encontraron tareas.")
    return
  }

  // MEJORA 1: Agrupar por estado con _.groupBy
  const tareasAgrupadas = _.groupBy(tareasFiltradas, 'completada')
  
  console.log(" Lista de tareas:")
  
  if (tareasAgrupadas[false]) {
    console.log("\n🔄 PENDIENTES:")
    tareasAgrupadas[false].forEach((tarea, i) => {
      const fecha = new Date(tarea.fechaCreacion).toLocaleDateString()
      console.log(`${i + 1}. [❌] ${tarea.descripcion} (${fecha})`)
    })
  }
  
  if (tareasAgrupadas[true]) {
    console.log("\n✅ COMPLETADAS:")
    tareasAgrupadas[true].forEach((tarea, i) => {
      const fecha = new Date(tarea.fechaCreacion).toLocaleDateString()
      console.log(`${i + 1}. [✅] ${tarea.descripcion} (${fecha})`)
    })
  }
}

export async function editarTarea() {
  if (tareas.length === 0) {
    console.log("No hay tareas para editar.")
    return
  }

  const { indice } = await inquirer.prompt([
    {
      type: "list",
      name: "indice",
      message: "Seleccione una tarea para editar:",
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} ${t.completada ? "✅" : "❌"}`,
        value: i,
      })),
    },
  ])

  const { accion } = await inquirer.prompt([
    {
      type: "list",
      name: "accion",
      message: "Qué quiere hacer?",
      choices: [
        { name: "Editar descripción", value: "descripcion" },
        { name: "Cambiar estado (completada/pendiente)", value: "estado" },
      ],
    },
  ])

  if (accion === "descripcion") {
    const { nuevaDescripcion } = await inquirer.prompt([
      {
        type: "input",
        name: "nuevaDescripcion",
        message: "Nueva descripción:",
        default: tareas[indice].descripcion,
        validate: (input) => {
          // MEJORA 3: Validar con _.isEmpty
          if (_.isEmpty(input.trim())) {
            return "La descripción no puede estar vacía"
          }
          return true
        },
      },
    ])
    tareas[indice].descripcion = nuevaDescripcion.trim()
    console.log(" Descripción actualizada.")
  } else {
    tareas[indice].completada = !tareas[indice].completada
    const estado = tareas[indice].completada ? "completada" : "pendiente"
    console.log(` Tarea marcada como ${estado}.`)
  }

  await sincronizarArchivo()
}

export async function eliminarTarea() {
  if (tareas.length === 0) {
    console.log(" No hay tareas para eliminar.")
    return
  }

  const { indice } = await inquirer.prompt([
    {
      type: "list",
      name: "indice",
      message: "Seleccione una tarea para eliminar:",
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} ${t.completada ? "✅" : "❌"}`,
        value: i,
      })),
    },
  ])

  const { confirmar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmar",
      message: `¿Está seguro de eliminar "${tareas[indice].descripcion}"?`,
      default: false,
    },
  ])

  if (confirmar) {
    tareas.splice(indice, 1)
    await sincronizarArchivo()
    console.log(" Tarea eliminada y cambios guardados.")
  } else {
    console.log(" Eliminación cancelada.")
  }
}

export async function marcarCompletada() {
  // MEJORA 2: Usar _.filter
  const tareasCompletables = _.filter(tareas, { completada: false })

  if (tareasCompletables.length === 0) {
    console.log("Todas las tareas ya están hechas")
    return
  }

  const { indice } = await inquirer.prompt([
    {
      type: "list",
      name: "indice",
      message: "Seleccione una tarea para marcar como completada:",
      choices: tareasCompletables.map((t) => ({
        name: t.descripcion,
        value: tareas.findIndex((tarea) => tarea.id === t.id),
      })),
    },
  ])

  tareas[indice].completada = true
  await sincronizarArchivo()
  console.log(" Tarea completada y guardada.")
}