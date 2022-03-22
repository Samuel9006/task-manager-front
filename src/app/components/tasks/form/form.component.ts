import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';
import {TaskModel} from "../model/task-model";
import {TasksService} from "../../../services/tasks.service";
import {Employ} from "../model/employ";
import { EmployService } from 'src/app/services/employ.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [DatePipe]
})
  export class FormComponent implements OnInit {

  form!: FormGroup;
  public tasking!:TaskModel;
  public empleados: Employ[] = [];
  id!: string;
  public isAddMode!: boolean;
  public empleadoSeleccionado: Employ = new Employ();
  public titulo: string = "Creacion de tareas"


  constructor(private taskService: TasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private employService: EmployService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
                  this.tasking = new TaskModel();
              }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.cargarEmpleados();
    this.crearFormulario();
  }

  crearFormulario() {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        executionDate: ['', Validators.required],
        employId: ['', Validators.required]
      })
      if(!this.isAddMode){
        this.seleccionarTarea();
      }
  }



  private cargarEmpleados() {
    this.employService.getEmploys().subscribe(
      employs => this.empleados = employs
    );
  }


  public create(): void{
    this.tasking = this.form.value;
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
    this.tasking = this.form.value;
    this.tasking.id = +this.id;
    console.log("Se inicia la actualización");
    console.log(this.tasking);
    this.taskService.updateTask(this.tasking).subscribe(
      (response: any)=>{
        this.router.navigate(["/tasks"])
        swal.fire(  'Tarea Editada',  `${response.Info}`,  'success');
      }
    )
  }

  public seleccionarTarea():void{
    this.activatedRoute.params.subscribe(
      params=>{
        let id = params['id'];
        if(id){
          this.taskService.getTask(id).subscribe(
            (task:any) => {
              let stringDate  = this.datePipe.transform(task.executionDate, 'yyyy-MM-dd');
              task.executionDate =  stringDate+'T05:00:00.000Z';
              this.form.patchValue(task);
            }
          )
        }
      }
    )
  }

  get f() { return this.form.controls; }
}


