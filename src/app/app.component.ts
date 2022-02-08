import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  tareas = new Array();
  anadir_tarea(nueva_tarea: string, prioridad: string) {
    this.tareas.push({
      tarea: nueva_tarea,
      completada: false,
      prioridad: prioridad,
      fecha_creacion: new Date()
    })
    this.actualizar_local_storage()
  }
  borrar(index: number) {
    this.tareas.splice(index, 1);
    this.actualizar_local_storage();
  }
  poner_prio_alta(index: number) {
    this.tareas[index].prioridad = 3;
    this.ordenar()
    this.actualizar_local_storage()

  }
  cambiar_completada(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada
    this.actualizar_local_storage()
  }
  fechaActual(fecha: Date) {
    let fecha_tarea = new Date(fecha);
    let fechaActual_ahora = new Date().getTime() - fecha_tarea.getTime()
    return Math.round(fechaActual_ahora / 60000)

  }
  poner_prio_media(index: number) {
    this.tareas[index].prioridad = 2;
    this.ordenar()
    this.actualizar_local_storage()

  }
  poner_prio_baja(index: number) {
    this.tareas[index].prioridad = 1;
    this.ordenar()
    this.actualizar_local_storage()

  }
  ver_estado(estado: boolean) {
    if (estado) {
      return "Completada"
    } else {
      return "No completada"
    }
  }
  ordenar() {
    this.tareas.sort((a, b) => { return b.prioridad - a.prioridad });
  }
  devolver_tareas_completadas() {
    return this.tareas.filter(tareas => tareas.completada == true).length;
}
  borrarCompletadas() {
    this.tareas = this.tareas.filter(tarea => tarea.completada == false)
    this.actualizar_local_storage()
  }
  actualizar_local_storage() {
    localStorage['tareas'] = JSON.stringify(this.tareas)

  }
  ngAfterViewInit() {
    if (localStorage['tareas']) {
      this.tareas = JSON.parse(localStorage['tareas'])

    }
  }

}
