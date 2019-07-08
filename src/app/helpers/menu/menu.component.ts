import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mobileQuery: MediaQueryList;
  mobileQueryIcon: MediaQueryList;
  opened = true;
  onlyIcons = false;
  @ViewChild(MatSidenav)
  sidenav: MatSidenav;
  
  fillerNav: Array<{id: string, text: string, icon: string}> = [
    {id: '', text: 'Estadisticas', icon: 'assessment'},
    {id: 'facturacion', text: 'Facturacion', icon: 'shopping_cart'},
    {id: 'productCrud', text: 'Productos', icon: 'shopping_basket'},
];
private _mobileQueryListener: () => void;

constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryIcon = media.matchMedia('(max-width: 1400px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

   }

  ngOnInit() {
    }

    logout(){
      sessionStorage.setItem('currentUser', '');
      this.router.navigate(['/login']);
    }

  onlinkClick(url) {

      this.router.navigate(['/' + url]);
    }

  onFacturationClick() {
      this.router.navigate(['facturacion']);
    }

  onProductClick() {
      this.router.navigate(['productCrud']);
    }

  ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    toggleLetter() {

      this.onlyIcons = !this.onlyIcons;

    }
    toggle() {
      this.sidenav.toggle();
    }

    validateSession() {
      return sessionStorage.getItem('currentUser') ? true : false;
    }
}
