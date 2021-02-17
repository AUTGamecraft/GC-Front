import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-confirm-confirm',
  templateUrl: './confirm-confirm.component.html',
  styleUrls: ['./confirm-confirm.component.scss']
})
export class ConfirmConfirmComponent implements OnInit {

  constructor(private router: Router, public publicservice: PublicService) {

   }

  ngOnInit(): void {
  }
  Dashboard() {
    this.publicservice.ActivateUser('981fbc441cc86f95cdbc858c9e71730e').then((r)=>{
      console.log(r);
      this.router.navigate(['login'], { fragment: 'login' });
    })
    
  }
}
