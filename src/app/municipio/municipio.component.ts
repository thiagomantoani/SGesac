import { AppService } from '../app.service';
import { MunicipioService } from './municipio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {
  allArrays: any;
  municipios: any;
  segmentDimmed: boolean;
  numeroPagina: number = 50;
  totalItens: number = 0;

  municiposPag: any[] = [];

  constructor(
    private municipioService: MunicipioService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.segmentDimmed = true;

      this.municipioService.getMunicipio().subscribe(municipio => {
        this.municipios = municipio;

        this.totalItens = this.municipios.length;
        this.allArrays = this.appService.pagination(
          this.municipios,
          this.numeroPagina
        );

        setTimeout(() => {
          let pagina;
          this.page((pagina = 1));
          this.segmentDimmed = false;
        }, 200);
      });

  }
  page(pagina) {
    this.municiposPag = this.allArrays[pagina - 1];
  }
}
