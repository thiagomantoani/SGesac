import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SuiModalService } from 'ng2-semantic-ui';

import { ContratoService } from './../contrato.service';
import { AppService } from '../../app.service';
import { EmpresaService } from '../../empresa/empresa.service';

import { Contrato } from '../contrato.model';
import { Lote } from '../lote.model';
import { ConfirmModal } from '../../modal/modal.component';

@Component({
  selector: 'app-contrato-adicionar-editar',
  templateUrl: './contrato-adicionar-editar.component.html',
  styleUrls: ['./contrato-adicionar-editar.component.scss']
})
export class ContratoAdicionarEditarComponent implements OnInit {
  /*
  * INSTÂNCIAS DE VARIÁVEIS - INÍCIO
  *
  * Variáveis temporárias
  */
  fContratos: any;
  resposta: any;
  fVelocidade: any;

  /*
  * Valores iniciais dos formulários
  */
  bContratos: Contrato = {
    num_contrato: '',
    cnpj_empresa: '',
    quant_pontos: null,
    processo_sei: '',
    data_inicio: '',
    data_fim: '',
    empresa: ''
  };
  alterLote = {
    cod_lote: null,
    num_contrato: '',
    lote: ''
  };

  /*
  * Variáveis globais
  */
  selectEmpresa: any;
  params: any;
  searchLotes: any;
  lotesCadastrados: any = [];
  velocidadeArray: any;
  velo: any;

  /*
  * Váriáveis das tabs
  */
  contratos = true;
  lotes: boolean;

  /*
  * Variáveis dos inputs
  */
  desabilitarCampos = false;

  /*
  * Opções para a máscara de dinheiro
  * prefix(prefixo: string)
  * thousands(separador da casa das centenas: string)
  * decimal(separador da casa dos decimais: string)
  * precision(número de casas após a vírgula: number)
  * allowNegative(se aceita números negativos ou não: boolean)
  * align(posição da máscara no input: string)
  */
  currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  };

  /*
  * Pagination
  */
  todosLotesCadastrados: any;
  totalItens = 0;
  itensPagina = 50;
  pagina = 1;

  /*
  * INSTÂNCIAS DE VARIÁVEIS - FIM
  */

  constructor(
    private appService: AppService,
    private empresaService: EmpresaService,
    private contratoService: ContratoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: SuiModalService
  ) {}

  /* ADICIONAR CONTRATO - INÍCIO
  * Método que salva no banco os dados do contrato caso seja um novo contrato ou atualiza os dados
  * caso o contrato já exista
  */
  salvarContato(form) {
    form.value.data_inicio = this.appService.formatData(form.value.data_inicio);
    form.value.data_fim = this.appService.formatData(form.value.data_fim);
    this.fContratos = form.value;
    if (this.params.id) {
      this.contratoService
        .putContrato(this.params.id, form.value)
        .subscribe(res => this.irParaLote(this.params.id));
    } else {
      this.contratoService
        .postContrato(form.value)
        .subscribe(res => this.irParaLote(form.value.num_contrato));
    }
  }

  /*
  * Método que carrega os dados do contrato
  */
  getContrato(codContrato) {
    this.contratoService
      .getContrato(codContrato)
      .subscribe(
        dados => {
          if (dados.length === 0) {
            this.modalService
            .open(
              new ConfirmModal(
                'ERRO',
                `Este contrato não existe! Deseja cadastrar um novo contrato?`,
                'mini'
              )
            )
            .onApprove(() => {
              this.router.navigate(['contrato/novo']);
            })
            .onDeny(() => {
              this.router.navigate(['contrato']);
            });
          } else {
            this.bContratos = dados[0];
          }
        }
      );
  }

  /*
  * Método que redireciona para lote e carega os lotes de acordo com o contrato contrato
  */
  irParaLote(numContrato) {
    this.getLotes(numContrato);
    this.lotes = true;
  }

  /*
  * Método para adicionar novos lotes no cotrato
  */
  enviarNome(formAddLote: NgForm) {
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja inserir ${formAddLote.value.nome}?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.contratoService
          .postLote(this.fContratos.num_contrato, formAddLote.value.nome)
          .subscribe(res => {
            this.alterLote = {
              cod_lote: res,
              num_contrato: this.fContratos.num_contrato,
              lote: formAddLote.value.nome
            };
            this.getLotes(this.fContratos.num_contrato);
            formAddLote.reset();
            this.velocidadeArray = [];
            this.desabilitarCampos = true;
          });
      });
  }

  /*
  * ADICIONAR CONTRATO - FIM
  *
  * INFORMAÇÕES DO LOTE - INÍCIO
  * Método para abrir a janela de informação do lote e carregar os dados do lote escolhido caso o usuário clique em editar lote
  */
  infoLote(lote: any) {
    if (this.desabilitarCampos === false) {
      this.modalService
        .open(
          new ConfirmModal(
            'Você tem certeza?',
            `Você tem certeza que deseja editar o lote ${lote.lote}?`,
            'mini'
          )
        )
        .onApprove(() => {
          this.alterLote = lote;
          this.getVelocidades(lote.cod_lote);
          this.desabilitarCampos = true;
        });
    }
  }

  /*
  * Método para adicionar novas velocidades ao lote
  */
  addVelocidade(formLotes: NgForm) {
    this.modalService
        .open(
          new ConfirmModal(
            'Você tem certeza?',
            `Você tem certeza que deseja adicionar esta velocidade ao lote ${this.alterLote.lote}?`,
            'mini'
          )
        )
        .onApprove(() => {
          this.fVelocidade = {
            cod_lote: this.alterLote.cod_lote,
            descricao: formLotes.value.descricao,
            preco: formLotes.value.preco
          };
          this.contratoService.postVelocidade(this.fVelocidade)
          .subscribe(res => {
            this.getVelocidades(this.alterLote.cod_lote);
            formLotes.reset();
            delete this.fVelocidade;
          });


        });
  }

  /*
  * Método para fechar a janela de informações do lote
  */
  cancelarInfLote() {
    delete this.alterLote;
    this.desabilitarCampos = false;
  }

  /*
  * Método para carregar os lotes do contrato
  */
  getLotes(numContrato) {
    this.contratoService
      .getLotes(numContrato)
      .subscribe(lotesCadastrados => {
          this.totalItens = lotesCadastrados.length;
          this.todosLotesCadastrados = this.appService.pagination(lotesCadastrados, this.itensPagina);
          this.lotesCadastrados = this.todosLotesCadastrados[0];
      });
  }

  /*
  * Método para carregar as velocidades de acordo com o codigo do lote escolhido
  */
  getVelocidades(codLote) {
    this.contratoService.getVelocidade(codLote).subscribe(res => {
      this.velocidadeArray = res;
    });
  }

  /*
  * Método para abrir a janela de informações do lote para edição do mesmo
  */
  visuLote(lote) {
      this.alterLote = lote;
      this.getVelocidades(lote.cod_lote);
      this.desabilitarCampos = true;
  }

  /*
  * INFORMAÇÕES DO LOTE - FIM
  *
  * TABELA DE LOTES CADASTRADOS - INÍCIO
  * Método para editar o nome do lote
  */
  alterarLote(lote: NgForm) {
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja alterar o nome deste lote?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.contratoService
          .putLote(this.alterLote.cod_lote, lote.value.lote)
          .subscribe(res => {
            this.resposta = res;
            this.alterLote.lote = this.resposta.lote;
            lote.reset();
            this.getLotes(this.alterLote.num_contrato);
          });
      });
  }

  /*
  * Método para deletar o lote caso o mesmo não tenha velocidades cadastradas
  */
  deleteLote(lote) {
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja excluir ${lote.lote}?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.contratoService.deleteLote(lote.cod_lote).subscribe(res => {
          this.getLotes(this.fContratos.num_contrato);
          this.cancelarInfLote();
        });
      });
  }

  /*
  * TABELA DE LOTES CADASTRADOS - FIM
  *
  * Método para retornar para a aba de edição do contrato
  */
  voltarContrato() {
    if (this.fContratos.num_contrato) {
      this.router.navigate(['contrato', this.fContratos.num_contrato]);
      this.getContrato(this.fContratos.num_contrato);
      this.contratos = true;
    } else {
      this.router.navigate(['contrato/novo']);
      this.getContrato(this.fContratos.num_contrato);
      this.contratos = true;
    }
  }

  /*
  * Método para alterar a página da tabela de lotes cadastrados
  */
  mudarPagina(pagina) {
    this.lotesCadastrados = this.todosLotesCadastrados[pagina - 1];
  }

  /*
  * Métodos que serão executados quando o componente é iniciado
  */
  ngOnInit() {
    /*
    * Verifica se existe parâmetro na rota e se existir quando o parâmetro em uma variável
    */
    this.route.params.subscribe(res => (this.params = res));

    setTimeout(() => {
      /*
      * Método que carrega as empresas que podem ser escolhidas no cadastro do contrato
      */
      this.empresaService
        .getEmpresas()
        .subscribe(dados => {this.selectEmpresa = dados; });

      /*
      * Caso exista parâmetro na rota, irá ser carregado os dados do contrato
      */
      if (this.params.id) {
        this.getContrato(this.params.id);
      }
    }, 200);
  }
}
