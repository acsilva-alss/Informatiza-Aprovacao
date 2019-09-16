import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IUsuario } from '../models/usuario.interface';
import { Router } from '@angular/router';

@Injectable()
export class AutenticacaoService {
  constructor(private router: Router) { }

  public fazerLogin(usuario: IUsuario, usuarios: IUsuario[])
  {
    var usuarioAtual = usuarios.find(e => e.login == usuario.login);
    console.log(usuarioAtual);
    if (usuarioAtual == null) {
      console.log("Loggin failed");
    }
    else {
      if (usuarioAtual.senha == usuario.senha) {
        console.log("Loggin Succesfull");

        this.router.navigate(['usuario/' + usuarioAtual.id]);
      }
      else {
        console.log("Senha failed");
      }
    }
  }


}
