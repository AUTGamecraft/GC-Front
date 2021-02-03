import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  type : String = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.type;
   }

  ngOnInit(): void {
  }

}
