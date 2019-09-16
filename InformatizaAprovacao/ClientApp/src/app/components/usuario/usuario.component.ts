import { Component, OnInit, Inject } from '@angular/core';
import { IUsuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  private userId: number;
  private usuarios: IUsuario[] = [];
  private usuario: IUsuario;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.usuario = {
      id: 0,
      nome: "",
      cpf: "",
      perfil: "",
      login: "",
      senha: "",
    };
  }

  ngOnInit() {
    this.getIdUsuario();
  }

  private getIdUsuario() {
   
    this.route.params.subscribe((object: any) => {
      this.userId = object.id;
    })
    
    this.usuarioService.getUsuarioPeloId(this.userId).subscribe(
      data => this.usuario = data,
      error => alert(error),
      () => console.log(this.usuario)
    );
  }

  private rotaAdicionarUsuario() {
    this.usuarioService.rotaAdicionarUsuario(this.usuario.id);
  }

  private rotaPropostas() {
    this.usuarioService.rotaPropostas(this.usuario.id);
  }

  private getIdUser() {
    this.route.params.subscribe((object: any) => {
      this.userId = object.id;
    })
  }
}
