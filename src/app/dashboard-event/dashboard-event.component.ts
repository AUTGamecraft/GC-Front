import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicService} from '../public.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import * as moment from 'jalali-moment';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-dashboard-event',
  templateUrl: './dashboard-event.component.html',
  styleUrls: ['./dashboard-event.component.scss']
})
export class DashboardEventComponent implements OnInit {
  talks = 'deactive';
  file: File = null;
  workshops = 'deactive';
  iconW = 'keyboard_arrow_down';
  iconT = 'keyboard_arrow_down';
  userName: string = "";
  isStaff: boolean;
  talksArray: any = [];
  talksDelete: any = [];
  talksPk: any = [];
  workshopsArray: any = [];
  talksActive: any = [];
  workshopsActive: any = [];
  email: string = "";
  hash: string = '';
  count = 0;
  isHideWorkshops: any = [];
  isHideTalks: any = [];
  workshopsHour: any = [];
  talksHour: any = [];
  workshopsStartHour: any = [];
  workshopsEndHour: any = [];
  talksStartHour: any = [];
  talksEndHour: any = [];

  constructor(
    private router: Router,
    public publicService: PublicService,
    public snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    if (!publicService.logedIn) {
      this.router.navigate(['login']);
    } else {
      publicService.getUser().then((r) => {
        this.userName = r.data.first_name;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
        this.isStaff = r.data.is_staff;
      });
      publicService.getUserDashboard().then((r) => {
        //  console.log(r);
        for (let i = 0; i < r.data.length; i++) {
          if (r.data[i].workshop == null) {
            this.talksPk.push(r.data[i].pk);
            this.talksStartHour.push(r.data[i].talk.start.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[0] + ":" + r.data[i].talk.start.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[1]);
            this.talksEndHour.push(r.data[i].talk.end.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[0] + ":" + r.data[i].talk.end.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[1]);
            r.data[i].talk.start = moment(r.data[i].talk.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(r.data[i].talk.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(r.data[i].talk.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(r.data[i].talk.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY');
            switch (r.data[i].talk.level) {
              case 'BEGINNER':
                r.data[i].talk.level = 'مبتدی';
                break;
              case 'EXPERT':
                r.data[i].talk.level = 'پیشرفته';
                break;
              case 'INTERMEDIATE':
                r.data[i].talk.level = 'متوسط';
                break;
              default:
                r.data[i].talk.level = 'unknown';
                break;
            }
            for (let j = 0; j < r.data[i].talk.presenters.length; j++) {
              this.isHideTalks.push('hide')
            }
            this.talksArray.push(r.data[i].talk);
            this.talksActive.push('deactive');
          } else {
            this.workshopsStartHour.push(r.data[i].workshop.start.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[0] + ":" + r.data[i].workshop.start.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[1]);
            this.workshopsEndHour.push(r.data[i].workshop.end.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[0] + ":" + r.data[i].workshop.end.split('T', 2)[1].split('+', 2)[0].split('.', 2)[0].split(':', 3)[1]);
            // console.log(this.workshopsEndHour);
            r.data[i].workshop.start = "شروع از " + moment(r.data[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(r.data[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(r.data[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(r.data[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY');
            switch (r.data[i].workshop.level) {
              case 'BEGINNER':
                r.data[i].workshop.level = 'مبتدی';
                break;
              case 'EXPERT':
                r.data[i].workshop.level = 'پیشرفته';
                break;
              case 'INTERMEDIATE':
                r.data[i].workshop.level = 'متوسط';
                break;
              default:
                r.data[i].workshop.level = 'unknown';
                break;
            }
            for (let j = 0; j < r.data[i].workshop.presenters.length; j++) {
              this.isHideWorkshops.push('hide');
            }
            this.workshopsArray.push(r.data[i].workshop);
            this.workshopsActive.push('deactive');
          }

        }
        // console.log(this.talksArray)
      })
      publicService.getUserCart().then((r) => {
        this.count = r.data.length;
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hash = params['status'];
      if (this.hash == 'true') {
        // if (window.innerWidth > 992) {
        this.snackbar.openFromComponent(SuccessDialogComponent, {
          duration: 2000,
          data: 'خریدتان با موفقیت انجام شد!',
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
        // }
        // else {
        // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'خریدتان با موفقیت انجام شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
        // }
      } else if (this.hash == 'false') {
        // if (window.innerWidth > 992) {
        this.snackbar.openFromComponent(ErrorDialogComponent, {
          duration: 2000,
          data: 'خطایی در خریدتان رخ داد!',
          panelClass: ['snackbar'],
          verticalPosition: 'top',
          direction: 'rtl'
        });
        // }
        // else {
        // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'خطایی در خریدتان رخ داد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
        // }
      }
      this.events();
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'dash') {
      setTimeout((() => this.Schedule(document.getElementById('dash'))), 200)
    }
  }

  Schedule(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth"});
  }

  events(): void {
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }

  media(): void {
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }

  logOut() {
    this.publicService.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }

  Home() {
    this.router.navigate(['home'], {fragment: 'home'});
  }

  Teams() {
    // if (window.innerWidth > 992) {
    this.router.navigate(['dashboard-teams'], {fragment: 'dash'});
    // }
    // else {
    // th/is.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    // }
    // this.router.navigate(['dashboard-teams']);
  }

  Cart() {
    this.router.navigate(['cart'], {fragment: 'cart'});
  }

  gameStatus() {
    this.router.navigate(['dashboard-create-game'])
  }

  Upload() {
    document.getElementById('imgUpload').click();
  }

  People() {
    this.router.navigate(['people'], {fragment: 'people'});
  }

  handleFileInput(imageInput: any) {
    this.file = imageInput.item(0);
    this.publicService.fileName = this.file.name;
    this.publicService.file = this.file;
    this.publicService.UpdateImage();
  }

  Enter() {
    // if(window.innerWidth>992){
    this.snackbar.openFromComponent(ErrorDialogComponent, {
      duration: 2000,
      data: 'این صفحه در دست ساخت است!',
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      direction: 'rtl'
    });
    // }
    // else{
    // th/is.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    // }
  }

  Delete(i) {
    //console.log(this.talksArray[i]);
    this.snackbar.openFromComponent(ErrorDialogComponent, {
      duration: 2000,
      data: 'حذف ارائه امکان پذیر نیست!',
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      direction: 'rtl'
    });

    // this.publicservice.talkPk = this.talksPk[i];
    // this.publicservice.deleteTalk().then((r) => {

    //    this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'ارائه با موفقیت  حذف شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });


    //   this.talksDelete[i] = 'delete';


    //this.totalCost = this.totalCost *((100-this.percentage)/100);

    //this.count = this.count - 1;
    // })
  }
}
