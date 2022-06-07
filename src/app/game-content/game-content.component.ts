import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CommentsComponent} from "../comments/comments.component";
import {PublicService} from '../public.service';

export interface DialogData {
  title: string;
  poster: string;
  description: string;
  link: string;
  team: string;
  creators: [];
  is_verified: boolean;
  timestamp: string;
  game_code: number;
  average_score: number;
}

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss']
})
export class GameContentComponent implements OnInit {
  comments: any
  showComments: boolean = false

  constructor(
    public publicservice: PublicService,
    public matDialog: MatDialog,
    public dialog: MatDialogRef<GameContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
    this.comments = this.publicservice.getComments(this.data.game_code).subscribe(res=>{
        let comments = this.publicservice.extractData(res, this)
        comments = comments.map(element => {
          element['user']['name'] = element['user']['first_name']
    
          return element
        })
        this.comments=comments
      })
  }

  openGameDialog() {
    const dialog = this.matDialog.open(CommentsComponent, {
      data: {
        game_code: 2
      },
    });

    dialog.afterClosed().subscribe(result => {
    });
  }

  openComments() {
    this.showComments = true
  }

  closeComments() {
    this.showComments = false
  }
}
