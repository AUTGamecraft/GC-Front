import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  isActive = 'deactive';
  type = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public publicservice: PublicService) {
      this.isActive = publicservice.Texts.Texts["error2"];
   }

  ngOnInit(): void {
  }

}
