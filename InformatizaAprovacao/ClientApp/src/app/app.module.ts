import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
///Componentes
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdicionarUsuarioComponent } from './components/adicionar-usuario/adicionar-usuario.component';
import { PropostasComponent } from './components/propostas/propostas.component';
import { PesquisarPropostaComponent } from './components/pesquisar-proposta/pesquisar-proposta.component';
///Services
import { AutenticacaoService } from './services/autenticacao.service';
import { UsuarioService } from './services/usuario.service';
import { AdicionarUsuarioService } from './services/adicionar-usuario.service';
import { CategoriaService } from './services/categoria.service';
import { FornecedorService } from './services/fornecedor.service';
import { HistoricoPropostaService } from './services/historico_propostas.service';
import { PropostasService } from './services/propostas.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UsuarioComponent,
    AdicionarUsuarioComponent,
    PropostasComponent,
    PesquisarPropostaComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: 'adicionar-usuario/:id', component: AdicionarUsuarioComponent },
      { path: 'propostas/:id', component: PropostasComponent },
      { path: 'pesquisar-proposta/:id', component: PesquisarPropostaComponent },
    ])
  ],
  providers: [
    AutenticacaoService,
    UsuarioService,
    AdicionarUsuarioService,
    CategoriaService,
    FornecedorService,
    HistoricoPropostaService,
    PropostasService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
