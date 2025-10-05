const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [
  { id: 1, titulo: "Estudiar Node", completada: false },
  { id: 2, titulo: "Crear proyecto", completada: true }
];

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send("Bienvenido a la API de tareas en Node.js");
});

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Agregar una nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    completada: false
  };
  tareas.push(nuevaTarea);
  res.json(nuevaTarea);
});

// Marcar tarea como completada
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).send("Tarea no encontrada");
  }
  tarea.completada = true;
  res.json(tarea);
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
  res.send("Tarea eliminada");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
