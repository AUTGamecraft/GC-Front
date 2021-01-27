import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
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
    Validators.pattern("09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}"),
  ]);
  emailFormControl3 = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  emailFormControl4 = new FormControl('', [
    Validators.required,
  ]);
  constructor( private router: Router,public publicservice : PublicService) {
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
    inputEmail.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputName.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPhone.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
    inputPassword.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("signUpButton").click();
      }
    })
  }

  signUp(){
    this.publicservice.SignUp().then(r=>{
      if(r.error == "" || r.error == undefined || r.error == null)
      {
        this.router.navigate(['login']);
      }
    });

  }
}
