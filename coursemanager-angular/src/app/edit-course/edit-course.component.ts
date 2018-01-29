import { Component, OnInit } from '@angular/core';

import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  providers: [CourseService]
})
export class EditCourseComponent implements OnInit {
	title = 'Course Manager';
	public newCourse: Course = new Course();
	courseList: Course[] = new Array<Course>();
	editCourseList: Course[] = [];
	params: string[];

	constructor(private courseService: CourseService ){
  	courseService.courseArray$.subscribe(
  		courses => {
  			this.courseList = courses;
  			console.log("INSIDE EDIT: ", this.courseList);
  		}	
		)
	}
	
	ngOnInit(): void {
		this.courseService.getCourses(null)
			.subscribe(courses => {
				this.courseList = courses;
		})
	}

	editCourse(course: Course){
		console.log(course);
		if(!this.editCourseList.includes(course)){
			this.editCourseList.push(course)
		} else {
			this.editCourseList.splice(this.editCourseList.indexOf(course), 1);
			this.courseService.editCourse(course).subscribe(res => {
				console.log("Updated course");
			}, err => {
				this.editCourse(course);
				console.log("Failed, retrying");
			});
		}
	}

	deleteCourse(course: Course) {
		this.courseService.deleteCourse(course._id)
			.subscribe(res => {
				this.courseList.splice(this.courseList.indexOf(course), 1);
		});
	}

	updateCourse(course: Course){
		this.editCourse(course);
	}


  search() {
  	console.log("SEARCH CALLED");
  	this.courseService.getCourses(this.params).subscribe();
  }
}
