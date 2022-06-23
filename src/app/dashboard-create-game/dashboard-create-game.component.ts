import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PublicService } from '../public.service';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dashboard-create-game',
  templateUrl: './dashboard-create-game.component.html',
  styleUrls: ['./dashboard-create-game.component.scss']
})
export class DashboardCreateGameComponent implements OnInit {
  isStaff: boolean;
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  linkFormControl = new FormControl('', [
    Validators.required,
  ]);
  descFormControl = new FormControl('', [
    Validators.required,
  ]);
  
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  userName: string = "";
  count = 0;
  usersArray: any = [];
  teamArray: any = [];
  isEmpty = true;
  hasTeam = false;
  teamInfo: any = [];

  createGame: {
    gameName: string,
    gameLink: string,
    gameDescription: string,
    posterToUpload: File | null,
    teamID: string
  } = {
    gameName: "",
    gameLink: "",
    gameDescription:"",
    posterToUpload: null,
    teamID:""
  }

  imageToShowAsGameAvatar: any = ""


  uploadedGame = {
    
  }

  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();


  constructor(private router: Router, public publicservice: PublicService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    if(publicservice.logedIn) {
      publicservice.getUser().then((r) => {
        this.userName = r.data.first_name;
        this.isStaff = r.data.is_staff;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
        if (r.data.team != null) {
          this.hasTeam = true;
          publicservice.getTeam(r.data.team).then((r) => {
            this.teamInfo = r.data;
          });
        }
      });
      publicservice.getAvailableUsers().then((r) => {
        for (let i = 0; i < r.data.length; i++) {
          if (!r.data[i].has_team) {
            this.usersArray.push(r.data[i]);
            this.options.push(r.data[i].email)
          }
        }
        this.options.sort();
      });
      publicservice.getUserCart().then((r) => {
        this.count = r.data.length;
      });
    }
  }
  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'dash') {
      setTimeout((() => this.Schedule(document.getElementById('dash'))), 200);
    }
  }
  ngOnInit(): void {
    var that = this;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.route.queryParams.subscribe(params => {
      if (params['mid'] != undefined || params['tid'] != undefined) {
        this.publicservice.enrollTeam(params['mid'], params['tid']).then(() => {
          this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'با موفقیت به تیم اضافه شدید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
          this.Teams();
          if(!this.publicservice.logedIn){
            this.router.navigate(['login']);
          }
        });
      }
    });
  }
  Schedule(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  People() {
    this.router.navigate(['people'], { fragment: 'people' });
  }
  events(): void {
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails, { fragment: 'dash' });
  }
  media(): void {
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2, { fragment: 'dash' });
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  Teams() {
    this.router.navigate(['dashboard-teams'], { fragment: 'dash' });
  }
  gameStatus() {
    this.router.navigate(['dashboard-create-game'])
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  Add(option) {
    for (let i = 0; i < this.teamArray.length; i++) {
      if (this.teamArray[i].email == option) {
        return;
      }
    }
    if (this.teamArray.length == 4) {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'حداکثر تعداد اعضا 5 نفر است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      return;
    }
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == option) {
        this.teamArray.push(this.usersArray[i]);
        this.isEmpty = false;
        return;
      }
    }
    if (option.length != 0) {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'یافت نشد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    }
  }
  Cart() {
    this.router.navigate(['cart'], { fragment: 'cart' });
  }
  returnProfile(option) {
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == option) {
        return this.usersArray[i].profile;
      }
    }
  }
  returnEmail(option) {
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == option) {
        return this.usersArray[i].email;
      }
    }
  }
  returnName(option) {
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == option) {
        return this.usersArray[i].first_name;
      }
    }
  }
  removeUser(i) {
    this.teamArray.splice(i, 1);
    if (this.teamArray.length == 0) {
      this.isEmpty = true;
    }
  }
  confirm() {
    if (this.teamArray.length < 2) {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'حداقل تعداد اعضا 3 نفر است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      return;
    }
    if (this.nameFormControl.status != "VALID") {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'نام تیم اجباری است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      return;
    }
    let tmp: any = [];
    for (let i = 0; i < this.teamArray.length; i++) {
      tmp.push(this.teamArray[i].email);
    }
    this.publicservice.createTeam(tmp).then((r) => {
      this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'تیم با موفقیت تشکیل شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      location.reload();
    });
  }
  addGame(){
    this.router.navigate(['dashboard-create-game']);
  }
  
  handleFileInput(files: FileList) {
    console.log("new file selected======>")
    this.createGame.posterToUpload = files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      console.log(reader.result)
        this.imageToShowAsGameAvatar = reader.result; 
    }
  }

  
  submitGame() {
    // TODO API call to backend
    const body = {
      title: this.createGame.gameName,
      description: this.createGame.gameDescription,
      game_link: this.createGame.gameLink,
      team: this.teamInfo.pk,
      poster: this.createGame.posterToUpload,
    }


    console.log("here is user team")
    console.log(this.teamInfo.pk)

    this.publicservice.submitGame(body).subscribe(res =>{
      
      this.createGame = {
        gameName: "",
        gameLink: "",
        gameDescription:"",
        posterToUpload: null,
        teamID:""
      }

      this.publicservice.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'بازی با موفقیت ساخته شد. پس از تایید در صفحه بازی‌ها قابل نمایش خواهد بود.', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

      // TODO show success dialog to the user
    }, error => {
      console.log("====================")
      console.log(error)
      
      console.log("====================###")
      console.log(error["_body"]["error"])
      if(error["_body"] && error["_body"].includes("The fields team must make a unique set")){
        console.log("shitttttttttttttt==========>")
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'شما قبلا بازی ساخته اید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }else{
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'مشکلی پیش آمده: لطفا مجددا تلاش نمایید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    })


  }
}
