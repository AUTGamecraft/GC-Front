import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})


export class SignUpPageComponent implements OnInit {
  hide = true;
  emailFormControl1 = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailFormControl2 = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern("^09[0-9]{9}"),
  ]);
  emailFormControl3 = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  emailFormControl4 = new UntypedFormControl('', [
    Validators.required,
  ]);
  scrHeight: any;
  constructor(private router: Router, public publicservice: PublicService, private snackbar: MatSnackBar, private dialog: MatDialog) {

  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    var inputName = document.getElementById("inputName");
    var inputEmail = document.getElementById("inputEmail");
    var inputPhone = document.getElementById("inputPhone");
    var inputPassword = document.getElementById("inputPassword");
    inputEmail.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputName.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPhone.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPassword.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
  }

  signUp() {
    scrHeight: window.innerHeight;
    scrWidth: window.innerWidth;
    if (this.emailFormControl1.status == "VALID" && this.emailFormControl2.status == "VALID" && this.emailFormControl3.status == "VALID" && this.emailFormControl4.status == "VALID") {
      this.publicservice.SignUp().then(r => {
        // if (window.innerWidth > 992) {
          this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 3000, data: 'لینک فعالسازی به ایمیل شما ارسال شد', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
        // }
        // else{
          // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 3000, data: 'لینک فعالسازی به ایمیل شما ارسال شد', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
        // }
        this.router.navigate(['login']);
      });
    }
    else {
      // if (window.innerWidth < 992) {
        this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'فیلد ها را پر کنید', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      // else {
        // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'فیلد ها را پر کنید', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
    }

  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
}
