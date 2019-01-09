import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassesComponent } from './classes/classes.component';
import { CollageComponent } from './collage/collage.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassesComponent,
    CollageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
