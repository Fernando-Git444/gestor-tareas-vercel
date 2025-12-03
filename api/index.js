const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria (temporal)
let tareas = [
  { id: 1, titulo: 'Tarea de ejemplo', descripcion: 'Esta es una tarea de demostración', completada: false, fechaCreacion: new Date().toISOString() },
  { id: 2, titulo: 'Desplegar en Vercel', descripcion: 'Completar el despliegue de la aplicación', completada: false, fechaCreacion: new Date().toISOString() }
];
let nextId = 3;

// ===== ENDPOINTS CRUD =====

// GET /api/tareas - Obtener todas las tareas
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

// GET /api/tareas/:id - Obtener una tarea específica
app.get('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(tarea);
});

// POST /api/tareas - Crear nueva tarea
app.post('/api/tareas', (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const nuevaTarea = {
    id: nextId++,
    titulo: titulo.trim(),
    descripcion: descripcion ? descripcion.trim() : '',
    completada: false,
    fechaCreacion: new Date().toISOString()
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// PUT /api/tareas/:id - Actualizar tarea completa
app.put('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descripcion, completada } = req.body;

  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  tareas[index] = {
    ...tareas[index],
    titulo: titulo.trim(),
    descripcion: descripcion ? descripcion.trim() : '',
    completada: completada === true
  };

  res.json(tareas[index]);
});

// PATCH /api/tareas/:id - Marcar tarea como completada/incompleta
app.patch('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { completada } = req.body;

  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tarea.completada = completada === true;
  res.json(tarea);
});

// DELETE /api/tareas/:id - Eliminar tarea
app.delete('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const tareaEliminada = tareas.splice(index, 1)[0];
  res.json({ mensaje: 'Tarea eliminada correctamente', tarea: tareaEliminada });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mensaje: 'API de Gestor de Tareas funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Para desarrollo local
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📋 API disponible en http://localhost:${PORT}/api/tareas`);
  });
}

module.exports = app;
