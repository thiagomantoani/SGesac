import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';

import { InstRespService } from './instituicao-responsavel.service';
import { SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal/modal.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-instresp-resp',
  templateUrl: './instituicao-responsavel.component.html',
  styleUrls: ['./instituicao-responsavel.component.scss']
})
export class InstRespComponent implements OnInit {
  filtros = {
    cnpj: '',
    nome: '',
    sigla: ''
  };
  instituicoesResp: any;
  collapValue: boolean;
  segmentDimmed: any;
  itens: any[] = ['1'];

  allArrays: any;
  numeroPagina = 50;
  totalItens = 0;
  instituicoesRespPag: any;

  modalActions = new EventEmitter<string>();

  constructor(
    private location: Location,
    private instituicaoResponsavelService: InstRespService,
    private modalService: SuiModalService,
    private appService: AppService
  ) {}

  // Carregar Insituições responsaveis
  loadInstResp() {
    this.instituicaoResponsavelService.getInstResps().subscribe(dados => {
      this.instituicoesResp = dados;
      this.funcaoPaginacao();
    });
  }

  funcaoPaginacao() {
    let pagina;
    this.totalItens = this.instituicoesResp.length;
    this.allArrays = this.appService.pagination(
      this.instituicoesResp,
      this.numeroPagina
    );

    this.page((pagina = 1));
  }

  ngOnInit() {
    this.segmentDimmed = true;
    this.loadInstResp();
    this.segmentDimmed = false;
  }

  removerInstResp(id) {
    this.instituicaoResponsavelService.deleteInstResp(id).subscribe(
      res => this.instituicaoResponsavelService.getInstResps());
  }

  goBack() {
    this.location.back();
  }

  page(pagina) {
    this.instituicoesRespPag = this.allArrays[pagina - 1];
  }
}
