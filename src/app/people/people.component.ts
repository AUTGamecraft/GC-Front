import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  userName: string = '';
  constructor(public publicservice: PublicService, public router: Router, public snackbar: MatSnackBar) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(); }
    //     }
    //   }
    // });
    if (publicservice.logedIn) {
      publicservice.getUser().then((r) => {
        this.userName = r.data.first_name;
      })
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'people') {
      setTimeout((() => this.Footer(document.getElementById('people'))), 200)
    }
  }
  People() {
    this.router.navigate(['people']);
  }
  display = false;
  icon = "menu"
  onPress() {

    this.display = !this.display;
    // if (this.icon=="menu"){
    //   this.icon="close"
    // }
    // else {
    // this.icon=="menu"
    // }

    // return this.icon 
  }

  Signup() {
    const navigationDetails2: string[] = ['signup'];
    this.router.navigate(navigationDetails2);
  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }
  Dashboard() {
    this.router.navigate(['dashboard-event'], { fragment: 'dash' });
  }
  Workshop() {
    this.router.navigate(['home'], { fragment: 'workshop' });
  }
  Talk() {
    this.router.navigate(['home'], { fragment: 'talk' });
  }
  Schedule() {
    this.router.navigate(['home'], { fragment: 'schedule' });
  }
  Rules() {
    // if (window.innerWidth > 992) {
      // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    // }
    // else {
      // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    // }
    this.router.navigate(['rules'],{fragment:'rules'});
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  getNavClass() {
    return window.scrollY > 0 ? 'no-shadow' : '';
  }
  Footer(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }

}
