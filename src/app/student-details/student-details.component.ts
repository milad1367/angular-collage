import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CollageService } from '../collage.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  classId :number;
  studentId: number;
  firstnameIsTaken = false;

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
  updateStudent(_classId,_student): any {
    let res = this.collageService.updateStudent(_classId,_student);
    console.log(res);
     if(res == true) {
      this.goBack();
      return true
     }
     if(res.firstName) {
       this.firstnameIsTaken = true;
     }
  }
  onSubmit(f: NgForm): void {
    if(f.valid) {
      this.updateStudent(this.classId,this.student);
      
    }
  }

  ngOnInit() {
    this.getStudent();
  }

}
