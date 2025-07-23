import inquirer from "inquirer"

export default async function mostrarMenu() {
  console.log("\n" + "=".repeat(40))
  console.log(" GESTOR DE TAREAS")
  console.log("=".repeat(40))

  const { opcion } = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "Seleccione una opción:",
      choices: [
        { name: "Agregar tarea", value: "1" },
        { name: "Listar tareas", value: "2" },
        { name: "Editar tarea", value: "3" },
        { name: "Marcar completada", value: "4" },
        { name: "Eliminar tarea", value: "5" },
        { name: "Salirse", value: "6" },
      ],
    },
  ])
  return opcion
}
