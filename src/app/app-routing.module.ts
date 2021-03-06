import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollageComponent } from './collage/collage.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
const routes: Routes = [
  { path: '', redirectTo: '/collage', pathMatch: 'full' },
  { path: 'collage', component: CollageComponent },
  { path:'class/:id', component: ClassDetailsComponent },
  { path: 'class/:classId/student/:studentId', component: StudentDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
