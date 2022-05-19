import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Headers, RequestOptions} from "@angular/http";
import {PublicService} from "../public.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: any;

  constructor(public publicservice: PublicService) {
  }

  ngOnInit(): void {
    this.games = this.publicservice.getGames()
    console.log(this.games)
  }

}
