import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';
import { SuiModalService } from 'ng2-semantic-ui/dist/public';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppService } from '../../app.service';
import { GESAC_API } from '../../app.api';
import { ContatoService } from '../../contato/contato.service';
import { PontoPresenca } from '../ponto-presenca.model';
import { PontoPresencaService } from '../ponto-presenca.service';
import { JustifmModal } from '../ponto-presenca-detalhe/justificativa-modal.component';

@Component({
  selector: 'app-ponto-presenca-add-edit',
  templateUrl: './ponto-presenca-add-edit.component.html',
  styleUrls: ['./ponto-presenca-add-edit.component.scss']
})
export class PontoPresencaAddEditComponent implements OnInit {

  /*
  *   Variaveis do de manipulação das informações de tipologia
  */
  tipologia: any;
  resp: any;
  removido: any;
  tipologiaremovida: any;
  tipologias: any[] = [];
  tipologiasGuardadas: any;

  /*
   * Variáveis globais
   */
  codPid: any;
  ufs: any;
  municipios: any;
  lotes: any;
  velocidades: any;
  instituicoesResp: any;
  instituicoesRespPag: any[] = [];
  params: any;

  /*
*   Variaveis do formulario do Ponto de Presença
*/
  pontoPresenca: PontoPresenca = {
    nome: '',
    inep: '',
    contrato: '',
    cod_lote: '',
    cod_velocidade: '',
    uf: '',
    cod_ibge: '',
    cod_instituicao_resp: '',
    cod_instituicao_pag: ''
  };

  /*
*   Variaveis do formulario do Endereço
*/
  enderecoPontPre = {
    endereco: '',
    numero: '',
    bairro: '',
    complemento: '',
    cep: '',
    area: '',
    latitude: '',
    longitude: ''
  };

  /*
  * Variáveis do Modal
  */
  abrirNodal = false;
  condicao: string;

  /*
*   Variaveis do formulario de tipologia
*/
  tipologiaPontoPresenca = {
    cod_tipologia: '',
  };

  contratos: any;
  public eCheckReadonly: boolean;
  public eCheckDisabled: boolean;
  public firstActive: boolean;
  public secondActive: boolean;
  public thirdActive: boolean;
  public fourthActive: boolean;
  public desabilitarCampos = false;

  @Input() busca: string;
  @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();

  contatos: Observable<PontoPresenca[]>;
  private termosDaBusca: Subject<string> = new Subject<string>();


  constructor(
    private appService: AppService,
    private pontoPresencaService: PontoPresencaService,
    private http: HttpClient,
    private router: Router,
    private modalService: SuiModalService,
    private contatoService: ContatoService,
    private route: ActivatedRoute
  ) {
    this.firstActive = true;
    // this.thirdActive = true;
  }


  /*
  * Método para trazer os municípios de acordo com a uf selecionada
  */
  selectEstado(uf) {
    this.municipios = this.appService.getMunicipios(uf);
  }

  /*
 * Método para o contrato do banco
 */
  contatosPontoPre() {
    this.pontoPresencaService.getContratos().subscribe(contratos => {
      this.contratos = contratos;
    });
  }


  /*
 * Método para trazer os lotes de acordo com o contrtato selecionada
 */
  selectContrato(pontoPresenca) {
    this.pontoPresencaService.getLotes(pontoPresenca).subscribe(lotes => {
      this.lotes = lotes;
    }
    );
  }

  /*
 * Método para trazer os velocidade de acordo com o lote selecionada
 */
  selectlote(pontoPresenca) {
    this.pontoPresencaService.getVelocidade(pontoPresenca).subscribe(velocidades => {
      this.velocidades = velocidades;
    }
    );
  }

  /*
   * Método para trazer a Instituição Responsavel do banco, filtra a parte da Instituição Responsavel para trazer a Instituição Pagadora
   */
  instituicaoResponsavel() {
    this.pontoPresencaService.getInstResps().subscribe(instituicoesResp => {
      this.instituicoesResp = instituicoesResp;
      for (let i = 0, j = 0; i < this.instituicoesResp.length; i++) {
        if (this.instituicoesResp[i].pagadora === 1) {
          this.instituicoesRespPag[j] = this.instituicoesResp[i];
          j++;
        }
      }
    });
  }



  /*
  * Métodos para salvar o endereço no banco
  */
  salvarEndereco(form) {
    this.pontoPresencaService.postEndereço(form, this.codPid).subscribe(resp => {
      this.resp = resp;
    });
  }


  /*
  * Métodos para popular o drop down em ponto de presença
  */
  tipologiaPontoPr() {
    this.pontoPresencaService.getTipologia().subscribe(tipologias => {
      this.tipologias = tipologias;
    });
  }

  /*
  * Métodos para salvar/editar o Ponto de Presença no banco, caso seja passado um id na rota ocorrerá um put, caso contrario será um post
  */
  salvarPontoPresenca(form) {
    delete this.pontoPresenca.uf;
    if (this.params.id) {
      this.pontoPresencaService.putPontoPresenca(this.params.id, form)
        .subscribe(resp => {
          this.resp = resp;
          console.log('editou');
        });
    } else {
      this.pontoPresencaService.postPontoPresenca(this.pontoPresenca).subscribe(codPid => {
        this.codPid = codPid;
        console.log('Adicionou');
      });
    }
  }

  /*
  * Método para retornar para a aba de adicionar/editar empresa
  */
  voltarPontoPresenca() {
    console.log('1voltou ?');
    console.log(this.codPid);
    if (this.codPid) {
      this.router.navigate(['pontPre', this.codPid]);
      console.log('2voltou ?');
      this.ngOnInit();
    } else {
      this.router.navigate(['pontPre/novo']);
      console.log('3voltou ?');
    }
  }

  /*
  * Métodos para salvara tipologia no banco
  */
  salvarTiplogia(form) {
    this.tipologia = {
      cod_tipologia: this.tipologiaPontoPresenca.cod_tipologia,
      cod_pid: this.codPid
    };
    this.pontoPresencaService.postTipologia(this.tipologia).subscribe(resp => {
      this.resp = resp;
      this.tipologiaIdPontoPr();
      console.log('salvou');
    });
  }


  /*
  * Métodos para trazer a tiplogia pelo id do ponto de presença do pid
  */
  tipologiaIdPontoPr() {
    this.pontoPresencaService.getTipologiaPP(this.codPid).subscribe(tipologiasGuardadas => {
      this.tipologiasGuardadas = tipologiasGuardadas;
    });
  }

  /*
  * Métodos para remover a tipologia da tela e do banco
  */
  removerTipologia() {
    this.pontoPresencaService.removeTipologiaId(this.codPid, this.tipologiaremovida).subscribe(res => {
      this.removido = res;
      this.tipologiaIdPontoPr();
    });
  }

  /*
  * Métodos feichar o modal
  */
  closeModal() {
    this.abrirNodal = false;
  }

  /*
  * Métodos abrir o modal
  */
  openModal(tipologia) {
    this.abrirNodal = true;
    this.condicao = tipologia.nome;
    this.tipologiaremovida = tipologia.cod_tipologia;
  }

  /*
  * Métodos que serão executados quando o componente é iniciado
  */
  ngOnInit(): void {

    this.route.params.subscribe(res => this.params = res);

    setTimeout(() => {
      this.ufs = this.appService.getEstados();
      /*
     * Trás os estados do banco
     */
      this.contatosPontoPre();
      this.instituicaoResponsavel();
      this.tipologiaPontoPr();

      /*
          * Condição para que caso exista parâmetro na rota será carregado os dados da empresa cadastrada
          */
      if (this.params.id) {
        console.log(this.params.id);
        this.pontoPresencaService.getPontoPresencaPorId(this.params.id)
          .subscribe(dados => {
            this.municipios = this.appService.getMunicipios(dados[0].uf);
            this.pontoPresenca = dados[0];
            console.log(dados);
            
          });
      }
    }, 200);

  }
}
