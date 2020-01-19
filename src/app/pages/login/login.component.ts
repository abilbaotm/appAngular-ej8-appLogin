import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsuarioModel} from '../../models/usuario.model';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = true;
  private usuario: UsuarioModel;
  private errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }

  }



  login(form: NgForm) {
    if (form.invalid) {return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.authService.doLogin(form.value)
      .then(res => {
        if (this.recuerdame) {
          localStorage.setItem('email', this.usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        Swal.close();
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          icon: 'error',
        });
        Swal.showValidationMessage(err.message);


      });
  }

}
