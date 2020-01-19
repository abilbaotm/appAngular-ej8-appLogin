import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../models/usuario.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  recuerdame = true;
  private usuario: UsuarioModel;
  errorMessage = '';


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {return; }
    console.log('form enviado');
    console.log(this.usuario);
    console.log(form);
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.authService.doRegister(form.value)
      .then(res => {
        if (this.recuerdame) {
          localStorage.setItem('email', this.usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        Swal.close();
        this.router.navigate(['/login']);

      }, err => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
        });
        Swal.showValidationMessage(err.message);
      });


  }
}
