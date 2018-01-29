import { Course } from '../models/course.model';

import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
	api_url = `http://localhost:3000`;
	courseUrl = `${this.api_url}/api/courses`;

	constructor(private http: HttpClient){}

	createCourse(course: Course): Observable<any>{
		return this.http.post(`${this.courseUrl}`, course);
	}

	getCourses(): Observable<Course[]>{
		return this.http.get(`${this.courseUrl}`)
			.map(res => {
				return res["data"].docs as Course[];
			});
	}

	searchCourses(params: string[]): Observable<Course[]>{
		return this.http.get(`${this.courseUrl}?search=${params}`)
			.map(res => {
				return res["data"].docs as Course[];
			});
	}

	editCourse(course: Course){
		console.log("COURSE IN SERVICE: ", course);
		return this.http.put(`${this.courseUrl}`, course);
	}

	deleteCourse(id: string){
		let deleteUrl = `${this.courseUrl}/${id}`;
		return this.http.delete(deleteUrl)
			.map(res => {
				return res;
			});
	}

	private handleError(error: any): Promise<any> {
		console.error('Something bad happened', error);
		return Promise.reject(error);
	}
}
