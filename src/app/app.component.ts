import { Component, inject, OnInit } from '@angular/core';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listaTareas: string[] = [];
  nuevaTarea: string = '';

  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareasService.getTareas();
  }

  agregarTarea() {
    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = '';
    this.listaTareas = this._tareasService.getTareas();
  }

  eliminarTarea(index: number) {
    this._tareasService.eliminarTarea(index);
    this.listaTareas = this._tareasService.getTareas();
  }

  // Método para descargar todas las tareas en un archivo de notas rápidas
  descargarTareas() {
    this._tareasService.descargarTareas();
  }

  // Método para borrar todas las tareas
  borrarTodasTareas() {
    this._tareasService.borrarTodasTareas();
    this.listaTareas = [];
  }
}
