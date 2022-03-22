import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {FormComponent} from "./components/tasks/form/form.component";

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch:'full' },
  { path: 'tasks', component: TasksComponent},
  { path: 'tasks/form', component: FormComponent },
  { path: 'tasks/form/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
