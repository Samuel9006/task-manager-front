import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';
import {TaskModel} from "../model/task-model";
import {TasksService} from "../../../services/tasks.service";
import {Employ} from "../model/employ";
import { EmployService } from 'src/app/services/employ.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
  export class FormComponent implements OnInit {
  public tasking:TaskModel = new TaskModel();
  public empleados: Employ[] = [];
  public empleadoSeleccionado: Employ = new Employ();
  public titulo: string = "Creacion de tareas"
  constructor(private taskService: TasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private employService: EmployService) { }

  ngOnInit() {
    this.cargarEmpledos();
    this.seleccionarCliente();
  }
  private cargarEmpledos() {
    this.employService.getEmploys().subscribe(
      employs => this.empleados = employs
    );
  }


  public create(): void{
    console.log("Se inicia la creación");
    console.log(this.tasking);
    this.taskService.createTask(this.tasking).subscribe(
      (response: any) => {
        this.router.navigate(["/tasks"])
        swal.fire(  'Se creo la tarea',  `${response.Info}` ,  'success');
      }
    )
  }

  public update():void{
    console.log("Se inicia la actualización");
    console.log(this.tasking);
    this.taskService.updateTask(this.tasking).subscribe(
      (response: any)=>{
        this.router.navigate(["/tasks"])
        swal.fire(  'Tarea Editada',  `${response.Info}`,  'success');
      }
    )
  }

  public seleccionarCliente():void{
    this.activatedRoute.params.subscribe(
      params=>{
        let id = params['id'];
        if(id){
          this.taskService.getTask(id).subscribe(
            (task:any) => {
              this.tasking = task;
            }
          )
        }
      }
    )
  }
}
