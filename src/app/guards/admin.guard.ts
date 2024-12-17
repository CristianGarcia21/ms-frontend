import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private securityService : SecurityService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      console.log(session);
      if (session && session.role && session.role === 'Administrador') {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
  }

}
