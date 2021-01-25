import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
events(): void{
  const navigationDetails: string[] = ['dashboard-event'];
  this.router.navigate(navigationDetails);
}
}
