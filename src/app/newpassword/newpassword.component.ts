import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  constructor(private router: Router, public publicservice: PublicService, public snackbar: MatSnackBar) {

  }
  ngOnInit(): void {


  }
  ngAfterViewInit(): void {
    var inputEmail = document.getElementById("inputEmail");
    inputEmail.addEventListener("keyup", function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
      //  document.getElementById("loginButton").click();
      }
    })
    var inputPassword = document.getElementById("inputPassword");

  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }

}

