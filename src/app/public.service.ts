import { Injectable } from '@angular/core';
// import { User, Car, Service } from './models/Models'
// import { Texts } from './models/Texts';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
// import { MatDialog } from '@angular/material/dialog';
// import { AppDialogComponentDialog } from './app-dialog/app-dialog.component';




@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: String = "";
  public User: any = {};
  public ApiUrl: String = "";
  public Email: String = "";
  public PhoneNumber: String = "";
  public Password: String = "";

  Mockup() {



  }




  constructor(private http: Http) {
    this.Authorization = localStorage.getItem("Authorization");
    // this.dialog..PublicService=this;
    // this.Mockup();
    // this.Texts.Init();
  }


  private extractData(res: Response, that: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    let body = res.json();
    if (body.message) {
      that.DisplaySuccessDialog(body.message);

    }

    if (body.alerts) {
      that.DisplayErrorDialog(body.alerts);
      Promise.reject(body.alerts);
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
    let errMsg = JSON.parse(error._body).ExceptionMessage;//error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }



  SignUp(): Promise<any> {
    this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "action": "",
      "par1": this.PhoneNumber,
      "par2": this.Password,
      "par3": this.Email,
      "par4": "",
      "par5": ""
    });
    let headers = new Headers({
      'Content-Type': 'application/json', 'Authorization': 'token ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/user/sign-up', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      // this.User = r.data.User;
      this.APICalls.SignUp = false;
    }).catch(e => {
      this.APICalls.SignUp = false;
    });
    return ret;
  }
  Login(): Promise<any> {
    this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "action": "",
      "par1": this.Email,
      "par2": this.Password,
      "par3": "",
      "par4": "",
      "par5": ""
    });
    let headers = new Headers({
      'Content-Type': 'application/json', 'Authorization': 'token ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/user/login', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      // this.User = r.data.User;
      this.APICalls.Login = false;
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
