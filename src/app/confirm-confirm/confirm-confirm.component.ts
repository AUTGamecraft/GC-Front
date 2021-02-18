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
  isError:boolean;
  constructor(private router: Router, public publicservice: PublicService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hash = params['activation'];
    });
    this.publicservice.ActivateUser(this.hash).then((r) => {
      if(r.error!=null){
        this.isError = true;
      }
      else{
        this.isError = false;
      }
    })
    console.log(this.route.queryParams);
  }
  Dashboard() {
    this.router.navigate(['login'], { fragment: 'login' });
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
}
