import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PublicService} from "../public.service";

export interface DialogData {
  gameCode: number;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any

  constructor(
    public publicservice: PublicService,
    public dialog: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.comments = this.publicservice.getComments(this.data.gameCode)
  }

}
