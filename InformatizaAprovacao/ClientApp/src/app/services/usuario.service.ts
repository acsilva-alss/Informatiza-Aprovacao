import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IUsuario } from '../models/usuario.interface';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  constructor(private http: Http, private router: Router) { }

   ///Rotas
  rotaPropostas(id: number) {
    this.router.navigate(["propostas/" + id]);
  }

  rotaAdicionarUsuario(id:number) {
    this.router.navigate(["adicionar-usuario/"+id]);
  }
  ///Get
  getUsuarioPeloId(id: number) {
    return this.http.get("api/Usuarios/"+id).map(data => <IUsuario>data.json());
  }

  getUsuario() {
    return this.http.get("api/Usuarios").map(data => <IUsuario[]>data.json());
  }

  ///Post
  addUsuario(usuario: IUsuario) {
    return this.http.post("api/Usuarios", usuario);
  }
  ///Put
  editUsuario(usuario: IUsuario) {
    console.log(usuario.senha);
    return this.http.put("api/Usuarios/" + usuario.id, usuario);
  }
  ///Delete
  deleteUsuario(usuarioId: number) {
    return this.http.delete("api/Usuarios/" + usuarioId);
  }
}
