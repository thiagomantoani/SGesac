import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { PontoPresencaService } from './ponto-presenca.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-ponto-presenca',
  templateUrl: './ponto-presenca.component.html',
  styleUrls: ['./ponto-presenca.component.scss']
})
export class PontoPresencaComponent implements OnInit, OnDestroy {
  filtros = {
    gesac: '',
    uf: '',
    municipio: '',
    status: '',
    ponto: '',
    tipologia: ''
  };

  pontosPresenca: any;
  segmentDimmed: boolean;

  paginacao: any;
  allArrays: any;
  numeroPagina  = 50;
  totalItens  = 0;
  pontoPresencaPag: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pontoPresencaService: PontoPresencaService,
    private appService: AppService
  ) { }

  goBack() {
    this.location.back();
  }

  loadPontoPre() {
    this.paginacao = this.pontoPresencaService.getPontoPresenca().subscribe(dados => {
      this.pontosPresenca = dados;
      console.log(this.pontosPresenca);
      this.funcaoPaginacao();
    });
  }


  ngOnInit() {

    this.segmentDimmed = true;
    this.loadPontoPre();
  }

  page(pagina) {
    this.pontoPresencaPag = this.allArrays[pagina - 1];
  }

  ngOnDestroy() {
    this.paginacao.unsubscribe();
  }


  funcaoPaginacao() {
    this.totalItens = this.pontosPresenca.length;
    this.allArrays = this.appService.pagination(
      this.pontosPresenca,
      this.numeroPagina
    );


    let pagina;
    this.page((pagina = 1));
    this.segmentDimmed = false;

  }
}
