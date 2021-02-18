import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-confirm-confirm',
  templateUrl: './confirm-confirm.component.html',
  styleUrls: ['./confirm-confirm.component.scss']
})
export class ConfirmConfirmComponent implements OnInit {
  hash: string = '';
  isError: boolean;
  userName:string = '';
  constructor(private router: Router, public publicservice: PublicService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hash = params['activation'];
    });
    this.publicservice.ActivateUser(this.hash).then((r)=>{
      this.userName = r.data.first_name;
    })
    this.isError = this.publicservice.hasError;
  }
  Dashboard() {
    this.router.navigate(['login'], { fragment: 'login' });
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
}
