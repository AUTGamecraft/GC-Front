import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userName: string = "";
  constructor(private router: Router, public publicservice: PublicService,public snackbar:MatSnackBar) { 
    if (!publicservice.logedIn) {
      this.router.navigate(['login']);
    }
    else{
      publicservice.getUser().then((r)=>{
        this.userName = r.data.first_name;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
      });
    }
  }

  ngOnInit(): void {
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  People() {
    this.router.navigate(['people'], { fragment: 'people' });
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
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  events(): void {
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }
  media(): void {
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }
  Teams() {
    this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    // this.router.navigate(['dashboard-teams']);
  }
  Cart() {
    this.router.navigate(['cart']);
  }
  Delete(){
    return 'delete';
  }
}
