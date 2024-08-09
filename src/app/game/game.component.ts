import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GameContentComponent} from '../game-content/game-content.component';
import {PublicService} from '../public.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: any;

  constructor(
    public dialog: MatDialog,
    public publicService: PublicService
  ) {

  }

  ngOnInit(): void {

  }

  openGameDialog() {
    const dialogInstance = this.dialog;
    const dialog = this.dialog.open(GameContentComponent, {
      data: {
        title: this.game.title,
        poster: this.game.poster,
        description: this.game.description,
        link: this.game.link,
        team: this.game.team,
        creators: this.game.creators,
        likes: this.game.likes,
        is_verified: this.game.is_verified,
        timestamp: this.game.timestamp,
        game_code: this.game.game_code,
        average_score: this.game.average_score,
        dialogInstance,
      },
    });

    dialog.afterClosed().subscribe(result => {
    });
  }

  public Games() {
    this.publicService.router.navigate(['home']);

  }
}
