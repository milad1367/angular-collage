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
  slectedClassId = null;

  constructor(private collageService: CollageService) { }

  ngOnInit() {

    this.getClasses();
    console.log(this.collageService.getClasses());

  }
  getClasses():void{
    this.classes = this.collageService.getClasses();
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
  deleteClass(id): void {
    this.collageService.deleteClass(id); 
    this.getClasses();
  }
  addClass(className,location,teacherName):void {
       
    let newClass = this.collageService.addClass({className,location,teacherName});
    this.classes.push(newClass);
    
    localStorage.setItem('classes',JSON.stringify(this.classes));
    this.showAddClass = false;
    console.log(this.classes);
  }
  showStudents():any {
    let hasStudent = this.collageService.hasStudent(this.slectedClassId);
    return hasStudent
  }


  addStudent(_first_name,_last_name,_age,_gpa):void {
    this.collageService.addStudent(this.slectedClassId,{_first_name,_last_name,_age,_gpa});
  }


}
