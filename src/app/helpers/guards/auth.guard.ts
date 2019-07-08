import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private route: ActivatedRoute) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       console.log(this.router);
       this.route.paramMap.subscribe(params => {
            console.log(params);
           });
           console.log(sessionStorage.getItem('currentUser'));
       if (sessionStorage.getItem('currentUser')) {
            // logged in so return true
            console.log('daaaa');
            return true;
        }

        // not logged in so redirect to login page with the return url
       this.router.navigate(['/login']);
       return false;
    }
}