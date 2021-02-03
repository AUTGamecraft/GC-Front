import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
  constructor(private router: Router, public publicservice: PublicService, private dialog: MatDialog) { }

  signup(): void {
    const navigationDetails: string[] = ['signup'];
    this.router.navigate(navigationDetails);
  }
  ngOnInit(): void {
    var inputEmail = document.getElementById("inputEmail");
    inputEmail.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
    var inputPassword = document.getElementById("inputPassword");
    inputPassword.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
  }
  Login() {
    if (this.emailFormControl.status == "VALID" && this.passwordFormControl.status == "VALID") {
      this.publicservice.Login().then(r => {
        console.log(r)
        if (r.error == null) {
          this.router.navigate(['home'])
        }
        else{
          this.dialog.open(ErrorDialogComponent,{ data: { type: r.message } })
        }
      })
    }
    else {
      this.dialog.open(ErrorDialogComponent, { data: { type: 'notFilled' } });
    }
  }
}
