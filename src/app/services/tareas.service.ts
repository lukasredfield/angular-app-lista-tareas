import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private localStorageKey = 'listaTareas';

  constructor() { }

  getTareas(): string[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  agregarTarea(tarea: string) {
    const tareas = this.getTareas();
    tareas.push(tarea);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

  eliminarTarea(index: number) {
    const tareas = this.getTareas();
    tareas.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

  // Método para descargar todas las tareas en un archivo de notas rápidas
  descargarTareas() {
    const tareas = this.getTareas();
    const contenido = tareas.map((tarea, index) => `${index + 1}. ${tarea}`).join('\n');
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tareas.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Método para borrar todas las tareas
  borrarTodasTareas() {
    localStorage.removeItem(this.localStorageKey);
  }
}
