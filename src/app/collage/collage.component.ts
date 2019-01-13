import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { CollageService } from '../collage.service';
import { Student } from '../student';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css']
})
export class CollageComponent implements OnInit {
  showAddClass = false;
  showAddStudent = false;
  classes: Class[] = [];
  selectedClassStudents = [];
  slectedClassId = null;
  student = {};
  firstnameIsTaken = false;
  constructor(private collageService: CollageService) { }
  onSubmit(f: NgForm,type) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid); 
    if(f.valid && type == "addStudent") {
      let res = this.addStudent(this.student);
      if(res) {
        f.resetForm();
      }
    }
    if(f.valid && type == "addClass") {
      this.addClass(f.value.className,f.value.location,f.value.teacherName);
      f.resetForm();
    }
  }
  classOnSubmit(f:NgForm) {
    console.log(f.valid); 

  }
  ngOnInit() {
    this.getClasses();
  }
  setDefaultValue():void {
    this.student = {
      "id":null,
      "firstName":"",
      "lastName":"",
      "age":"",
      "gpa":""
    }
  }
  getClasses():void{
    this.classes = this.collageService.getClasses();
  }

  selectClass():void {
    
  }
  setCurrentClass(id):void {
    this.slectedClassId = id;
    this.getStudents(id);
    this.showAddStudent = false;
    this.showAddClass = false;

  }

  showAddClassForm():void {
    this.showAddClass = true;
  }
  showAddStudentForm():void {
    this.showAddStudent = true;
  }
  getStudents(classId):any{
    if (this.collageService.hasStudent(classId)) {
      this.selectedClassStudents = this.collageService.getStudents(classId);
      
    }
  }
  deleteClass(id): void {
    this.collageService.deleteClass(id); 
    this.getClasses();
  }
  addClass(className,location,teacherName):void {
       
    let newClass = this.collageService.addClass({className,location,teacherName});
    this.classes = this.collageService.getClasses();
    this.showAddClass = false;
  }
  showStudents():any {
    let hasStudent = this.collageService.hasStudent(this.slectedClassId);
    return hasStudent
  }
  deleteStudent(classId,studentId):any{
    this.collageService.deleteStudent(classId,studentId);
    this.classes = this.collageService.getClasses();

  }


  addStudent(_student):any {
    let res = this.collageService.addStudent(this.slectedClassId,_student);
    if(res == true) {
    this.getStudents(this.slectedClassId);
    this.showAddStudent = false;
    this.setDefaultValue();
    return true
    }
    if(res.firstName) {
      this.firstnameIsTaken = true;
      return false;
    }
  }


}
