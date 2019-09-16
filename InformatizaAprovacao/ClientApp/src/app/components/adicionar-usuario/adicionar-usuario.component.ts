import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdicionarUsuarioService } from '../../services/adicionar-usuario.service';
import { IUsuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
})
export class AdicionarUsuarioComponent implements OnInit {

  private userId: number;
  private formLabel: string;
  private isEditMode: boolean = false;
  private form: FormGroup;

  private usuarios: IUsuario[] = [];
  private usuario: IUsuario = {
    id: 0,
    nome: " ",
    cpf: " ",
   // data_nascimento: null,
    perfil: " ",
    login: " ",
    senha: "",
    };
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private fb: FormBuilder, private adicionarUsuarioService: AdicionarUsuarioService) {
   
    this.form = fb.group({
      "nome": ["", Validators.required],
      "cpf": ["", Validators.required],
      "data_de_nascimento": ["", Validators.required],
      "perfil_de_usuario": ["", Validators.required],
      "login": ["", Validators.required],
      "senha": ["", Validators.required]
    });

    this.formLabel = "Adicionar Usuário";
  }

  ngOnInit() {
    this.getUsuario();
    console.log(this.usuarios);
  }

  private voltaHomeUsuario() {
    this.route.params.subscribe((object: any) => {
      this.userId = object.id;
    })
    this.adicionarUsuarioService.voltaHomeUsuario(this.userId);
  }

  private onSubmit() {
    //this.usuario.senha = "";
    this.usuario.nome = this.form.controls["nome"].value;
    this.usuario.cpf = this.form.controls["cpf"].value;
    this.usuario.perfil = this.form.controls["perfil_de_usuario"].value;
   // this.usuario.data_nascimento = this.form.controls["data_de_nascimento"].value;
    this.usuario.login = this.form.controls["login"].value;
    this.usuario.senha = this.form.controls["senha"].value;

    console.log(this.usuario);
    if (this.isEditMode == true) {
      this.usuarioService.editUsuario(this.usuario).subscribe(
        response => {
          this.getUsuario();
          this.form.reset();
          this.formLabel = "Adicionar Usuário";
          this.isEditMode = false;
        });
    }
    else {
      console.log(this.usuario);
      this.usuarioService.addUsuario(this.usuario).subscribe(
        response => {
          this.getUsuario();
          this.form.reset();
        });
    }
  }

  private getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      data => this.usuarios = data,
      error => alert(error),
      () => console.log(this.usuarios)
    );
  }

  private edit(usuario: IUsuario) {
    this.formLabel = "Editar Usuário";
    this.isEditMode = true;
    this.usuario = usuario;
    this.form.get("nome").setValue(usuario.nome);
    this.form.get("cpf").setValue(usuario.cpf);
    this.form.get("perfil_de_usuario").setValue(usuario.perfil);
    this.form.get("login").setValue(usuario.login);
    this.form.get("senha").setValue(usuario.senha);      
  }

  private delete(usuario: IUsuario) {
    if (confirm("Deseja excluir o cliente " + usuario.nome + "?")) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe(
        response => {
          this.getUsuario();
          this.form.reset();
        });
    }
  }
  private cancel() {
    this.formLabel = "Adicionar Usuário";
    this.isEditMode = false;
    this.usuario = <IUsuario>(null);
    this.form.get("nome").setValue('');
    this.form.get("cpf").setValue('');
    this.form.get("perfil_de_usuario").setValue('');
    this.form.get("data_de_nascimento").setValue('');
    this.form.get("login").setValue('');
    this.form.get("senha").setValue('');
  }
}
