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
  talks = 'deactive'
  workshops = 'deactive'
  iconW = 'keyboard_arrow_down'
  iconT = 'keyboard_arrow_down'
  talksArray : any = {};
  talksActive : any = {};
  constructor(public publicservice:PublicService,public router:Router) { 
    publicservice.getTalks().then((r) =>{
      console.log(r);
      this.talksArray = r.data;
    })
    for (let index = 0; index < this.talksArray.lengt;index++) {
      this.talksActive[index] = 'deactive';
    }
      

  }

  ngOnInit(): void {
    
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
  Dashboard(){
    this.router.navigate(['dashboard-event']);  
  }
  Workshop(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"});
  }
  Talk(el: HTMLElement){
    el.scrollIntoView({behavior: "smooth"});
  }
}
