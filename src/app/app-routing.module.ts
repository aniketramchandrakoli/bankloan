import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanformComponent } from './loanform/loanform.component';

const routes: Routes = [

  {path:"loanform", component:LoanformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
