import fs from "fs/promises"
import path from "path"

const ARCHIVO_TAREAS = path.join(process.cwd(), "tareas.json")

export async function cargarTareas() {
  try {
    const data = await fs.readFile(ARCHIVO_TAREAS, "utf8")
    return JSON.parse(data)
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(" Creando nuevo archivo de tareas...")
      await guardarTareas([])
      return []
    }
    console.error(" Error al cargar", error.message)
    return []
  }
}

export async function guardarTareas(tareas) {
  try {
    const data = JSON.stringify(tareas, null, 2)
    await fs.writeFile(ARCHIVO_TAREAS, data, "utf8")
    return true
  } catch (error) {
    console.error("Error al guardar:", error.message)
    return false
  }
}

export async function verificarArchivo() {
  try {
    await fs.access(ARCHIVO_TAREAS)
    return true
  } catch {
    return false
  }
}
