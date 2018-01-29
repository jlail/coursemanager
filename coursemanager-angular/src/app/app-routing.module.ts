import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
	{ path: 'create', component: CreateCourseComponent },
	{ path: 'edit', component: EditCourseComponent },
	{ path: '', redirectTo: '/create', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes),
    ]
})
export class AppRoutingModule { }
