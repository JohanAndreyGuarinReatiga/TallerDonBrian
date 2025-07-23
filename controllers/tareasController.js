import inquirer from "inquirer"
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
        if (!input.trim()) {
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
  await sincronizarArchivo()
  console.log("Tarea agregada y guardada.")
}

export function listarTareas() {
  if (tareas.length === 0) {
    console.log(" No hay tareas registradas.")
    return
  }

  console.log(" Lista de tareas:")
  tareas.forEach((tarea, i) => {
    const estado = tarea.completada ? "✅" : "❌"
    const fecha = new Date(tarea.fechaCreacion).toLocaleDateString()
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion} (${fecha})`)
  })
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
          if (!input.trim()) {
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
  const pendientes = tareas.filter((t) => !t.completada)

  if (pendientes.length === 0) {
    console.log("Todas las tareas ya están hechas")
    return
  }

  const { indice } = await inquirer.prompt([
    {
      type: "list",
      name: "indice",
      message: "Seleccione una tarea para marcar como completada:",
      choices: pendientes.map((t) => ({
        name: t.descripcion,
        value: tareas.findIndex((tarea) => tarea.id === t.id),
      })),
    },
  ])

  tareas[indice].completada = true
  await sincronizarArchivo()
  console.log(" Tarea completada y guardada.")
}
