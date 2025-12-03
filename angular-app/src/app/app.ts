import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';
import { Tarea } from './models/tarea.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = '📋 Gestor de Tareas';

  // Listas de tareas
  tareas = signal<Tarea[]>([]);
  tareasFiltradas = signal<Tarea[]>([]);

  // Estados de la aplicación
  cargando = signal(false);
  error = signal<string | null>(null);
  mostrarFormulario = signal(false);
  filtroActual = signal<'todas' | 'pendientes' | 'completadas'>('todas');

  // Formulario
  tareaEditando: Tarea | null = null;
  formulario = {
    titulo: '',
    descripcion: ''
  };

  constructor(private tareasService: TareasService) { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.cargando.set(true);
    this.error.set(null);

    this.tareasService.obtenerTareas().subscribe({
      next: (tareas) => {
        this.tareas.set(tareas);
        this.aplicarFiltro();
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las tareas. Verifica que el servidor esté corriendo.');
        this.cargando.set(false);
        console.error(err);
      }
    });
  }

  aplicarFiltro() {
    const todasLasTareas = this.tareas();
    switch (this.filtroActual()) {
      case 'pendientes':
        this.tareasFiltradas.set(todasLasTareas.filter(t => !t.completada));
        break;
      case 'completadas':
        this.tareasFiltradas.set(todasLasTareas.filter(t => t.completada));
        break;
      default:
        this.tareasFiltradas.set(todasLasTareas);
    }
  }

  cambiarFiltro(filtro: 'todas' | 'pendientes' | 'completadas') {
    this.filtroActual.set(filtro);
    this.aplicarFiltro();
  }

  abrirFormulario() {
    this.mostrarFormulario.set(true);
    this.tareaEditando = null;
    this.formulario = { titulo: '', descripcion: '' };
  }

  cerrarFormulario() {
    this.mostrarFormulario.set(false);
    this.tareaEditando = null;
    this.formulario = { titulo: '', descripcion: '' };
  }

  guardarTarea() {
    if (!this.formulario.titulo.trim()) {
      return;
    }

    if (this.tareaEditando) {
      // Actualizar tarea existente
      this.tareasService.actualizarTarea(this.tareaEditando.id, this.formulario).subscribe({
        next: () => {
          this.cargarTareas();
          this.cerrarFormulario();
        },
        error: (err) => {
          this.error.set('Error al actualizar la tarea');
          console.error(err);
        }
      });
    } else {
      // Crear nueva tarea
      this.tareasService.crearTarea(this.formulario).subscribe({
        next: () => {
          this.cargarTareas();
          this.cerrarFormulario();
        },
        error: (err) => {
          this.error.set('Error al crear la tarea');
          console.error(err);
        }
      });
    }
  }

  editarTarea(tarea: Tarea) {
    this.tareaEditando = tarea;
    this.formulario = {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion
    };
    this.mostrarFormulario.set(true);
  }

  toggleCompletada(tarea: Tarea) {
    this.tareasService.toggleCompletada(tarea.id, !tarea.completada).subscribe({
      next: () => {
        this.cargarTareas();
      },
      error: (err) => {
        this.error.set('Error al actualizar el estado de la tarea');
        console.error(err);
      }
    });
  }

  eliminarTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.tareasService.eliminarTarea(id).subscribe({
        next: () => {
          this.cargarTareas();
        },
        error: (err) => {
          this.error.set('Error al eliminar la tarea');
          console.error(err);
        }
      });
    }
  }

  get estadisticas() {
    const total = this.tareas().length;
    const completadas = this.tareas().filter(t => t.completada).length;
    const pendientes = total - completadas;
    return { total, completadas, pendientes };
  }
}
