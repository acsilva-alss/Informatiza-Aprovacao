import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IPropostas } from '../../models/propostas.interface';
import { PropostasService } from '../../services/propostas.service';
@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
})
export class PropostasComponent implements OnInit {

  private userId: number;
 
  private propostas: IPropostas[] = [];

  private proposta: IPropostas;
  
 
  constructor(private propostaService: PropostasService, private route: ActivatedRoute) {
    this.proposta = <IPropostas>(null);
  }
  ngOnInit() {
    this.getPropostas();
    this.getIdUser();
  }

  private voltaHomeUsuario() {
    this.propostaService.voltaHomeUsuario(this.userId);
  }

  private pesquisarProposta() {
    this.propostaService.pesquisarProposta(this.userId);
  }

  private edit(prop: IPropostas) { }

  private delete(prop: IPropostas) {
    if (confirm("Deseja excluir esta proposta " + prop.nome + "?")) {
      this.propostaService.deleteProposta(prop.id).subscribe(
        response => {
          this.getPropostas();
        });
    }
  }

  private getPropostas() {
    this.propostaService.getPropostas().subscribe(
      data => this.propostas = data,
      error => alert(error),
      () => console.log("")
    );

  }

  private getIdUser() {
    this.route.params.subscribe((object: any) => {
      this.userId = object.id;
    })
  }

}
