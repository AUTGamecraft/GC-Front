import {Injectable, NgZone} from '@angular/core';
import {Texts} from './models/Texts';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: string = "";
  public User: any = {};
  public ApiUrl: String = environment.apiUrl;
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
  public favoriteGame: String = "";

  // field of create-game-component
  public createGame = {
    gameName: ""
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

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router,
    private zone: NgZone
  ) {
    this.Authorization = localStorage.getItem("Authorization");
    if (this.Authorization != null) {
      this.logedIn = true;
    }
    // this.dialog..PublicService=this;
    // this.Mockup();
    this.Texts.Init();
  }

  UpdateImage(): void {
    let uploadData = new FormData();
    uploadData.append("profile", this.file);
    this.APICalls.UpdateImage = true;
    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer ' + this.Authorization);
    const req = new HttpRequest("PUT", this.ApiUrl + '/api/v2/users/profile/update/', uploadData, {headers: h});
    this.http.request(req).toPromise().then((r) => {
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(SuccessDialogComponent, {
        duration: 2000,
        data: 'عکس با موفقیت آپلود شد!',
        panelClass: ['snackbar'],
        verticalPosition: 'top',
        direction: 'rtl'
      });
      // }
      // else {
      // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'عکس با موفقیت آپلود شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      location.reload();
    })
  }

  checkDiscount(): Promise<any> {
    var that = this;
    this.APICalls.checkDiscount = true;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/coupon/' + this.discount_code.trim() + '/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.checkDiscount = false;
    }).catch(e => {
      this.APICalls.checkDiscount = false;
      if (e.status === 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.error.error,
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
      "user_name": this.Email,
      "favorite_game_title": this.favoriteGame
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/users/sign_up/', body, {headers: headers})
      .toPromise()

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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.put(this.ApiUrl + '/api/v2/activation/reset-pass/' + token, body, {headers: headers})
      .toPromise()

    ret.then(r => {
      // Uncomment or handle any actions post-success if needed
    }).catch(e => {
      // Uncomment or handle any actions post-error if needed
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

  registerTeamForCompetition(): Promise<any> {
    var that = this;
    this.APICalls.registerTeamForCompetition = true;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/team/enroll/', null, {headers: headers})
      .toPromise();

    return ret
  }

  Login(): Promise<any> {
    var that = this;
    this.APICalls.Login = true;

    let body = JSON.stringify({
      "email": this.Email.toLowerCase(),
      "password": this.Password,
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/token/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {
        // Handle specific error if needed
      }
    }).catch(e => {
      this.APICalls.Login = false;
      that.snackbar.openFromComponent(ErrorDialogComponent, {
        duration: 2000,
        data: "نام کاربری یا رمز عبور اشتباه است، در صورت فعال نکردن اکانت خود، ایمیلتان را چک کنید",
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/users/reset_pass/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      //this.APICalls.Login = false;
      if (r.error == null) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {
        // Handle specific error if needed
      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/talk/', {headers: headers})
      .toPromise()

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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/workshop/', {headers: headers})
      .toPromise();


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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/available_list/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/profile/', {headers: headers})
      .toPromise();

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

  submitGame(body: any): Observable<HttpResponse<any>> {
    // Create HttpHeaders
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Create FormData
    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('description', body.description);
    formData.append('game_link', body.game_link);
    formData.append('team', body.team);
    formData.append('poster', body.poster);

    // Make HTTP POST request
    return this.http.post(this.ApiUrl + '/api/v2/game/', formData, {
      headers: headers,
      observe: 'response'  // To include the full HTTP response in the Observable
    });
  }

  getGames(): Observable<HttpResponse<any>> {
    // Create HttpHeaders
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Add Authorization header if logged in
    if (this.logedIn && this.Authorization) {
      headers = headers.append('Authorization', 'Bearer ' + this.Authorization);
    }

    // Make HTTP GET request
    return this.http.get(this.ApiUrl + '/api/v2/game/', {
      headers: headers,
      observe: 'response'  // To include the full HTTP response in the Observable
    });
  }

  submitComment(body): Observable<HttpResponse<any>> {
    // Create HttpHeaders
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Create FormData
    const formData = new FormData();
    formData.append('text', body.text);
    formData.append('score', body.score);
    formData.append('game', body.game);

    // Make HTTP POST request
    return this.http.post(this.ApiUrl + '/api/v2/game/comment/', formData, {
      headers: headers,
      observe: 'response'  // To include the full HTTP response in the Observable
    });
  }

  submitLike(body): Observable<HttpResponse<any>> {
    // Create HttpHeaders
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Create FormData
    const formData = new FormData();
    formData.append('game', body.game);

    // Make HTTP POST request
    return this.http.post(this.ApiUrl + '/api/v2/game/like/', formData, {
      headers: headers,
      observe: 'response'  // To include the full HTTP response in the Observable
    });
  }


  getComments(game_code: number): Observable<HttpResponse<any>> {
    // Create HttpHeaders if necessary, or leave empty
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers if needed
    });

    // Make HTTP GET request
    return this.http.get(this.ApiUrl + `/api/v2/game/${game_code}/comments/`, {
      headers: headers,
      observe: 'response'  // To include the full HTTP response in the Observable
    });
  }

  ActivateUser(token: string): Promise<any> {
    var that = this;
    this.APICalls.ActivateUser = true;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/activation/' + token, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.ActivateUser = false;
    }).catch(e => {
      this.APICalls.ActivateUser = false;
      this.hasError = true;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let body = {};

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/talk/' + this.talkPk + '/enroll/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.EnrollTalk = false;
    }).catch(e => {
      this.APICalls.EnrollTalk = false;
      if (e.status === 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.error.message,
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let body = {};    // Create HttpHeaders

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/workshop/' + this.workshopPk + '/enroll/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.EnrollWorkshop = false;
    }).catch(e => {
      this.APICalls.EnrollWorkshop = false;
      if (e.status === 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      } else {
        that.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: e.error.message,
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/service/cart/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/service/dashboard/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/v2/service/' + this.workshopPk + '/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

  getUserGame(): Observable<any> {
    // Prepare headers
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Make HTTP GET request
    return this.http.get<any>(this.ApiUrl + '/api/v2/game/my-game/', {headers: headers});
  }

  deleteTalk(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/v2/service/' + this.talkPk + '/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/users/count/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    let body = {
      'coupon': this.discount_code.trim(),
    };

    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/service/payment/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Prepare the body and headers
    let body = {
      "name": this.Name,
      "emails": emails,
    };

    // Make HTTP POST request and convert Observable to Promise
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/v2/team/create_team/', body, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      } else {
        // Handle any additional logic if required
      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status === 401) {
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

    // Prepare headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });

    // Make HTTP GET request and convert Observable to Promise
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/team/' + pk + '/', {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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

  enrollTeam(mid, tid): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;

    // Prepare headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Make HTTP GET request and convert Observable to Promise
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/v2/team/join/' + tid + "/" + mid, {headers: headers})
      .toPromise();

    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status === 401) {
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
}
