import { Injectable } from '@angular/core';
// import { User, Car, Service } from './models/Models'
import { Texts } from './models/Texts';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
// import { MatDialog } from '@angular/material/dialog';
// import { AppDialogComponentDialog } from './app-dialog/app-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: string = "";
  public User: any = {};
  public ApiUrl: String = "http://127.0.0.1:8000";
  public Email: String = "";
  public PhoneNumber: String = "";
  public Password: String = "";
  public Name: String ="";
  Texts: Texts = new Texts();
  private snackbar: MatSnackBar;
  public Token: String ="";
  public logedIn: boolean = false;
  Mockup() {



  }




  constructor(private http: Http) {
    this.Authorization = localStorage.getItem("Authorization");
    if(this.Authorization != null){
      this.logedIn=true;
    }
    // this.dialog..PublicService=this;
    // this.Mockup();
    this.Texts.Init();
  }


  private extractData(res: Response, that: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let body = res.json();

    // if (body.message) {
    //   that.DisplaySuccessDialog(body.message);

    // }

    // if (body.alerts) {
    //   that.DisplayErrorDialog(body.alerts);
    //   Promise.reject(body.alerts);
    // } else {
      return body || {};
    // }

  }
  private extractData2(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
 
    let errMsg = JSON.parse(error._body).ExceptionMessage;//error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }



  SignUp(): Promise<any> {
    this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "password": this.Password,
      "phone_number": this.PhoneNumber,
      "email": this.Email,
      "first_name": this.Name,
      "user_name": this.Email
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/users/sign_up/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
      
    ret.then(r => {
      this.APICalls.SignUp = false;
      if(r.error != null){
        this.snackbar.open(r.error,'Undo',{duration:2000});
      }
    }).catch(e => {
      this.APICalls.SignUp = false;
    });
    return ret;
  }
  Login(): Promise<any> {
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email,
      "password": this.Password,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/token/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if(r.error != null){
        this.snackbar.open(r.message,'Undo',{duration:2000});
      }
      else{
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      }
    }).catch(e => {
      this.APICalls.Login = false;
    });
    return ret;
  }










  // DisplayErrorDialog(Error: string) {
  //   let dialogRef = this.dialog.open(AppDialogComponentDialog, {
  //     data: { Type: 'Error', Error: Error }
  //   });
  // }

  // DisplaySuccessDialog(Message: string) {
  //   let dialogRef = this.dialog.open(AppDialogComponentDialog, {
  //     data: { Type: 'Success', Message: Message }
  //   });
  // }



}
