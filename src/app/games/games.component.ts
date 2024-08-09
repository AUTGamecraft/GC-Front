import {Component, OnInit} from '@angular/core';
import {PublicService} from '../public.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  // games: any
  constructor(
    public publicService: PublicService,
    public router: Router,
    public snackbar: MatSnackBar
  ) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(); }
    //     }
    //   }
    // });
    if (publicService.logedIn) {
      publicService.getUser().then((r) => {
        this.userName = r.data.first_name;
      });
    }
  }

  userName = '';
  peoples: any = [];

  display = false;
  icon = 'menu';

  ngOnInit(): void {
    this.publicService.getGames().subscribe(res => {
      console.log('resssssssssssss');
      let games = res.body;
      console.log(games[0]);
      games = games.map(element => {
        element.link = element.game_link;
        element.game_code = element.game_id;
        // for now!
        element.average_score = 4;

        // TODO for now
        // console.log("team", element['team'].description)

        element.team.members = element.team.members.map(el => {
          el.name = el.first_name;
          // TODO what should we do with this field
          el.title = 'عضو تیم';

          el.about = '';

          return el;
        });

        return element;

      });
      console.log('======');
      console.log(games);

      console.log('======');
      // this.games = mock
      this.publicService.games = games;
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'people') {
      setTimeout((() => this.Footer(document.getElementById('people'))), 200);
    }
  }

  People() {
    this.router.navigate(['people']);
  }

  onPress() {

    this.display = !this.display;
    // if (this.icon=="menu"){
    //   this.icon="close"
    // }
    // else {
    // this.icon=="menu"
    // }

    // return this.icon
  }

  Signup() {
    const navigationDetails2: string[] = ['signup'];
    this.router.navigate(navigationDetails2);
  }

  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }

  Dashboard() {
    this.router.navigate(['dashboard-event'], {fragment: 'dash'});
  }

  Workshop() {
    this.router.navigate(['home'], {fragment: 'workshop'});
  }

  Talk() {
    this.router.navigate(['home'], {fragment: 'talk'});
  }

  Schedule() {
    this.router.navigate(['home'], {fragment: 'schedule'});
  }

  Rules() {
    this.router.navigate(['rules'], {fragment: 'rules'});
  }

  Home() {
    this.router.navigate(['home'], {fragment: 'home'});
  }

  getNavClass() {
    return window.scrollY > 0 ? 'no-shadow' : '';
  }

  Footer(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  Games() {
    this.router.navigate(['games']);
  }

  sortGames() {
    return this.publicService.games.sort((game1, game2) => game2.likes.length - game1.likes.length);
  }
}
