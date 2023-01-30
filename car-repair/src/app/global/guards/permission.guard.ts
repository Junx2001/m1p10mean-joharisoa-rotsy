import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { map } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
  })
export class PermissionGuard implements CanActivate{
    constructor (private router : Router,
        private userService : UserService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let routeChildren = state.url.split("/")[1];
        
        const bool = this.userService.getCurrentUser().pipe(
          map((response) => {
            if (response.user.role==='ROLE_USER_FINANCE'){
              if (routeChildren === 'atelier'){
                this.router.navigateByUrl('/forbidden');
                return false;
              }
            }else if (response.user.role==='ROLE_USER_ATELIER'){
              if (routeChildren === 'finance'){
                this.router.navigateByUrl('/forbidden');
                return false;
              }
            }else{
              if (routeChildren === 'finance' || routeChildren === 'atelier'){
                this.router.navigateByUrl('/forbidden');
                return false;
              }
            }  
            return true;
          })
        );
        return bool;
    }
}