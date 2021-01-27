import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
@Component({
  selector: 'app-dashboard-media',
  templateUrl: './dashboard-media.component.html',
  styleUrls: ['./dashboard-media.component.scss']
})
export class DashboardMediaComponent implements OnInit {

  constructor(private router : Router) { }

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
}
