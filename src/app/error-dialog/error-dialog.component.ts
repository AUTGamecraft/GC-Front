import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PublicService } from '../public.service';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  
})
export class ErrorDialogComponent implements OnInit {
  isActive = 'deactive';
  type = '';
  constructor(public publicservice: PublicService,@Inject(MAT_SNACK_BAR_DATA) public data: string) {
      this.type= data;
   }

  ngOnInit(): void {
  }

}
