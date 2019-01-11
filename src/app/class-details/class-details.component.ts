import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollageService } from '../collage.service';
import { Class } from '../class';
import { Location } from '@angular/common';


@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  @Input() class: Class;
  
  constructor(
    private route: ActivatedRoute,
    private collageService: CollageService,
    private location: Location

  ) { }

  ngOnInit(): void {
    
    this.getClass();
  }

  getClass(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.class = this.collageService.getClass(id);
  }


  goBack(): void {
    this.location.back();
  }
  updateClass(): void {
    this.collageService.updateClass(this.class);
    this.goBack();
  }


}
