import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import * as moment from 'jalali-moment';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userName: string = "";
  cartArray: any = [];
  cartDelete: any = [];
  totalCost = 0;
  count = 0;
  isDisabled = false;
  percentage = 0;
  discounted = false;
  constructor(private router: Router, public publicservice: PublicService, public snackbar: MatSnackBar) {
    if (!publicservice.logedIn) {
      this.router.navigate(['login']);
    }
    else {
      publicservice.getUser().then((r) => {
        if (r.data.is_staff) {
          router.navigate(['**']);
        }
        this.userName = r.data.first_name;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
      });
      publicservice.getUserCart().then((r) => {
        console.log(r);
        this.cartArray = r.data;
        this.count = this.cartArray.length;
        for (let i = 0; i < this.cartArray.length; i++) {
          this.cartDelete.push('noDelete');
          this.cartArray[i].workshop.start = moment(this.cartArray[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(this.cartArray[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(this.cartArray[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(this.cartArray[i].workshop.start.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY');
          this.totalCost = this.totalCost + this.cartArray[i].workshop.cost;

        }
      });
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.router.url.split('#')[1] == 'cart') {
      setTimeout((() => this.Schedule(document.getElementById('cart'))), 200)
    }
  }
  Schedule(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  Discount() {
    if (this.discounted) {
      return;
    }
    if (this.totalCost == 0) {
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'سبد خرید شما خالی است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
      // else {
      // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'سبد خرید شما خالی است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      return;
    }
    if (this.publicservice.discount_code == "") {
      return
    }
    this.publicservice.checkDiscount().then((r) => {
      if (this.discounted) {
        return;
      }
      this.percentage = r.data.percentage;
      console.log(this.percentage);
      console.log(this.totalCost * (100 - this.percentage) / 100);
      this.totalCost = this.totalCost * (100 - this.percentage) / 100;
      this.discounted = true;
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'کد تخفیف اعمال شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }/
      // else {
      // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'کد تخفیف اعمال شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }



    })

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
    // if (window.innerWidth > 992) {
    this.router.navigate(['dashboard-teams'], { fragment: 'dash' });
    // }
    // else {
    // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    // }
    // this.router.navigate(['dashboard-teams']);
  }
  gameStatus() {
    this.router.navigate(['dashboard-create-game'])
  }
  Cart() {
    this.router.navigate(['cart']);
  }
  Delete(i) {
    this.publicservice.workshopPk = this.cartArray[i].pk
    this.publicservice.deleteCartItem().then((r) => {
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'کارگاه با موفقیت از سبد خریدتان حذف شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
      // else {
      // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'کارگاه با موفقیت از سبد خریدتان حذف شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      this.cartDelete[i] = 'delete';

      this.totalCost = this.totalCost - (this.cartArray[i].workshop.cost) * (100 - this.percentage) / 100;

      //this.totalCost = this.totalCost *((100-this.percentage)/100);

      this.count = this.count - 1;
    })
  }
  Pay() {
    // console.log(this.totalCost);
    if (this.totalCost == 0) {
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'سبد خرید شما خالی است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
      // else {
      // this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'سبد خرید شما خالی است!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      return;
    }
    for (let item of this.cartArray) {
      if (item?.workshop?.is_registration_active === false) {
        this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: `مورد "${item?.workshop?.title}" غیرفعال است!
آن را حذف کنید و دوباره امتحان کنید.`, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
        return
      }
    }
    let element = <HTMLInputElement>document.getElementById('payButton');
    element.disabled = true;
    this.publicservice.getPaymentLink().then((r) => {
      // if (window.innerWidth > 992) {
      this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'در حال انتقال به صفحه ی پرداخت ...', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      // }
      // else {
      // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'در حال انتقال به صفحه ی پرداخت ...', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
      // }
      location.href = r.data.link;
    })
  }

  Competition() {
    this.router.navigate(['dashboard-competition'], {fragment: 'dash'});
  }

  CreateGame() {

  }
}
