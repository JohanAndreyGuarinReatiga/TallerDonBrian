import { cargarTareas } from "../utils/archivo.js"

export const tareas = await cargarTareas()

export function actualizarTareas(nuevasTareas) {
  tareas.length = 0
  tareas.push(...nuevasTareas)
}
