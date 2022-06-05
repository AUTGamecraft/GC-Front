import {Component, Input, OnInit} from '@angular/core';

export interface Comment {
  text: string;
  score: number;
  game: number;
  user: any;
  timestamp: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  goldenStars: [] = [];
  grayStars: [] = [];
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor() { }

  ngOnInit(): void {
    for(let i=1;i<=this.comment.score;i++){
      // @ts-ignore
      this.goldenStars.push(i)
    }
    for(let i=1;i<=5-this.comment.score;i++){
      // @ts-ignore
      this.grayStars.push(i)
    }
  }

}
