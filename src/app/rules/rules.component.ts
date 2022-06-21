import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  userName: string = '';
  constructor(public publicservice: PublicService, public router: Router,private snackbar:MatSnackBar) { 
    if (publicservice.logedIn) {
      publicservice.getUser().then((r) => {
        this.userName = r.data.first_name;
      })
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    if (this.router.url.split('#')[1] == 'rules') {
      setTimeout((() => this.Footer(document.getElementById('rules'))), 200)
    }
  }
  People(){
    this.router.navigate(['people'],{fragment:'people'});
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
    this.router.navigate(['dashboard-event'],{fragment:'dash'});
  }
  Workshop() {
    this.router.navigate(['home'],{fragment:'workshop'});
  }
  Talk() {
    this.router.navigate(['home'],{fragment:'talk'});
  }
  Schedule() {
    this.router.navigate(['home'],{fragment:'schedule'});
  }
  Rules(){
    this.router.navigate(['rules'],{fragment:'rules'});
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  getNavClass(){
    return window.scrollY>0?'no-shadow':'';
  }
  Footer(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
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

  Games(){
    this.router.navigate(['games']);
  }
}
