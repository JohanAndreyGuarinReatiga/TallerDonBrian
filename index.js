import mostrarMenu from "./utils/menu.js"
import {
  listarTareas,
  agregarTarea,
  editarTarea,
  eliminarTarea,
  marcarCompletada,
} from "./controllers/tareasController.js"

async function main() {
  console.log("Iniciando Gestor de Tareas...")

  let salir = false

  while (!salir) {
    const opcion = await mostrarMenu()

    switch (opcion) {
      case "1":
        await agregarTarea()
        break
      case "2":
        await listarTareas()
        break
      case "3":
        await editarTarea()
        break
      case "4":
        await marcarCompletada()
        break
      case "5":
        await eliminarTarea()
        break
      case "6":
        salir = true
        console.log("Don Brian se va poner feliz")
        console.log("Todas las tareas se guardaron")
        console.log("Chao")
        break
    }

    if (!salir) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Presione Enter para continuar...")
          process.stdin.once("data", resolve)
        }, 1000)
      })
    }
  }
}

main().catch(console.error)
