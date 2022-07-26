import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CommentsComponent} from "../comments/comments.component";
import {PublicService} from '../public.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

export interface DialogData {
  title: string;
  poster: string;
  description: string;
  link: string;
  team: string;
  creators: [];
  likes: any[]
  is_verified: boolean;
  timestamp: string;
  game_code: number;
  average_score: number;
  dialogInstance: any;
}

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss']
})
export class GameContentComponent implements OnInit {
  comments: any
  showComments: boolean = false

  commentToSubmit: {
    text: string,
  } = {
    text: "",
  }

  isLiked: boolean = false

  constructor(
    public publicservice: PublicService,
    public matDialog: MatDialog,
    public dialog: MatDialogRef<GameContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    if(this.publicservice.logedIn){
      this.publicservice.getUser().then((r) => {
        const userEmail = r.data.email
        const gameIsLikeByUser = this.data.likes.some(like => like['user']['email'] === userEmail)        
        this.isLiked = gameIsLikeByUser
    });
    }
  }

  ngOnInit(): void {
    // this.publicservice.currentGame.averageScore = 0;
    this.comments = []
    this.publicservice.getComments(this.data.game_code).subscribe(res=>{
        let comments = this.publicservice.extractData(res, this)
        comments = comments.map(element => {
          element['user']['name'] = element['user']['first_name']
    
          return element
        })
        console.log("==================> here")
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

  submitComment() {
    // TODO API call to backend
    console.log("current game is", this.data)
    console.log("typed comment is", this.commentToSubmit.text)

    const body = {
      text: this.commentToSubmit.text,
      game: this.data.game_code,
    }

    this.publicservice.submitComment(body).subscribe(res =>{
      console.log("comment was submitted", res)
      this.commentToSubmit = {
        text: "",
      }
      this.showComments = false;

      this.data.dialogInstance.closeAll()
      this.publicservice.snackbar
      this.publicservice.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'نظر شما با موفقیت ثبت شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

      // TODO show success dialog to the user
    }, error => {
      console.log("====================")
      console.log(error)
      
      console.log("====================###")
      console.log(error["_body"]["error"])
      if(error["_body"] && error["_body"].includes("The fields user, game must make a unique set")){
        console.log("shitttttttttttttt==========>")
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'شما قبلا نظر داده‌اید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }else{
        this.publicservice.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'مشکلی پیش آمده: لطفا مجددا تلاش نمایید!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    })


  }
  handleFav() {
    const body = {
      game: this.data.game_code,
    }
    this.publicservice.submitLike(body).subscribe(res=>{
      let likeObj = this.publicservice.extractData(res, this)
      // we got an error. Therefore likeObj does not exist
      if (!likeObj) {
        return
      }
      console.log("after like a game. is_deleted=", likeObj['is_deleted'])
      if(likeObj['is_deleted'] === false){
        this.isLiked = true
        // add to likes list
        const currGame = this.publicservice.games.find(game => game.game_code === this.data.game_code)
        const currGameIndex = this.publicservice.games.findIndex(game => game.game_code === this.data.game_code)

        currGame.likes.push(likeObj)
        this.publicservice.games[currGameIndex] = currGame
        this.data.likes = currGame.likes
        console.log("here at push")
        
      }else{
        this.isLiked = false
        // remove from likes list
        const currGame = this.publicservice.games.find(game => game.game_code === this.data.game_code)
        const currGameIndex = this.publicservice.games.findIndex(game => game.game_code === this.data.game_code)

        currGame.likes = currGame.likes.filter(like => like['user']['email'] !== likeObj['user']['email'])
        this.publicservice.games[currGameIndex] = currGame

        this.data.likes = currGame.likes
        console.log("here at remove")
      }
    }, err => {
      console.log("=========error======")
      console.log(err)
    })
  }
}


