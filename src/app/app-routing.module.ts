import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../app/book/create/create.component';
import { DetailsComponent } from '../app/book/details/details.component';
import { ListComponent } from '../app/book/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', children: [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'filter', component: ListComponent },
    { path: 'sort', component: ListComponent },
    { path: ':id', component: DetailsComponent }
  ] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
