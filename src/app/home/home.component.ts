import { Expansion } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  workshopsArray: any = {};
  workshopsActive: any = {};
  iconW: any = {};
  workshopsDate: any = {};
  talksArray: any = {};
  talksActive: any = {};
  iconT: any = {};
  talksDate: any = {};
  m: string = '';
  time = 10000;
  
  constructor(public publicservice: PublicService, public router: Router) {
    publicservice.getTalks().then((r) => {
      this.talksArray = r.data;
      for (let index = 0; index < this.talksArray.length; index++) {
        this.talksActive[index] = 'deactive'
        this.iconT[index] = 'keyboard_arrow_down'
        this.m = moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        this.talksDate[index] = moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YY');
      }
    })
    publicservice.getWorkshops().then((r) => {
      this.workshopsArray = r.data;
      console.log(r)
      for (let index = 0; index < this.workshopsArray.length; index++) {
        this.workshopsActive[index] = 'deactive'
        this.iconW[index] = 'keyboard_arrow_down'
        this.m = moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        this.workshopsDate[index] = moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YY');
      }
    })
    setInterval(()=>this.time = this.time-1,1000);
  }

  ngOnInit(): void {
    this.timer();
  }
  Signup() {
    const navigationDetails2: string[] = ['signup'];
    this.router.navigate(navigationDetails2);
  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
  }
  Dashboard() {
    this.router.navigate(['dashboard-event']);
  }
  Workshop(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  Talk(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  timer(){
    if(this.time <= 0){
      return "00 : 00 : 0";
    }
    return  this.time%60+" : "+parseInt((this.time/60)%60+"")+" : "+parseInt(this.time/3600+"");
  }
}
