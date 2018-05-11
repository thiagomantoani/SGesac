import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { EmpresaService } from './../empresa.service';
import { ContatoService } from '../../contato/contato.service';

import { Empresa } from './../empresa.model';
import { SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../modal/modal.component';

@Component({
  selector: 'app-empresa-adicionar-editar',
  templateUrl: './empresa-adicionar-editar.component.html',
  styleUrls: ['./empresa-adicionar-editar.component.scss']
})
export class EmpresaAdicionarEditarComponent implements OnInit {

  /*
  * Variáveis fixas
  */
  local = 'empresa';
  codigo: string;
  params: any;

  /*
  * Variáveis globais
  */
 ufs: any;
 municipios: any;
 radio: string;
  empresasPai: Empresa[];

  /*
  * variáveis temporárias
  */
  consorcio: boolean;
  radioCons: string;

  /*
  * Variável das tabs
  */
 empresas = true;
 contatos: boolean;

 /*
 * Variável de abilitar ou desabilitar campos
 */
  editCnpj = false;
  desabilitarRadio = false;

  /*
  * Váriável que guarda os dados do formulário
  */
  empresa: Empresa = {
    cnpj_empresa: '',
    cnpj_empresa_pai: '',
    cod_ibge: null,
    empresa: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    complemento: '',
    nome_municipio: '',
    uf: ''
  };

  constructor(
    private appService: AppService,
    private empresaService: EmpresaService,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: SuiModalService
  ) {}

  /*
  * Método para mostrar o campo de empresa pai caso seja selecionado o radio com a opção não
  */
  radioConsorcio(consorcio) {
    if (consorcio === 'nao') {
        this.consorcio = true;
        this.empresa.cnpj_empresa_pai = '';
     } else {
        this.consorcio = false;
        this.empresa.cnpj_empresa_pai = this.empresa.cnpj_empresa;
      }
    }

  /*
  * Método para trazer os municípios de acordo com a uf selecionada
  */
  selectEstado(uf) {
    this.empresa.cod_ibge = null;
    this.municipios = this.appService.getMunicipios(uf);
  }

  /*
  * Método para formatar o objeto de empresa para ser enviado para o banco
  */
  formatEmpresa(form) {
    return {
      cnpj_empresa: form.cnpj_empresa,
      cnpj_empresa_pai: form.cnpj_empresa_pai,
      cod_ibge: form.cod_ibge,
      empresa: form.empresa,
      cep: form.cep,
      endereco: form.endereco,
      numero: form.numero,
      bairro: form.bairro,
      complemento: form.complemento
    };
  }

  /*
  * Método para adicionar/editar a empresa, caso seja passado um id na rota ocorrerá um put, caso contrario será um post
  */
  salvarEmpresa(form, consorcio) {
    if (this.radio === 'sim') {form.value.cnpj_empresa_pai = form.value.cnpj_empresa; }
    form = this.formatEmpresa(form.value);
    if (this.params.id) {
      this.empresaService.putEmpresa(this.params.id, form)
      .subscribe(res => {
        this.codigo = form.cnpj_empresa;
        this.contatoService.getContatos(this.codigo, 'empresa');
        this.contatos = true;
      });
    } else {
      this.empresaService.postEmpresa(form)
      .subscribe(res => {
        this.codigo = form.cnpj_empresa;
        this.contatoService.getContatos(this.codigo, 'empresa');
        this.contatos = true;
      });
    }
  }

  /*
  * Método para retornar para a aba de adicionar/editar empresa
  */
  voltarEmpresa() {
    if (this.empresa.cnpj_empresa) {
      this.router.navigate(['empresa', this.empresa.cnpj_empresa]);
      this.empresas = true;
      this.ngOnInit();
    } else {
      this.router.navigate(['empresa/novo']);
      this.empresas = true;
    }
  }

  /*
  * Métodos que serão executados quando o componente é iniciado
  */
  ngOnInit() {
    /*
    * Método que pega o parâmetro da rota caso ele exista
    */
    this.route.params.subscribe(res => this.params = res);
    setTimeout(() => {
      /*
      * Trás os estados do banco
      */
      this.ufs = this.appService.getEstados();
      /*
      * Trás as empresas pai do banco
      */
      this.empresaService
        .getEmpresasPai()
        .subscribe(empresasPai => (this.empresasPai = empresasPai));

      /*
      * Condição para que caso exista parâmetro na rota será carregado os dados da empresa cadastrada
      */
      if (this.params.id) {
        this.empresaService.getEmpresa(this.params.id)
        .subscribe(dados =>  {
          if (dados.length === 0) {
            this.modalService
            .open(
              new ConfirmModal(
                'ERRO',
                `Esta empresa não existe! Deseja cadastrar uma nova empresa?`,
                'mini'
              )
            )
            .onApprove(() => {
              this.router.navigate(['empresa/novo']);
            })
            .onDeny(() => {
              this.router.navigate(['empresa']);
            });
          } else {
            this.municipios = this.appService.getMunicipios(dados[0].uf);

            if (dados[0].cnpj_empresa === dados[0].cnpj_empresa_pai) {
              this.radioConsorcio('sim');
              this.radio = 'sim';
              this.desabilitarRadio = true;
            } else {
              this.radioConsorcio('nao');
              this.radio = 'nao';
            }
            
            this.empresa = dados[0];
          }
        });
        this.editCnpj = true;
      }
    }, 200);
  }
}
