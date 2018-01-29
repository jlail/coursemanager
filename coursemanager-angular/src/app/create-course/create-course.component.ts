import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { AgmMap, AgmMarker } from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
	lat: number = 51.678418;
	lng: number = 7.809007;

	constructor(private courseService: CourseService ){

	}
	title = 'Course Manager';
	public newCourse: Course = new Course();
	courseList: Course[] = new Array<Course>();

	ngOnInit(): void {
	}



	createCourse() {
		console.log("COURSE: ", this.newCourse);
		this.courseService.createCourse(this.newCourse)
			.subscribe(res => {
				this.courseList.push(res.data);
				this.newCourse = new Course();
		});
	}

}
