import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {TaskModel} from "../components/tasks/model/task-model";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private urlEndpoint = environment.apiUrl + '/api/task';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient, private router:Router) { }

  public getTasks():Observable<TaskModel[]>{
    return this.httpClient.get<TaskModel[]>(this.urlEndpoint).pipe(
      catchError(err => {
        console.error(err);
        Swal.fire('Error al traer los datos', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  public createTask(task:TaskModel): any{
    return this.httpClient.post<TaskModel>(this.urlEndpoint, task, {headers:this.httpHeaders}).pipe(
      catchError(
        err => {
          console.error(err);
          Swal.fire('Error al guardar', err.error.mensaje, 'error');
          return throwError(err);
        }

      )
    )
  }

  public getTask(id: number):any{
    return this.httpClient.get<TaskModel>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(["/tasks"]);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  public updateTask(task: TaskModel):any{
    return this.httpClient.put<TaskModel>(`${this.urlEndpoint}/${task.id}`, task, {headers:this.httpHeaders}).pipe(
      catchError(err => {
        console.error(err);
        Swal.fire('Error al actualizar', err.error.mensaje, 'error');
        return throwError(err);
      })
    )
  }

  public deleteTask(id: number):any{
    return this.httpClient.delete<TaskModel>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(err => {
        Swal.fire('Error al Eliminar', err.error.mensaje, 'error');
        return throwError(err)
      })
    )
  }
}
