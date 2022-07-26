import {Injectable, NgZone} from '@angular/core';
// import { User, Car, Service } from './models/Models'
import {Texts} from './models/Texts';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {MatDialog} from '@angular/material/dialog';
// import { AppDialogComponentDialog } from './app-dialog/app-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorDialogComponent} from '../app/error-dialog/error-dialog.component'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {SuccessDialogComponent} from '../app/success-dialog/success-dialog.component';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: string = "";
  public User: any = {};
  public ApiUrl: String = "https://gamecraft.ce.aut.ac.ir";
  // public ApiUrl: String = "http://127.0.0.1:8000";
  public Email: String = "";
  public PhoneNumber: String = "";
  public Password: String = "";
  public Name: String = "";
  Texts: Texts = new Texts();
  public Token: String = "";
  public logedIn: boolean = false;
  public fileName: string = "";
  public file: File;
  public isStaff: boolean;
  public userName: string = "";
  public loggedInUserEmail: string = "";
  public hasError: boolean;
  public talkPk;
  public workshopPk;
  public discount_code: string = "";
  public newPassword: String = "";
  public newPassword2: String = "";

  // field of create-game-component
  public createGame= {
    gameName:""
  }
  
  public currentGame: {
    game: any;
  } = {
    game: undefined,
  };

  public games: {
    title: string;
    poster: string;
    description: string;
    link: string;
    team: string;
    creators: [];
    likes: any[];
    is_verified: boolean;
    timestamp: string;
    game_code: number;
    // TODO: remove below line
    average_score: number;
  }[] = [];

  Mockup() {


  }


  constructor(private http: Http, public dialog: MatDialog, public snackbar: MatSnackBar, private http2: HttpClient, public router: Router, private zone: NgZone) {
    this.Authorization = localStorage.getItem("Authorization");
    if (this.Authorization != null) {
      this.logedIn = true;
    }
    // this.dialog..PublicService=this;
    // this.Mockup();
    this.Texts.Init();
  }


  extractData(res: Response, that: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }


    let body = res.json();
    // console.lo÷g(body);
    // if (body.message) {
    //   that.DisplaySuccessDialog(body.message);

    // }
    // if(body.error != null){
    //   if (window.innerWidth > 992) {
    //     that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: body.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    //   }
    //   else {
    //     that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: body.message, panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    //   }
    //   return Promise.reject(body);
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

  UpdateImage(): void {
    let uploadData = new FormData();
    uploadData.append("profile", this.file);
    this.APICalls.UpdateImage = true;
    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer ' + this.Authorization);
    const req = new HttpRequest("PUT", this.ApiUrl + '/api/v2/users/profile/update/', uploadData, { headers: h });
    this.http2.request(req).
      toPromise().
      then((r) => {
        // if (window.innerWidth > 992) {
        this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'عکس با موفقیت آپلود شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
        // }
        // else {
        // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'عکس با موفقیت آپلود شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
        // }
        location.reload();
      })
      .catch(this.handleError);

  }

  checkDiscount(): Promise<any> {
    var that = this;
    this.APICalls.checkDiscount = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/coupon/' + this.discount_code.trim() + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.checkDiscount = false;
    }).catch(e => {
      this.APICalls.checkDiscount = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  SignUp(): Promise<any> {
    var that = this;
    this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "password": this.Password,
      "phone_number": this.PhoneNumber,
      "email": this.Email.toLowerCase(),
      "first_name": this.Name,
      "user_name": this.Email
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/users/sign_up/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.SignUp = false;
    }).catch(e => {
      this.APICalls.SignUp = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });

    });
    return ret;
  }

  changepassword(token: string): Promise<any> {
    var that = this;
    //this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "password": this.newPassword,
      //"phone_number": this.PhoneNumber,
      //"email": this.Email.toLowerCase(),
      //"first_name": this.Name,
      //"user_name": this.Email
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.put(this.ApiUrl + '/api/v2/activation/reset-pass/' + token, body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      // this.APICalls.SignUp = false;
    }).catch(e => {
      // this.APICalls.SignUp = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });

    });
    return ret;
  }

  Login(): Promise<any> {
    var that = this;
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email.toLowerCase(),
      "password": this.Password,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/token/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });
    });
    return ret;
  }

  sendmail(): Promise<any> {
    var that = this;
    // this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email.toLowerCase(),

    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/users/reset_pass/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      //this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['forgot']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }


  getTalks(): Promise<any> {
    var that = this;
    this.APICalls.getTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/talk/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getTalks = false;
    }).catch(e => {
      this.APICalls.getTalks = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });

    });
    return ret;
  }

  getWorkshops(): Promise<any> {
    var that = this;
    this.APICalls.getWorkshops = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/workshop/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getWorkshops = false;
    }).catch(e => {
      this.APICalls.getWorkshops = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });

    });
    return ret;
  }

  getAvailableUsers(): Promise<any> {
    var that = this;
    this.APICalls.getUsers = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/available_list/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getUser(): Promise<any> {
    var that = this;
    this.APICalls.getUsers = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/profile/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  submitGame(body): Observable<Response> {

    // boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.Authorization
    });
    // let options = new RequestOptions({headers: headers});
    const options = {
      headers,
    }

    const formData = new FormData();
    formData.append('title',body.title)
    formData.append('description',body.description)
    formData.append('game_link',body.game_link)
    formData.append('team',body.team)
    formData.append('poster',body.poster)

    const res: Observable<Response> = this.http.post(this.ApiUrl + '/api/v2/game/', formData, options)
    return res
  }


  getGames(): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    if(this.logedIn && this.Authorization){
      headers.append('Authorization', 'Bearer ' + this.Authorization)
    }

    let options = new RequestOptions({headers: headers});
    const res: Observable<Response> = this.http.get(this.ApiUrl + '/api/v2/game/', options)
    return res
  }

  submitComment(body): Observable<Response> {

    // boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.Authorization
    });
    // let options = new RequestOptions({headers: headers});
    const options = {
      headers,
    }

    const formData = new FormData();
    formData.append('text',body.text)
    formData.append('score',body.score)
    formData.append('game',body.game)

    const res: Observable<Response> = this.http.post(this.ApiUrl + '/api/v2/game/comment/', formData, options)
    return res
  }

  submitLike(body): Observable<Response> {

    // boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.Authorization
    });
    // let options = new RequestOptions({headers: headers});
    const options = {
      headers,
    }

    const formData = new FormData();
    formData.append('game',body.game)

    const res: Observable<Response> = this.http.post(this.ApiUrl + '/api/v2/game/like/', formData, options)
    return res
  }


  getComments(game_code: number): Observable<Response> {
    const res: Observable<Response> = this.http.get(this.ApiUrl + `/api/v2/game/${game_code}/comments/`, {})
    return res
  }

  ActivateUser(token: string): Promise<any> {
    var that = this;
    this.APICalls.ActivateUser = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/activation/' + token, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.ActivateUser = false;
    }).catch(e => {
      this.APICalls.ActivateUser = false;
      this.hasError = true;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  EnrollTalk(): Promise<any> {
    var that = this;
    this.APICalls.EnrollTalk = true;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/talk/' + this.talkPk + '/enroll/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.EnrollTalk = false;
    }).catch(e => {
      this.APICalls.EnrollTalk = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  EnrollWorkshop(): Promise<any> {
    var that = this;
    this.APICalls.EnrollWorkshop = true;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/workshop/' + this.workshopPk + '/enroll/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.EnrollWorkshop = false;
    }).catch(e => {
      this.APICalls.EnrollWorkshop = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getUserCart(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/service/cart/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getUserDashboard(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/service/dashboard/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  deleteCartItem(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/v2/service/' + this.workshopPk + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getUserGame(): Observable<Response> {

    // boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.Authorization
    });
    // let options = new RequestOptions({headers: headers});
    const options = {
      headers,
    }

    const res: Observable<Response> = this.http.get(this.ApiUrl + '/api/v2/game/my-game/', options)
    return res
  }

  deleteTalk(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/v2/service/' + this.talkPk + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getUsersCount(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/count/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      // if (window.innerWidth > 992) {
      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: e.message,
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });

    });
    return ret;
  }

  getPaymentLink(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let body = JSON.stringify({
      'coupon': this.discount_code.trim(),
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/service/payment/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  createTeam(emails): Promise<any> {
    var that = this;
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "name": this.Name,
      "emails": emails,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/team/create_team/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  }

  getTeam(pk): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/team/' + pk + "/", options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  };

  enrollTeam(mid, tid): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({headers: headers});
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/team/join/' + tid + "/" + mid, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.message,
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    });
    return ret;
  };

}
