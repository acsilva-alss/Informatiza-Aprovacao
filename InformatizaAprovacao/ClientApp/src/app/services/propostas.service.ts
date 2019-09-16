import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPropostas } from '../models/propostas.interface';
import { Router } from '@angular/router';

@Injectable()
export class PropostasService {

  constructor(private http: Http, private router: Router) { }

  ///Rotas
  pesquisarProposta(userId: number) {
    this.router.navigate(["pesquisar-proposta/" + userId]);
  }
  voltaHomeUsuario(userId: number) {
    this.router.navigate(["usuario/" + userId]);
  }

  voltaHomeProposta(userId: number) {
    this.router.navigate(["propostas/" + userId]);
  }
  ///Get
  getPropostas() {
    return this.http.get("api/Propostas").map(data => <IPropostas[]>data.json());
  }

  ///Post
  addProposta(proposta: IPropostas) {
    return this.http.post("api/Propostas", proposta);
  }
  ///Put
  editProposta(proposta: IPropostas) {
    return this.http.put("api/Propostas/" + proposta.id, proposta);
  }
  ///Delete
  deleteProposta(propostaId: number) {
    return this.http.delete("api/Propostas/" + propostaId);
  }
}
