import { GESAC_API } from './../app.api';
import { Component, OnInit } from '@angular/core';

import { Tipologia } from './tipologia.model';
import { TipologiaService } from './tipologia.service';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal/modal.component';

@Component({
  selector: 'app-tipologia',
  templateUrl: './tipologia.component.html',
  styleUrls: ['./tipologia.component.scss']
})
export class TipologiaComponent implements OnInit {
  filtros = {
    codTip: '',
    nome: ''
  };
  desabilitado: boolean;
  tipologias: any;
  formTipologias: FormGroup;

  constructor(
    private tipologiaService: TipologiaService,
    private formBuilder: FormBuilder,
    private modalService: SuiModalService
  ) {}

  ngOnInit() {
    this.desabilitado = true;
    this.formTipologias = this.formBuilder.group({
      cod_tipologia: [null],
      nome: [null]
    });
    this.getTipologias();
  }

  getTipologias() {
    this.tipologiaService
      .getTipologias()
      .subscribe(tipologia => (this.tipologias = tipologia));
  }

  removerTipologia(tipo) {
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja excluir a tipologia ${tipo.nome} ?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.tipologiaService
          .deleteTipologia(tipo.cod_tipologia)
          .subscribe(res => {
            this.getTipologias();
          });
      });
  }

  salvarTipologia() {
    this.tipologiaService.postTipologia(this.formTipologias).subscribe(res => {
      this.getTipologias();
      this.formTipologias.reset();
    });
  }

  editar(i) {
    // if (this.desabilitado === desabilitado[i]) {
    //   this.desabilitado[i] = false;
    // } else {
    //   this.desabilitado[i] = true;
    // }
    this.desabilitado = i;
    console.log(i);

  }

  change(dados) {
    this.tipologiaService.putTipologia(dados);
  }
}
