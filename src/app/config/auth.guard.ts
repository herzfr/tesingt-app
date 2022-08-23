import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../login/interface/user.interface';
import { LoginService } from '../login/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private eService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let data: UserData = this.eService.decryptDataUser();
    // console.log(this.getResolvedUrl(route));

    if (this.getResolvedUrl(route) === '/login') {
      if (data) {
        this.router.navigate(['/herzfr']);
        return false;
      } else {
        return true;
      }
    } else {
      if (data) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }
}
