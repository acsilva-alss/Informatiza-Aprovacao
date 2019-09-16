import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IHistoricoProposta } from '../models/historico_proposta.interface';
import { Router } from '@angular/router';

@Injectable()
export class HistoricoPropostaService {

  constructor(private http: Http, private router: Router) { }

  ///Get

  getHistoricoPropostas() {
    return this.http.get("api/HistoricoPropostas").map(data => <IHistoricoProposta[]>data.json());
  }

  ///Post
  addHistoricoProposta(historicoProposta: IHistoricoProposta) {
    return this.http.post("api/HistoricoPropostas", historicoProposta);
  }
  ///Put
  editHistoricoProposta(historicoProposta: IHistoricoProposta) {
    return this.http.put("api/HistoricoPropostas/" + historicoProposta.id, historicoProposta);
  }
  ///Delete
  deleteHistoricoProposta(historicoPropostaId: number) {
    return this.http.delete("api/HistoricoPropostas/" + historicoPropostaId);
  }
}
