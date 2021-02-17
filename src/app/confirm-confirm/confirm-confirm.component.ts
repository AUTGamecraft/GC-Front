import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-confirm-confirm',
  templateUrl: './confirm-confirm.component.html',
  styleUrls: ['./confirm-confirm.component.scss']
})
export class ConfirmConfirmComponent implements OnInit {
  hash:string = '';
  constructor(private router: Router, public publicservice: PublicService,private route : ActivatedRoute) {

   }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.hash= params['activation'];
      });
      console.log(this.route.queryParamMap);
  }
  Dashboard() {
    this.publicservice.ActivateUser(this.hash).then((r)=>{
      console.log(r);
      this.router.navigate(['login'], { fragment: 'login' });
    })
    
  }
}
