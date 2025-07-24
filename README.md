# 📋 Gestor de Tareas CLI - TallerDonBrian

### **Sistema de gestión de tareas por consola con persistencia y Lodash**

> Un sistema CLI profesional para manejar tareas que cumple con todos los requerimientos exigentes de **Don Brian**. ✨

---

## 🚀 Características

- **✅ Persistencia en archivos**: Las tareas se guardan automáticamente en `tareas.json`
- **🔧 Modularización completa**: Código organizado en módulos siguiendo buenas prácticas
- **📚 Integración con Lodash**: Utiliza al menos 4 funcionalidades de Lodash para optimizar operaciones
- **🎯 Interfaz CLI intuitiva**: Menú interactivo con Inquirer.js
- **🔍 Búsqueda y filtrado**: Buscar tareas por palabra clave, filtrar por estado
- **🗂️ Agrupación automática**: Las tareas se muestran agrupadas por estado
- **🛡️ Validaciones robustas**: No permite tareas vacías, confirmación para eliminar
- **🎨 Interfaz colorida**: Mensajes claros con emojis y formato

---

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

### Pasos de instalación

1. **Clona o descarga el proyecto**
   ```bash
   # Si tienes git
   git clone <url-del-repositorio>
   cd TallerDonBrian
   
   # O simplemente descarga y extrae los archivos
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el proyecto**
   ```bash
   npm start
   # o también puedes usar:
   node index.js
   ```

---

## 🎮 Cómo usar

Al ejecutar el programa, verás un menú interactivo con las siguientes opciones:

### 1. **Agregar tarea**
- Ingresa la descripción de la nueva tarea
- Se valida que no esté vacía
- Se genera automáticamente un ID único y fecha de creación
- Se eliminan duplicados automáticamente

### 2. **Listar tareas**
Puedes elegir entre:
- **Todas las tareas**: Muestra todo agrupado por estado
- **Solo completadas**: Filtra únicamente las tareas terminadas
- **Solo pendientes**: Muestra solo las tareas por hacer
- **Buscar por palabra clave**: Encuentra tareas que contengan un texto específico

### 3. **Editar tarea**
- Selecciona una tarea de la lista
- Puedes cambiar la descripción o el estado (completada/pendiente)

### 4. **Marcar completada**
- Muestra solo las tareas pendientes
- Marca la seleccionada como completada

### 5. **Eliminar tarea**
- Selecciona una tarea para eliminar
- Pide confirmación antes de eliminar permanentemente

### 6. **Salir**
- Cierra el programa guardando todos los cambios

---

## 🏗️ Arquitectura del proyecto

```
TallerDonBrian/
├── index.js                 # Punto de entrada principal
├── data/
│   └── tareas.js           # Modelo de datos de tareas
├── controllers/
│   └── tareasController.js # Lógica de negocio de tareas
├── utils/
│   ├── archivo.js          # Manejo de persistencia en archivos
│   └── menu.js             # Interfaz del menú principal
├── tareas.json             # Archivo donde se persisten las tareas
├── package.json            # Configuración y dependencias
└── README.md              # Documentación (este archivo)
```

---

## 🔧 Dependencias utilizadas

- **inquirer** `^12.8.2`: Para crear la interfaz CLI interactiva
- **lodash** `^4.17.21`: Biblioteca de utilidades para manipulación de datos
- **chalk** `^5.4.1`: Para colorear la salida en consola (opcional)
- **nanoid** `^5.1.5`: Para generar IDs únicos (preparado para uso futuro)

---

## 📚 Implementación de Lodash (Mejoras requeridas)

El sistema utiliza Lodash para optimizar las siguientes operaciones:

### 1. **Agrupación de tareas** (`_.groupBy`)
```javascript
const tareasAgrupadas = _.groupBy(tareasFiltradas, 'completada')
```
Agrupa las tareas por estado (completadas/pendientes) para mejor visualización.

### 2. **Filtrado y búsqueda** (`_.filter`, `_.includes`)
```javascript
const tareasCompletables = _.filter(tareas, { completada: false })
tareasFiltradas = _.filter(tareas, (tarea) => 
  _.includes(_.toLower(tarea.descripcion), _.toLower(palabraClave.trim()))
)
```
Filtra tareas por estado y busca por palabras clave de forma eficiente.

### 3. **Validación de campos vacíos** (`_.isEmpty`)
```javascript
if (_.isEmpty(input.trim())) {
  return "La descripción no puede estar vacía"
}
```
Valida que no se ingresen tareas con descripciones vacías.

### 4. **Eliminación de duplicados** (`_.uniqBy`)
```javascript
const tareasSinDuplicados = _.uniqBy(tareas, 'descripcion')
```
Previene la creación de tareas duplicadas basándose en la descripción.

---

## 💾 Persistencia de datos

- Las tareas se guardan automáticamente en `tareas.json`
- El archivo se crea automáticamente si no existe
- Cada operación (crear, editar, completar, eliminar) sincroniza con el archivo
- Los datos persisten entre ejecuciones del programa

### Formato del archivo tareas.json:
```json
[
  {
    "id": 1753313353010,
    "descripcion": "Completar el taller de Don Brian",
    "completada": false,
    "fechaCreacion": "2025-07-23T23:29:13.010Z"
  }
]
```

---

## 🐛 Solución de problemas

### El programa no inicia
- Verifica que tengas Node.js 18+ instalado: `node --version`
- Ejecuta `npm install` para instalar dependencias
- Verifica que el archivo `package.json` tenga `"type": "module"`

### No se guardan las tareas
- Verifica que tengas permisos de escritura en la carpeta del proyecto
- El archivo `tareas.json` se crea automáticamente en la primera ejecución

### Error de módulos
- Ejecuta `npm install` nuevamente
- Verifica que todas las dependencias estén en `package.json`

---

## 👨‍💼 Cumplimiento de requerimientos de Don Brian

✅ **Modularización**: Código separado en archivos especializados  
✅ **Persistencia**: Uso del módulo `fs` para guardar en JSON  
✅ **Lodash**: Al menos 4 funcionalidades implementadas  
✅ **Inquirer**: Interfaz CLI completa y funcional  
✅ **Validaciones**: Campos obligatorios y confirmaciones  
✅ **UX mejorada**: Mensajes claros, agrupación, búsqueda  

---

> Participantes 
>Hely Santiago Diaz
>Johan Andrey Guarin 