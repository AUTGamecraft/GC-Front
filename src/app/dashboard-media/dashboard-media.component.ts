import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-dashboard-media',
  templateUrl: './dashboard-media.component.html',
  styleUrls: ['./dashboard-media.component.scss']
})
export class DashboardMediaComponent implements OnInit {

  constructor(private router : Router,public publicservice: PublicService) { 
    if(!publicservice.logedIn){
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }
  events(): void{
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }
  media(): void{
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  Teams(){
    this.router.navigate(['dashboard-teams']);
  }
}
