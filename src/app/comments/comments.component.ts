import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PublicService} from "../public.service";

export interface DialogData {
  game_code: number;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: []

  constructor(
    public publicservice: PublicService,
    public dialog: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
    console.log("inside comment========")
    this.publicservice.getComments(this.data.game_code).subscribe(res => {
      let comments = res.body
      comments = comments.map(element => {
        element['user']['name'] = element['user']['first_name']
        return element
      })
      this.comments = comments
    })
  }
}
