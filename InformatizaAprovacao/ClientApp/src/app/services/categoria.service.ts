import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ICategoria } from '../models/categoria.interface';
import { Router } from '@angular/router';

@Injectable()
export class CategoriaService {

  constructor(private http: Http, private router: Router) { }

  ///Get

  getCategorias() {
    return this.http.get("api/Categorias").map(data => <ICategoria[]>data.json());
  }

  ///Post
  addCategoria(categoria: ICategoria) {
    return this.http.post("api/Categorias", categoria);
  }
  ///Put
  editCategoria(categoria: ICategoria) {
    return this.http.put("api/Categorias/" + categoria.id, categoria);
  }
  ///Delete
  deleteCategoria(categoriaId: number) {
    return this.http.delete("api/Categorias/" + categoriaId);
  }
}
