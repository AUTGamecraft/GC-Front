import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
  }
  openDialogSignUp(){
    const dialogRef = this.dialog.open(SignUpPageComponent);
  }
  openDialogSignIn(){
    const dialogRef = this.dialog.open(LoginComponent);
  }
  

}

