import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TareasService {
    private apiUrl = `${environment.apiUrl}/api/tareas`;

    constructor(private http: HttpClient) { }

    // Obtener todas las tareas
    obtenerTareas(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.apiUrl);
    }

    // Obtener una tarea por ID
    obtenerTarea(id: number): Observable<Tarea> {
        return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
    }

    // Crear nueva tarea
    crearTarea(tarea: Partial<Tarea>): Observable<Tarea> {
        return this.http.post<Tarea>(this.apiUrl, tarea);
    }

    // Actualizar tarea completa
    actualizarTarea(id: number, tarea: Partial<Tarea>): Observable<Tarea> {
        return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
    }

    // Marcar tarea como completada/incompleta
    toggleCompletada(id: number, completada: boolean): Observable<Tarea> {
        return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completada });
    }

    // Eliminar tarea
    eliminarTarea(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
