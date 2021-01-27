import { Expansion } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clickButton: boolean = false
  talks = 'deactive'
  workshops = 'deactive'
  iconW = 'keyboard_arrow_down'
  iconT = 'keyboard_arrow_down'
  constructor(public publicservice:PublicService) { 
  }

  ngOnInit(): void {
    
  }

}
