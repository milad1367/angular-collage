import { Student } from './student';

export class Class {
    id:number;
    className:string;
    location: string;
    teacherName: string;
    students?: Student[];
}
