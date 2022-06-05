import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CommentsComponent} from "../comments/comments.component";

export interface DialogData {
  title: string;
  poster: string;
  description: string;
  link: string;
  team: string;
  creators: [];
  is_verified: boolean;
  timestamp: string;
}

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss']
})
export class GameContentComponent implements OnInit {
  constructor(
    public matDialog: MatDialog,
    public dialog: MatDialogRef<GameContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
  }

  openGameDialog() {
    const dialog = this.matDialog.open(CommentsComponent, {
      data: {
        gameCode: 2
      },
    });

    dialog.afterClosed().subscribe(result => {
    });
  }
}
