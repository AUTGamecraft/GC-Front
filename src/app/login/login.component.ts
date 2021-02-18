import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  constructor(private router: Router, public publicservice: PublicService,public snackbar: MatSnackBar) { 

  }

  signup(): void {
    const navigationDetails: string[] = ['signup'];
    this.router.navigate(navigationDetails);
  }
  ngOnInit(): void {


  }
  ngAfterViewInit():void{
    var inputEmail = document.getElementById("inputEmail");
    inputEmail.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
    var inputPassword = document.getElementById("inputPassword");
    inputPassword.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
  }
  Login() {
    if (this.emailFormControl.status == "VALID" && this.passwordFormControl.status == "VALID") {
      this.publicservice.Login().then(r => {
        if (r.error == null) {
          console.log(r);
          this.router.navigate(['home'])
        }
      })
    }
    else {
      if (  window.innerWidth<992){
        this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'bottom',direction:'rtl'});
      }
      else{
      this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});
      }
    }
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  
}
