import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../../app/success-dialog/success-dialog.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
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
    
  }
  sendmail() {
    if (this.emailFormControl.status == "VALID" ) {
       this.publicservice.sendmail().then(r => {
         if (r.error == null) {
           console.log(r);
           console.log("email was sent")
           this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'ایمیل تغییر گذرواژه با موفقیت ارسال شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
           this.router.navigate(['login']);
         }
       })
    }
    else {
      // if (  window.innerWidth<992){
        this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'bottom',direction:'rtl'});
      // }
      // else{
      // this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});
      // }
    }
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  
}
