import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
@Component({
  selector: 'app-confirm-confirm',
  templateUrl: './confirm-confirm.component.html',
  styleUrls: ['./confirm-confirm.component.scss']
})
export class ConfirmConfirmComponent implements OnInit {
  hash: string = '';
  isError: boolean;
  userName:string = '';
  constructor(private router: Router, public publicservice: PublicService, private route: ActivatedRoute,public snackbar:MatSnackBar) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hash = params['activation'];
    });
    this.publicservice.ActivateUser(this.hash).then((r)=>{
      // if(window.innerWidth>992){
      this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 3000, data: 'اکانت شما با موفقیت فعال شد', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
      // else{
        // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 3000, data: 'اکانت شما با موفقیت فعال شد', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
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
