import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})


export class SignUpPageComponent implements OnInit {
  hide = true;
  emailFormControl1 = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern("^09[0-9]{9}"),
  ]);
  emailFormControl3 = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  emailFormControl4 = new FormControl('', [
    Validators.required,
  ]);
  constructor(private router: Router, public publicservice: PublicService,private snackbar:MatSnackBar,private dialog : MatDialog) {
  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }

  ngOnInit(): void {
    var inputName = document.getElementById("inputName");
    var inputEmail = document.getElementById("inputEmail");
    var inputPhone = document.getElementById("inputPhone");
    var inputPassword = document.getElementById("inputPassword");
    inputEmail.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputName.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPhone.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPassword.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
  }

  signUp() {
    if (this.emailFormControl1.status == "VALID" && this.emailFormControl2.status == "VALID" && this.emailFormControl3.status == "VALID" && this.emailFormControl4.status == "VALID") {
      this.publicservice.SignUp().then(r => {
        if (r.error == null) {
          this.router.navigate(['login']);
        }
      });
    }
    else{
      this.snackbar.openFromComponent(ErrorDialogComponent,{duration:1000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});
    }

  }
}
