import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { CanLoad, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap, take } from 'rxjs/operators';
import { LoginService } from "src/app/services/login.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanLoad {
    constructor(private loginService: LoginService, private router: Router) {

    }

    canLoad( route: Route, segments: UrlSegment[]){
            return this.loginService.isUserAuthenticated.pipe(
                take(1),
                tap(isAuthenticated => {
                    if(!isAuthenticated){
                        this.router.navigateByUrl('/');
                    }
                })
            );
        }
}