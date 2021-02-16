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
    publicservice.ActivateUser('fuck').then((r)=>{
      console.log(r);
    })
   }

  ngOnInit(): void {
  }
  Dashboard() {
    this.router.navigate(['login'], { fragment: 'login' });
  }
}
