import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FilterContratoPipe } from './filter-contrato.pipe';

import { ContratoService } from './contrato.service';
import { SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal/modal.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  filtros = {
    empresa: '',
    contrato: '',
    pontos: '',
    procSei: '',
  };
  contratos: any[] = [];
  excluiModal: any;
  segmentDimmed: boolean;

  /*
  * Pagination
  */
  todosContratos: any;
  totalItens = 0;
  itensPagina = 50;
  pagina = 1;

  constructor(
    private contratoService: ContratoService,
    private location: Location,
    private modalService: SuiModalService,
    private appService: AppService
  ) {}

  goBack() {
    this.location.back();
  }

  delModal(contrato: any, i: number) {
    this.excluiModal = contrato;
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja excluir o contrato ${contrato.cod_contrato}?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.contratos.splice(i, 1);
        alert(`O contrato foi excluido com sucesso!`);
      });
  }

  mudarPagina(pagina) {
    this.contratos = this.todosContratos[pagina - 1];
  }

  filterChange(term) {
    this.filtros = term;
  }

  ngOnInit() {
    this.segmentDimmed = true;
    setTimeout(() => {
      this.contratoService.getContratos().subscribe(contratos => {
        this.totalItens = contratos.length;
        this.todosContratos = this.appService.pagination(contratos, this.itensPagina);
        this.contratos = this.todosContratos[0];
        this.segmentDimmed = false;
      });
    }, 200);
  }
}
