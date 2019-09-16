import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IFornecedor } from '../models/fornecedor.interface';
import { Router } from '@angular/router';

@Injectable()
export class FornecedorService {

  constructor(private http: Http, private router: Router) { }

  ///Get

  getFornecedores() {
    return this.http.get("api/Fornecedor").map(data => <IFornecedor[]>data.json());
  }

  ///Post
  addFornecedor(fornecedor: IFornecedor) {
    return this.http.post("api/Fornecedor", fornecedor);
  }
  ///Put
  editFornecedor(fornecedor: IFornecedor) {
    return this.http.put("api/Fornecedor/" + fornecedor.id, fornecedor);
  }
  ///Delete
  deleteFornecedor(fornecedorId: number) {
    return this.http.delete("api/Fornecedor/" + fornecedorId);
  }
}
