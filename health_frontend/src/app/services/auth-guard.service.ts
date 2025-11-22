import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // ✅ this makes it available application-wide
})
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.dataService.isLogIn.getValue();

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
