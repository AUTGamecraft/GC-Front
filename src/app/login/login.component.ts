import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hide = true;
  constructor( private router: Router,public publicservice: PublicService) { }
  
  signup(): void {
    const navigationDetails: string[] = ['signup'];
    this.router.navigate(navigationDetails);
  }
  ngOnInit(): void {
    var inputEmail = document.getElementById("inputEmail");
    inputEmail.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
    var inputPassword = document.getElementById("inputPassword");
    inputPassword.addEventListener("keyup",function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    })
  }
  Login(){
    this.publicservice.Login().then(r=>{
      if(r.error == "" || r.error == undefined || r.data.error == null){
        this.router.navigate(['home'])
      }
    })
  }
}
