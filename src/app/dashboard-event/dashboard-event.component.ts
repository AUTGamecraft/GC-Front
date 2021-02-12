import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-dashboard-event',
  templateUrl: './dashboard-event.component.html',
  styleUrls: ['./dashboard-event.component.scss']
})
export class DashboardEventComponent implements OnInit {
  talks = 'deactive'
  workshops = 'deactive'
  iconW = 'keyboard_arrow_down'
  iconT = 'keyboard_arrow_down'
  constructor(private router:Router,public publicservice:PublicService) { 
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
}
