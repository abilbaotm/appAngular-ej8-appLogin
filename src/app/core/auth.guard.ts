import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import {canActivate} from '@angular/fire/auth-guard';
import {AuthService} from '../core/auth.service';
import Swal from "sweetalert2";
import {environment} from "../../environments/environment";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    public authService: AuthService,
  ) {}

  canActivate(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        if (parseInt(localStorage.getItem('horalogin'), 10) + (environment.tiempExpirar * 1000) < new Date().getTime()) {
          Swal.fire({
            title: 'Sesion expirada',
            icon: "info"
          });
          Swal.showValidationMessage("La sesion ha expirado");
          this.authService.doLogout();
          this.router.navigate(['/login']);
        }


        return resolve(true);
      }, err => {
        this.router.navigate(['/login']);
        return resolve(true);
      });
    });
  }

}
