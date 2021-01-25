import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';
import{ Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,private router : Router) { 
    
  }

  ngOnInit(): void {
  }
  openDialogSignUp(){
    const dialogRef = this.dialog.open(SignUpPageComponent);
  }
  login(): void{
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }



}

