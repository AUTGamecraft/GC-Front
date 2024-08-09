import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PublicService} from '../public.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-media',
  templateUrl: './dashboard-media.component.html',
  styleUrls: ['./dashboard-media.component.scss']
})
export class DashboardMediaComponent implements OnInit {
  userName: string = "";
  isStaff: boolean;
  count = 0;
  talksArray: any = [];
  workshopsArray: any = [];

  constructor(
    private router: Router,
    public publicService: PublicService,
    public snackbar: MatSnackBar
  ) {
    if (!publicService.logedIn) {
      this.router.navigate(['login']);
    } else {
      publicService.getUser().then((r) => {
        this.userName = r.data.first_name;
        this.isStaff = r.data.is_staff;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
      });
      publicService.getUserCart().then((r) => {
        for (let i = 0; i < r.data.length; i++) {
          if (r.data[i].talk == null) {
            this.count = this.count + 1;
          }
        }
      });
      publicService.getUserDashboard().then((r) => {
        for (let i = 0; i < r.data.length; i++) {
          console.log(r.data[i]);
          if (r.data[i].service_type == "TALK" && r.data[i].talk.files != null) {
            this.talksArray.push(r.data[i].talk);
          }
          if (r.data[i].service_type == "WORKSHOP" && r.data[i].workshop.files != null) {
            this.workshopsArray.push(r.data[i].workshop);
          }
        }
        console.log(this.workshopsArray);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'dash') {
      setTimeout((() => this.Schedule(document.getElementById('dash'))), 200)
    }
  }

  ngOnInit(): void {
  }

  downloadTalk(i) {
    location.href = this.talksArray[i].files;
  }

  downloadWorkshop(i) {
    location.href = this.workshopsArray[i].files;
  }

  People() {
    this.router.navigate(['people'], {fragment: 'people'});
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
    this.router.navigate(['dashboard-teams'], {fragment: 'dash'});
  }

  gameStatus() {
    this.router.navigate(['dashboard-create-game'])
  }

  // Upload() {
  //   document.getElementById('imgUpload').click();
  // }
  // handleFileInput(imageInput: any) {
  //   const file = imageInput.item(0);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   // console.log(file);
  //   this.publicservice.fileName = file.name;
  //   this.publicservice.UpdateImage();
  // }
  Cart() {
    this.router.navigate(['cart'], {fragment: 'cart'});
  }
}
