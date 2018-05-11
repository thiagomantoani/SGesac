import { NgxMaskModule } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { SuiModalService } from 'ng2-semantic-ui/dist/public';

import { InstRespService } from './../instituicao-responsavel.service';
import { MunicipioService } from '../../municipio/municipio.service';
import { AppService } from '../../app.service';
import { ContatoService } from '../../contato/contato.service';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-instresp-add',
  templateUrl: './inst-resp-add-edit.component.html',
  styleUrls: ['./inst-resp-add-edit.component.scss']
})
export class InstRespAddEditComponent implements OnInit {
  repreLegalContatoSelect: any;
  represetanteLegalTodos: any;
  repreInativos = [];
  formInstituicaoResp: any;

  instResp: boolean;
  contatos: boolean;

  valorTab: number;
  instituicaoRespResponse: any;
  instRespId: any;
  params: any;
  ufs: any = '';
  municipios: any = '';
  contatoInstResps: any;
  formRepresentanteLegal: any;
  getUf: any;
  getMunicipio: any;

  repreLegal: any;
  idPutRepLegal: any;
  repreLegalContato: any;
  templateValue: boolean;

  testsdasde: any;
  formInstiRespSemUf: any;

  constructor(
    public modalService: SuiModalService,
    private location: Location,
    private serviceInstiResp: InstRespService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {
    this.instResp = true;
    setTimeout(() => {
      this.ufs = this.appService.getEstados();
    }, 200);

    this.route.params.subscribe(res => (this.params = res));

    this.repreLegal = {
      data_inicial: '',
      data_final: ''
    };

    this.formInstituicaoResp = {
      cnpj_instituicao: '',
      nome: '',
      sigla: '',
      endereco: '',
      numero: '',
      bairro: '',
      complemento: '',
      cep: '',
      cod_ibge: '',
      dou: '',
      termo_coop: '',
      num_processo: '',
      pagadora: '',
      uf: ''
    };

    if (this.params.id) {
      this.serviceInstiResp.getInstResp(this.params.id).subscribe(dados => {
        this.formInstituicaoResp = dados[0];

        setTimeout(() => {
          this.selectEstado(this.formInstituicaoResp.uf);
        }, 200);
      });
    }
  }

  alterTab(valor) {
    this.valorTab = valor;
    $('.ui .item').on('click', function() {
      $('.ui .item').removeClass('active');
      $(this).addClass('active');
    });
  }

  selectEstado(uf) {
    this.municipios = this.appService.getMunicipios(uf);
  }

  // insituição responsavel submit do post e put.
  submitInstResp() {
    if (this.params.id) {
      delete this.formInstituicaoResp.nome_municipio;
      delete this.formInstituicaoResp.uf;
      this.serviceInstiResp
        .putInstResp(this.params.id, this.formInstituicaoResp)
        .subscribe(res => console.log('Submit'));
      this.contatoService.getContatos(this.params.id, 'instituicao');
    } else {
      delete this.formInstituicaoResp.uf;
      this.serviceInstiResp
        .postInstResp(this.formInstituicaoResp)
        .subscribe(res => {
          this.instituicaoRespResponse = res;
          this.contatoService.getContatos(
            this.instituicaoRespResponse,
            'instituicao'
          );
        });
    }
  }

  // voltar para aba insituião responsavel e carregar os dados submetidos.
  voltarInstResp() {
    if (this.params.id) {
      this.instituicaoRespResponse = this.params.id;
    }
    if (this.instituicaoRespResponse) {
      this.router.navigate(['instResp/edit', this.instituicaoRespResponse]);
      this.serviceInstiResp.getInstResp(this.params.id);
      this.instResp = true;
    } else {
      this.router.navigate(['instResp/novo']);
      this.instResp = true;
    }
  }

  // REPRESENTANTE LEGAL

  // adiciona e atualiza o representante responsavel
  submitRepLegal() {
    this.formataData();
    this.formataJson();

    let postAtivo = false;
    console.log(this.represetanteLegalTodos);


    if (this.represetanteLegalTodos.length === 0) {
      this.repreLegal.status = 'A';
      this.postRepreLegal();
    } else {
      for (let i = 0; i < this.represetanteLegalTodos.length; i++) {
        if (this.represetanteLegalTodos[i].status === 'A') {

          this.represetanteLegalTodos[i].status = 'I';
          console.log('passando para Inativo' , this.represetanteLegalTodos[i]);
            // FUDEU AQUI
           this.putRepreLegal(this.represetanteLegalTodos[i], this.represetanteLegalTodos[i].cod_representante);
        }
      }

      for (let i = 0; i < this.represetanteLegalTodos.length; i++) {

        if (
          this.repreLegal.cod_contato ===
            this.represetanteLegalTodos[i].cod_contato &&
          this.repreLegal.cod_pessoa ===
            this.represetanteLegalTodos[i].cod_pessoa
        ) {

          this.repreLegal.status = 'A';
          console.log('passando para ativo' , this.repreLegal);
          this.putRepreLegal(this.repreLegal, this.represetanteLegalTodos[i].cod_representante);

          postAtivo = false;
          break;
        } else {
          postAtivo = true;
        }
      }
      if (postAtivo === true) {
        for (let i = 0; i < this.represetanteLegalTodos.length; i++) {
          if (this.represetanteLegalTodos[i].status === 'A') {
            console.log(
              'atualiza os anteriores para 0',
              this.represetanteLegalTodos[i]
            );
            // this.putRepreLegal(this.reprelegal, )
            // -- FAZER O PUT AQUI COM OS DADOS DO FOR NESSA POSIçÃO
          }
        }

        // this.repreLegal.status = 'A';
        // this.postRepreLegal();

        console.log('adiciona passando o status para a');
      }
    }
  }

  repLegal() {
    if (this.params.id) {
      this.serviceInstiResp
        .getContatoInstResp(this.params.id)
        .subscribe(res => {
          this.contatoInstResps = res;
        });
      this.getRepreLegalFun(this.params.id);
    } else {
      this.serviceInstiResp
        .getContatoInstResp(this.instituicaoRespResponse)
        .subscribe(res => {
          this.contatoInstResps = res;
          console.log(this.contatoInstResps);
        });
      this.getRepreLegalFun(this.instituicaoRespResponse);
    }
  }

  //  função para formatar o json para o formato necessario para o banco
  formataJson() {
    delete this.repreLegal.cargo;
    delete this.repreLegal.cnpj_empresa;
    delete this.repreLegal.cod_gesac;
    delete this.repreLegal.nome;
    delete this.repreLegal.obs;
    delete this.repreLegal.cod_instituicao;

    // this.idPutRepLegal = this.repreLegal.cod_representante;
    // delete this.repreLegal.cod_representante;
  }

  formataData() {
    this.repreLegal.cod_contato = this.repreLegalContato.cod_contato;
    this.repreLegal.cod_pessoa = this.repreLegalContato.cod_pessoa;
    this.repreLegal.data_inicial = this.appService.formatData(
      this.repreLegal.data_inicial
    );
    this.repreLegal.data_final = this.appService.formatData(
      this.repreLegal.data_final
    );
  }

  // funções para requisições HTTP para o service

  putRepreLegal(dados, id) {
    this.serviceInstiResp
      .putRepLegalInstResp(dados, id)
      .subscribe(res => console.log(res));
  }

  postRepreLegal() {
    this.serviceInstiResp
      .postRepLegalInstResp(this.repreLegal)
      .subscribe(res => console.log(res));
  }

  getRepreLegalFun(id) {
    this.serviceInstiResp.getRepresentanteLegalId(id).subscribe(res => {
      console.log(res);
      this.represetanteLegalTodos = res;
      if (res.length > 0) {
        this.templateValue = true;
      } else {
        this.templateValue = false;
      }
      let j = 0;
      for (let i = 0; i < res.length; i++) {
        if (res[i].status === 'A' && this.repreLegalContato === undefined) {
          this.repreLegal = res[i];
          this.repreLegalContato = res[i];
        } else if (res[i].status === 'I') {
          this.repreInativos[j] = res[i];
          j++;
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
