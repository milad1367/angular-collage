import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CollageService {
  errors = {"firstName":false};
  constructor(
    private location: Location

  ) { }

  goBack(): void {
    this.location.back();
  }
  genId(array: any[]): number {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
  }
  getClasses():any {
    return  JSON.parse(localStorage.getItem('classes')) || [];
  }
  updateClasses(classes):any {
    localStorage.setItem('classes',JSON.stringify(classes));
  }
  getClass(id):any {
   let classes = this.getClasses();
   return classes.find(item => item.id === id);
  }
  addClass(_class):any {
    let classes = this.getClasses();
    const id = this.genId(classes);
    let newClass = {"id":id,"className":_class.className,"location":_class.location,"teacherName":_class.teacherName};
    classes.push(newClass);
    this.updateClasses(classes);
    return newClass
  }
  /*
  indexOfClass(_class):any {
    let classes = this.getClasses();
    let index = classes.indexOf(_class);
    return index
  }
  indexOfStudent(classId,studentId):any {
    let _class = this.getClass(classId);
    let test = this.indexOfClass(_class);
    let _student = this.getStudent(classId,studentId);
    let students = _class.students;
    let index = students.indexOf(_student);
    return index
  }
  */
  updateClass(_class):any {
    let classes = this.getClasses();
    classes.find(item => {
      if(item.id === _class.id) {
        let index = classes.indexOf(item);
         classes[index] = _class;
         
        localStorage.setItem('classes',JSON.stringify(classes));

      }
      
    });
  }
  deleteClass(id):any {
    let index = null;
    let classes = this.getClasses();
    classes.find(item => {
      
      if(item.id === id) {
         index = classes.indexOf(item);
        // 
      }
      
    });
    console.log(index );
    if(index >= 0) {
      classes.splice(index,1);
      this.updateClasses(classes);
    }
   
  }

  getStudents(classId):any {
    let classes = this.getClasses()
    if (this.hasStudent(classId)) {
      let _class = this.getClass(classId);
      return _class.students || [];
  }
}


  hasStudent(classId):any {
    let classe = this.getClass(classId);
    if(classe && classe.hasOwnProperty('students')) {
      if(classe.students.length > 0) {
        return true
      }
      
    }
    return false
  }
  getStudent(classId,studentId):any {
    let _class = this.getClass(classId);
    return _class.students.find(item => item.id === studentId)
  }

  addStudent(classId,student):any {
    const _class = this.getClass(classId);
    const hasStudent = this.hasStudent(classId);
    if(!hasStudent) {
      _class.students = [];
    }
    const _id = this.genId(_class.students);
    student.id = _id;
    console.log(student)
    const newStudent = {
         "id":student.id,
         "firstName":student.firstName || "",
         "lastName":student.lastName || "",
         "age":student.age || "",
         "gpa":student.gpa || ""
    };
    
    _class.students.find(item => {
      console.log(item.firstName,newStudent.firstName)
      if(item.firstName === newStudent.firstName) {
         this.errors.firstName = true;
      }
      
    });
    if(this.errors.firstName) {
      return this.errors
    }
   if(!this.errors.firstName) {
     _class.students.push(newStudent);
      this.updateClass(_class);
      return true
    }
  }
  deleteStudent(classId,studentId):any{
    let classes = this.getClasses();
    let index = -1;
    const _class = this.getClass(classId);
    _class.students.find(item => {
      
      if(item.id === studentId) {
         index = _class.students.indexOf(item);
        // 
      }
      
    });
    if(index >= 0) {
      _class.students.splice(index,1);
       this.updateClass(_class);

    }
  }
  
  updateStudent(classId,student):any {
    const _class = this.getClass(classId);

    _class.students.find(item => {
      console.log(item.firstName,student.firstName)
      if(item.firstName === student.firstName) {
         this.errors.firstName = true;
      }
      
    });
    if(this.errors.firstName) {
      return this.errors
    }
    if(!this.errors.firstName) {
      _class.students.find(item => {
        if(item.id === student.id) {
          let index = _class.students.indexOf(item);
          _class.students[index] = student;
          this.updateClass(_class);
        }
      });  
      return true
    }
  }
}

