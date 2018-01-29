import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
	lat: number = 39.5;
	lng: number = -84.2;
	apiKey: string = 'AIzaSyC3dUOenANJrNgtCWaptUFn-BrURKGoEuE';
	title = 'Course Manager';
	public newCourse: Course = new Course();
	courseList: Course[] = new Array<Course>();

	constructor(private courseService: CourseService, private http: HttpClient){

	}

	ngOnInit(): void {
	}

	getGeocode() {
		let foo = this.http.get(
			`https://maps.googleapis.com/maps/api/geocode/
			json?address=${this.newCourse.address.street},
			+${this.newCourse.address.city},+${this.newCourse.address.state},
			+${this.newCourse.address.zip}=${this.apiKey}`)
				.subscribe(res => {
					this.lat = res['results'][0]['geometry']['location']['lat'];
					this.lng = res['results'][0]['geometry']['location']['lng'];
					console.log("LAT: ", this.lat);
					console.log("LNG: ", this.lng);
					
				});

		console.log("FOO: ", foo);
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
