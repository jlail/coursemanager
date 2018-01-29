import { CourseAddress } from '../models/courseaddress.model';

export class Course {
	_id		:	string;
	name	:	string;
	address	:	CourseAddress;
	notes	: 	string;
	tags	: 	string[];

	constructor(){
		this.name = "";
		this.address = new CourseAddress();
		this.notes = "";
		this.tags = [];
	}
}


export default Course;