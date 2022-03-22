import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import Swal from "sweetalert2";
import {Employ} from "../components/tasks/model/employ";

@Injectable({
  providedIn: 'root'
})
export class EmployService {


  private urlEndpoint = environment.apiUrl + '/api/employ';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient, private router:Router) { }

  public getEmploys(): Observable<Employ[]>{
    return this.httpClient.get<Employ[]>(this.urlEndpoint).pipe(
      catchError(err => {
        console.error(err);
        Swal.fire('Error al traer los empleados', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  public getEmploy(id: number): Observable<Employ>{
    return this.httpClient.get<Employ>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        console.error(err);
        Swal.fire('Error al traer el nombre del empleado', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
