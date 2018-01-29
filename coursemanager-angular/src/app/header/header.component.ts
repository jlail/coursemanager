import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
  providers: [CourseService]
})
export class HeaderComponent {
	params: string[];

  constructor(private courseService: CourseService) { 

  }
}
