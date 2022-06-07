import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Headers, RequestOptions} from "@angular/http";
import {PublicService} from "../public.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  userName: string = '';
  peoples: any = []
  games: any
  constructor(public publicservice: PublicService, public router: Router, public snackbar: MatSnackBar) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(); }
    //     }
    //   }
    // });
    if (publicservice.logedIn) {
      publicservice.getUser().then((r) => {
        this.userName = r.data.first_name;
      })
    }
  }

  ngOnInit(): void {
    this.publicservice.getGames().subscribe(res=>{
      console.log("resssssssssssss")
      let games = this.publicservice.extractData(res, this)
      console.log(games[0])
      games = games.map(element => {
        element['link'] = element['game_link']
        element['game_code'] = element['game_id']
        // for now!
        element['average_score'] = 4
        // for now
        element['team'] = "shit"

        // Also for now!
        element['creators'] = element['other_creators']
        element['creators'].push(element['creator'])
        delete element['other_creators']
        delete element['creator']

        console.log( element['creators'])

        element['creators'] = element['creators'].map(el => {
          el['name'] = el['first_name']
          // TODO what should we do with this field
          el['title'] = "nothing"

          return el
        });

        element['comments'] = element['comments'].map(element => {
          element['user']['name'] = element['user']['first_name']
          delete element['user']['first_name']
    
          return element
        })

        return element
        
      });
      console.log("======")
      console.log(games)
      console.log("======")
      this.games = games
    })
  }
  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'people') {
      setTimeout((() => this.Footer(document.getElementById('people'))), 200)
    }
  }
  People() {
    this.router.navigate(['people']);
  }
  display = false;
  icon = "menu"
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
    this.router.navigate(['dashboard-event'], { fragment: 'dash' });
  }
  Workshop() {
    this.router.navigate(['home'], { fragment: 'workshop' });
  }
  Talk() {
    this.router.navigate(['home'], { fragment: 'talk' });
  }
  Schedule() {
    this.router.navigate(['home'], { fragment: 'schedule' });
  }
  Rules() {
    // if (window.innerWidth > 992) {
    // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    // }
    // else {
    // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    // }
    this.router.navigate(['rules'],{fragment:'rules'});
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  getNavClass() {
    return window.scrollY > 0 ? 'no-shadow' : '';
  }
  Footer(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
