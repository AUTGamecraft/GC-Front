import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-invalid-page',
  templateUrl: './invalid-page.component.html',
  styleUrls: ['./invalid-page.component.scss']
})
export class InvalidPageComponent implements OnInit {

  constructor(private router: Router, public publicservice: PublicService) { }

  ngOnInit(): void {
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
}
