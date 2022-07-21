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
    Validators.pattern("https:\/\/drive\.google\.com\/.*?usp=sharing"),
  ]);
  descFormControl = new FormControl('', [
    Validators.required,
  ]);

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  userName: string = "";
  count = 0;
  // usersArray: any = [];
  teamArray: any = [];
  isEmpty = true;
  hasTeam = false;
  hasGame = false;
  teamInfo: any = [];

  createGame: {
    gameName: string,
    gameLink: string,
    gameDescription: string,
    posterToUpload: File | null,
    teamID: string,
    is_verified: boolean,
  } = {
    gameName: "",
    gameLink: "",
    gameDescription:"",
    posterToUpload: null,
    teamID:"",
    is_verified: false,
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
      publicservice.getUserCart().then((r) => {
        this.count = r.data.length;
      });

      publicservice.getUserGame().subscribe((res)=>{
        this.hasGame = true;
        const game = this.publicservice.extractData(res, this)
        console.log("user game is..." ,game)
        this.createGame.gameDescription = game['description']
        this.createGame.gameName = game['title']
        this.createGame.gameLink = game['game_link']
        this.createGame.is_verified = game['is_verified']
        this.imageToShowAsGameAvatar = game['poster']
      }, error => {
        console.log("error is..." ,error)
      })

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


  Cart() {
    this.router.navigate(['cart'], { fragment: 'cart' });
  }

  addGame(){
    this.router.navigate(['dashboard-create-game']);
  }

  handleFileInput(files: FileList) {
    this.createGame.posterToUpload = files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      console.log(reader.result)
        this.imageToShowAsGameAvatar = reader.result;
    }
  }


  submitGame() {
    const body = {
      title: this.createGame.gameName,
      description: this.createGame.gameDescription,
      game_link: this.createGame.gameLink,
      team: this.teamInfo.pk,
      poster: this.createGame.posterToUpload,
    }

    this.publicservice.submitGame(body).subscribe(res =>{
      // const game = this.publicservice.extractData(res, this)
      this.hasGame = true

      this.publicservice.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'بازی با موفقیت ساخته شد. پس از تایید در صفحه بازی‌ها قابل نمایش خواهد بود.', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    }, error => {
      if(error["_body"] && error["_body"].includes("The fields team must make a unique set")){
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'شما قبلا بازی ساخته اید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      } else if(error["_body"] && error["_body"].includes("User should be head of team")){
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'تنها هد تیم امکان ساختن بازی را دارد.', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      } else if(error["_body"] && error["_body"].includes("Team is not activated yet")){
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'تیم شما هنوز فعال نشده است.', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }else{
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'مشکلی پیش آمده: لطفا مجددا تلاش نمایید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    })


  }
}
