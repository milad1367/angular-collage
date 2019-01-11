import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollageService {
  
  constructor() { }
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
  indexOfClass(_class):any {
    let classes = this.getClasses();
    let index = classes.indexOf(_class);
    return index
  }
  updateClass(_class):any {
    console.log(_class);
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

  getStudent():any {

  }

  editStudent():any {

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
  addStudent(classId,student):any {
    const _class = this.getClass(classId);
   // const index = this.indexOfClass(_class);
    const hasStudent = this.hasStudent(classId);
    if(!hasStudent) {
      _class.students = [];
    }
    _class.students.push(student);

    this.updateClass(_class);
    debugger
  }
  deleteStudent():any{

  }
}
