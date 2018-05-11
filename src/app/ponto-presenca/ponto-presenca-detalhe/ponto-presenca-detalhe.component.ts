import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../modal/modal.component';

import { PontoPresencaService } from '../ponto-presenca.service';
import { JustifmModal } from './justificativa-modal.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-ponto-presenca-detalhe',
  templateUrl: './ponto-presenca-detalhe.component.html',
  styleUrls: ['./ponto-presenca-detalhe.component.scss']
})
export class PontoPresencaDetalheComponent implements OnInit {

  HistoricoAcoes = [{ acao: 'Analise', data: 25 / 1 / 23154, usuario: 'rere.asdas' },
  { acao: 'Interacao', data: 24 / 4 / 254, usuario: 'afs.hjg' },
  { acao: 'Solicitacao', data: 23 / 3 / 3154, usuario: 'wqr.asd' }
  ];

  abrirNodal = false;
  condicao: string;

  historicoAcoes = [];
  constructor(
    private modalService: SuiModalService,
    private pontoPresencaService: PontoPresencaService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      const id: number = +params['id'];
    });
    this.historicoAcoes = this.HistoricoAcoes;
  }


  closeModal() {
    this.abrirNodal = false;
  }


  openModal(acao) {
    this.abrirNodal = true;
    this.condicao = acao;
    console.log(acao);

  }

  justModal() {
    this.modalService
      .open(new JustifmModal('Você tem certeza que deseja Rejeitar essa analise ?', ``, 'normal'))
      .onApprove(() => {

      })
      .onDeny(() => '');
  }


}


