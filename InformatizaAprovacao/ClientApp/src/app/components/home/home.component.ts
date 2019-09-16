import { Component, OnInit, Inject } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { IUsuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  private usuarios: IUsuario[] = [];
  private usuario: IUsuario;

  constructor(private usuarioService: UsuarioService, private autenticacaoService: AutenticacaoService) {
    this.usuario = {
      id:0,
      nome:"",
      cpf: "",
      //data_nascimento: null,
      perfil:"",
      login:"",
      senha:"",
    };
  }

  ngOnInit() {
    this.fazerLogin();
  }

  private fazerLogin() {
    this.usuarioService.getUsuario().subscribe(
      data => this.usuarios = data,
      error => alert(error),
      () => console.log(this.usuarios)
    );

    this.autenticacaoService.fazerLogin(this.usuario, this.usuarios);
  }
}
