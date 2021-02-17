import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-dashboard-media',
  templateUrl: './dashboard-media.component.html',
  styleUrls: ['./dashboard-media.component.scss']
})
export class DashboardMediaComponent implements OnInit {
  userName: string = "";
  constructor(private router : Router,public publicservice: PublicService) { 
    if(!publicservice.logedIn){
      this.router.navigate(['login']);
    }
    else{
      publicservice.getUser().then((r)=>{
        this.userName = r.data.first_name;
      });
    }
  }
  ngAfterViewInit():void{
    if(this.router.url.split('#')[1] == 'dash'){
      setTimeout((()=>this.Schedule(document.getElementById('dash'))),200)
    }
  }
  ngOnInit(): void {
  }
  People() {
    this.router.navigate(['people'], { fragment: 'people' });
  }
  Schedule(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  events(): void{
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }
  media(): void{
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  Teams(){
    this.router.navigate(['dashboard-teams']);
  }
  Upload() {
    document.getElementById('imgUpload').click();
  }
  handleFileInput(imageInput: any) {
    const file = imageInput.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    // console.log(file); 
    this.publicservice.fileName = file.name;
    this.publicservice.UpdateImage();
  }  
  Cart() {
    this.router.navigate(['cart']);
  }
}
