import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { CollageService } from '../collage.service';

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
  slectedClassId = 1;

  constructor() { }

  ngOnInit() {
    let classes = ""
    classes = (localStorage.getItem('classes'));
    this.classes = JSON.parse(classes) || [];
  }

  selectClass():void {
    
  }
  setCurrentClass(id):void {
    console.log(id);
    this.slectedClassId = id;


  }

  showAddClassForm():void {
    this.showAddClass = true;
  }
  showAddStudentForm():void {
    this.showAddStudent = true;
  }
  getStudent(classId):any{
    let classe = this.classes[classId - 1];
    if(classe && classe.hasOwnProperty('students')) {
      return classe.students
    }
    return []
  }
  addClass(className,location,teacherName):void {
    this.classes.push({"id":this.classes.length + 1,"className":className,"location":location,"teacherName":teacherName});
    
    localStorage.setItem('classes',JSON.stringify(this.classes));
    this.showAddClass = false;
    console.log(this.classes);
  }
  showStudents():any {
    let students = this.getStudent(this.slectedClassId);
    console.log(students,this.slectedClassId);
    if(students.length) {
      this.selectedClassStudents = students;
       return true
    }
    return false
  }
  hasStudent(classId):any {
    let classe = this.classes[classId - 1];
    if(classe && classe.hasOwnProperty('students')) {
      return true
    }
    return false
  }

  addStudent(_first_name,_last_name,_age,_gpa):void {
    let hasStudent = this.hasStudent(this.slectedClassId);
    if(!hasStudent) {
      this.classes[this.slectedClassId - 1].students = [];
    }
    var student = {firstName:_first_name,lastName:_last_name,age:_age,gpa:_gpa};
    this.classes[this.slectedClassId - 1].students.push(student);
    localStorage.setItem('classes',JSON.stringify(this.classes));

    console.log(this.classes[this.slectedClassId - 1].students);
  }

}
