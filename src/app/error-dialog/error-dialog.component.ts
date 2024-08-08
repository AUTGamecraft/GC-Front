import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Inject } from '@angular/core';

import {MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA} from '@angular/material/legacy-snack-bar';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  
})
export class ErrorDialogComponent implements OnInit {
  isActive = 'deactive';
  type = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
      this.type= data;
   }

  ngOnInit(): void {
  }

}
