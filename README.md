# 📋 Gestor de Tareas - Full Stack Web Application

![Estado](https://img.shields.io/badge/Estado-Lista_para_Desplegar-success)
![Stack](https://img.shields.io/badge/Stack-Angular_+_Express-blue)
![Hosting](https://img.shields.io/badge/Hosting-Vercel-black)

Una aplicación web moderna para gestionar tareas diarias con CRUD completo, diseñada para ser desplegada en Vercel.

## 🚀 Características

- ✅ **Crear** tareas con título y descripción
- 📖 **Listar** todas las tareas con filtros
- ✏️ **Editar** tareas existentes
- 🗑️ **Eliminar** tareas
- ✔️ **Marcar** tareas como completadas/pendientes
- 🔍 **Filtrar** por estado (todas, pendientes, completadas)
- 📊 **Estadísticas** en tiempo real
- 🎨 **Diseño moderno** con tema oscuro y animaciones

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 21** - Framework progresivo
- **TypeScript** - Tipado estático
- **CSS3** - Estilos modernos con gradientes y animaciones
- **Signals** - Gestión reactiva de estado

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework minimalista
- **CORS** - Manejo de peticiones cross-origin

### Hosting
- **Vercel** - Plataforma de despliegue serverless

## 📁 Estructura del Proyecto

```
Web personal/
├── angular-app/              # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   │   └── tarea.model.ts
│   │   │   ├── services/
│   │   │   │   └── tareas.service.ts
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   └── app.config.ts
│   │   └── environments/
│   └── package.json
│
├── api/                      # Backend Express (Serverless)
│   ├── index.js
│   └── package.json
│
├── vercel.json              # Configuración de Vercel
└── README.md

```

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tareas` | Obtener todas las tareas |
| `GET` | `/api/tareas/:id` | Obtener tarea por ID |
| `POST` | `/api/tareas` | Crear nueva tarea |
| `PUT` | `/api/tareas/:id` | Actualizar tarea |
| `PATCH` | `/api/tareas/:id` | Marcar como completada/pendiente |
| `DELETE` | `/api/tareas/:id` | Eliminar tarea |
| `GET` | `/api/health` | Estado de la API |

## 💻 Desarrollo Local

### Backend
```bash
cd api
npm install
npm start
# Servidor en http://localhost:3000
```

### Frontend
```bash
cd angular-app
npm install
ng serve
# App en http://localhost:4200
```

## 🌐 Despliegue en Vercel

### Opción 1: Dashboard de Vercel (Recomendado)

1. **Sube el código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: Gestor de Tareas completo"
   git remote add origin https://github.com/TU_USUARIO/gestor-tareas.git
   git push -u origin main
   ```

2. **Importa en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New..." → "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración desde `vercel.json`
   - Haz clic en "Deploy"

3. **¡Listo!** Tu app estará en: `https://tu-proyecto.vercel.app`

### Opción 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## 📖 Documentación Completa

Para una guía paso a paso con capturas de pantalla del proceso de despliegue, consulta:

**[📄 Guía de Despliegue Completa](file:///C:/Users/Mrrob/.gemini/antigravity/brain/08b1e850-4480-4b9c-9172-d795ddf0cb21/walkthrough.md)**

## 🧪 Pruebas

Una vez desplegada, prueba todas las funcionalidades:

1. ✅ Crear nueva tarea
2. ✅ Marcar tarea como completada
3. ✅ Editar tarea existente
4. ✅ Eliminar tarea
5. ✅ Filtrar por estado
6. ✅ Verificar estadísticas

## 🔧 Configuración

### Archivo `vercel.json`

```json
{
  "version": 2,
  "buildCommand": "cd angular-app && npm install && npm run build",
  "outputDirectory": "angular-app/dist/angular-app/browser",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/index.js"
    }
  ]
}
```

## 🎨 Capturas de Pantalla

### Vista Principal
![App Principal](descripción: Interfaz principal con lista de tareas, estadísticas y controles)

### Crear Tarea
![Modal Crear](descripción: Modal para crear nueva tarea con formulario)

### Lista de Tareas
![Lista](descripción: Tareas organizadas con opciones de editar y eliminar)

## 📝 Modelo de Datos

```typescript
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: string;
}
```

## 🚀 Próximas Mejoras

- [ ] Persistencia con base de datos (MongoDB Atlas / Supabase)
- [ ] Autenticación de usuarios
- [ ] Fechas de vencimiento
- [ ] Prioridades y categorías
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push

## 🐛 Solución de Problemas

### Error de CORS
Ya está configurado en `api/index.js` con el paquete `cors`.

### API no responde
Verifica que la carpeta `api` esté en la raíz y que `vercel.json` tenga los rewrites correctos.

### Build falla
Asegúrate de que `vercel.json` tenga el `buildCommand` correcto.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Creado como proyecto de demostración para despliegue en Vercel.

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**

🔗 **URL de Producción:** (Se genera después del despliegue en Vercel)
