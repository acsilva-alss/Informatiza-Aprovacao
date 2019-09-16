import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IPropostas } from '../../models/propostas.interface';
import { PropostasService } from '../../services/propostas.service';
import { IFornecedor } from '../../models/fornecedor.interface';
import { FornecedorService } from '../../services/fornecedor.service';
import { ICategoria } from '../../models/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';
import { IPesquisaProposta } from '../../models/pesquisa_proposta.interface';

@Component({
  selector: 'app-pesquisar-proposta',
  templateUrl: './pesquisar-proposta.component.html',
})
export class PesquisarPropostaComponent implements OnInit {
  
  private formLabel: string; 
  private form: FormGroup;

  private userId: number;
 
  private propostas: IPropostas[] = [];
  private fornecedores: IFornecedor[] = [];
  private categorias: ICategoria[] = [];

  private dadosPesquisa: IPesquisaProposta = {
    nome_proposta: "",
    categoria: "",
    fornecedor: "",
    data_proposta: null,
    valor: 0,
    descricao: "",
    status: "",
  };
  private proposta: IPropostas;
  private fornecedor: IFornecedor;
  private categoria: ICategoria;

  constructor(private fb: FormBuilder, private propostaService: PropostasService, private route: ActivatedRoute, private fornecedorService: FornecedorService, private categoriaService: CategoriaService) {
    this.proposta = <IPropostas>(null);
    this.fornecedor = <IFornecedor>(null);
    this.categoria = <ICategoria>(null);

    this.form = fb.group({
      "nome_proposta": ["", Validators.required],
      "nome_fornecedor": ["", Validators.required],
      "intervalo_datas": ["", Validators.required],
      "status_proposta": ["", Validators.required],
      "categoria": ["", Validators.required],
    });

    this.formLabel = "Pesquisar Proposta";

    this.propostaService.getPropostas().subscribe(
      data => this.propostas = data,
      error => alert(error),
      () => console.log("")
    );

    this.fornecedorService.getFornecedores().subscribe(
      data => this.fornecedores = data,
      error => alert(error),
      () => console.log("")
    );

    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data,
      error => alert(error),
      () => console.log("")
    );
  }

  ngOnInit() {
    this.getIdUser();
  }

  private onSubmit() {

    this.proposta = this.propostas.find(e => e.nome == this.form.controls["nome_proposta"].value && e.nome != "");
    this.fornecedor = this.fornecedores.find(e => e.nome == this.form.controls["nome_fornecedor"].value);
    this.categoria = this.categorias.find(e => e.nome == this.form.controls["categoria"].value);

    this.dadosPesquisa.nome_proposta = this.proposta.nome;
    this.dadosPesquisa.categoria = this.categoria.nome;
    this.dadosPesquisa.fornecedor = this.fornecedor.nome;
    this.dadosPesquisa.data_proposta = this.proposta.data;
    this.dadosPesquisa.valor = this.proposta.valor;
    this.dadosPesquisa.descricao = this.proposta.descricao;
  }

  private voltaHomeProposta() {
    this.propostaService.voltaHomeProposta(this.userId);
  }

  private cancel() {
    this.dadosPesquisa = <IPesquisaProposta>(null);
    this.form.get("nome_proposta").setValue('');
    this.form.get("nome_fornecedor").setValue('');
    this.form.get("intervalo_datas").setValue('');
    this.form.get("status_proposta").setValue('');
    this.form.get("categoria").setValue('');
  }

  private getIdUser() {
    this.route.params.subscribe((object: any) => {
      this.userId = object.id;
    })
  }

}
