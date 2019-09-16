import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IUsuario } from '../models/usuario.interface';
import { Router } from '@angular/router';

@Injectable()
export class AdicionarUsuarioService {
  constructor(private router: Router) { }

  voltaHomeUsuario(id: number) {
    this.router.navigate(["usuario/" + id]);
  }

}
