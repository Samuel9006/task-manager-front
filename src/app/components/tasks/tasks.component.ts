import { Component, OnInit } from '@angular/core';
import {TaskModel} from "./model/task-model";
import {TasksService} from "../../services/tasks.service";
import Swal from "sweetalert2";
import { EmployService } from '../../services/employ.service';
import { Employ } from './model/employ';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:TaskModel[] = [];

  constructor(private taskService: TasksService,
    private employservice: EmployService) {

  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      task => this.tasks = task

    );
  }

  public cargarEmpleado(id: number) {
    this.employservice.getEmploy(id).subscribe(
      empleado => empleado.firstName
    );
  }

  public delete(task:TaskModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar',
      text: `Estas seguro de eliminar esta tarea ${task.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(task.id).subscribe(
          (response: any) => {
            this.tasks = this.tasks.filter(
              cli => cli !== task
            )
            swalWithBootstrapButtons.fire(
              {
                title: 'Tarea Eliminada',
                text: 'La tarea se eliminó de manera correcta',
                timer: 1000,
                icon: 'success'
              }
            )
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          {
            title: 'Cancelado',
            text: 'Se cancelo la operación',
            icon: 'error'
          }
        )
      }
    })
  }
}
