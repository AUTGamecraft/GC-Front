import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router) {

  }

  ngOnInit(): void {
  }
  Signup() {
    const navigationDetails2: string[] = ['signup'];
        this.router.navigate(navigationDetails2);
  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }
SignUp(){}


}

