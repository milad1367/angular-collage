import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollageComponent } from './collage/collage.component';
const routes: Routes = [
  { path: '', redirectTo: '/collage', pathMatch: 'full' },
  { path: 'collage', component: CollageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
