import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	courseList: Course[] = new Array<Course>();
	params: string[];

  constructor(private courseService: CourseService) { }

  search() {
  	console.log("SEARCH CALLED");
  	this.courseService.searchCourses(this.params)
  		.subscribe(res => {
  			console.log("RES: ", res);
  		});
  }
}
