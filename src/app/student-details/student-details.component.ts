import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CollageService } from '../collage.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  classId :number;
  studentId: number;
  student = {
    "id":"",
    "firstName":"",
    "lastName":"",
    "age":"",
    "gpa":""
  }
  constructor(
    private route: ActivatedRoute,
    private collageService: CollageService,
    private location: Location

  ) { }

  getStudent(): void {
    this.studentId = +this.route.snapshot.paramMap.get('studentId');
    this.classId = +this.route.snapshot.paramMap.get('classId');
    this.student = this.collageService.getStudent(this.classId,this.studentId);
  }
  goBack(): void {
    this.collageService.goBack();
  }
  updateStudent(_classId,_student): void {
     this.collageService.updateStudent(_classId,_student);
     this.goBack();
  }

  ngOnInit() {
    this.getStudent();
  }

}
