import { Injectable } from '@angular/core';
// import { User, Car, Service } from './models/Models'
import { Texts } from './models/Texts';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AppDialogComponentDialog } from './app-dialog/app-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component'


@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: string = "";
  public User: any = {};
  public ApiUrl: String = "http://gamecraft.ce.aut.ac.ir";
  // public ApiUrl: String = "http://127.0.0.1:8000";
  public Email: String = "";
  public PhoneNumber: String = "";
  public Password: String = "";
  public Name: String = "";
  Texts: Texts = new Texts();
  public Token: String = "";
  public logedIn: boolean = false;
  public fileName:string = "";
  Mockup() {



  }




  constructor(private http: Http, public dialog: MatDialog, public snackbar: MatSnackBar) {
    this.Authorization = localStorage.getItem("Authorization");
    if (this.Authorization != null) {
      this.logedIn = true;
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

    if (body.error) {
      that.DisplayErrorDialog(body.message);
      Promise.reject(body.error);
    } else {
      return body || {};
    }

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
    let errMsg = JSON.parse(error._body);//error.message || 'Server error';

    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

  UpdateImage(): Promise<any>{
    var that = this;
    this.APICalls.UpdateImage = true;
    let body = JSON.stringify({
      "profile": this.fileName
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.put(this.ApiUrl + '/api/users/profile/update/', body, options)
    .toPromise()
    .then((r) => this.extractData(r, this))
    .catch(this.handleError);

  ret.then(r => {
    this.APICalls.SignUp = false;
    console.log(r);
  }).catch(e => {
    this.APICalls.SignUp = false;
    that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 1000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
  });
  return ret;
  }

  SignUp(): Promise<any> {
    var that = this;
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
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/users/sign_up/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.SignUp = false;
    }).catch(e => {
      this.APICalls.SignUp = false;
      that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 1000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    });
    return ret;
  }
  Login(): Promise<any> {
    var that = this;
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email,
      "password": this.Password,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/token/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      }
      else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 1000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }

  getTalks(): Promise<any> {
    var that = this;
    this.APICalls.getTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/talk/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getTalks = false;
    }).catch(e => {
      this.APICalls.getTalks = false;
      that.snackbar.openFromComponent(ErrorDialogComponent,{duration:1000,data:e.message,panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});

    });
    return ret;
  }
  getWorkshops(): Promise<any> {
    var that = this;
    this.APICalls.getWorkshops = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/workshop/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getWorkshops = false;
    }).catch(e => {
      this.APICalls.getWorkshops = false;
      that.snackbar.openFromComponent(ErrorDialogComponent,{duration:1000,data:e.message,panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});

    });
    return ret;
  }
  getUsers(): Promise<any> {
    var that = this;
    this.APICalls.getUsers = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/workshop/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      that.snackbar.openFromComponent(ErrorDialogComponent,{duration:1000,data:e.message,panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});

    });
    return ret;
  }









  // DisplayErrorDialog(Error: any,that : any) {
  //   let dialogRef = that.dialog.open(ErrorDialogComponent, {
  //     data: { Type: Error}
  //   });
  // }

  // DisplaySuccessDialog(Message: string) {
  //   let dialogRef = this.dialog.open(AppDialogComponentDialog, {
  //     data: { Type: 'Success', Message: Message }
  //   });
  // }



}
