import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import {MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA} from '@angular/material/legacy-snack-bar';
@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {
  type = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { 
    this.type= data;
  }

  ngOnInit(): void {
  }

}
