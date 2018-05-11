import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GESAC_API } from './app.api';

import { Uf } from './municipio/uf.model';
import { Municipio } from './municipio/municipio.model';

@Injectable()
export class AppService {
  private ufs: any;
  private municipios: any;
  private muniUfs: any;

  private newObjeto: any;
  private ObjetoFinal: any;
  private quantPag: number;
  private cont: number;

  constructor(private http: HttpClient) {
    this.http
      .get(`${GESAC_API}uf`)
      .subscribe(ufs => (this.ufs = ufs));

    this.http
      .get(`${GESAC_API}municipio`)
      .subscribe(municipios => (this.municipios = municipios));
  }

  getEstados() {
    return this.ufs;
  }

  getMunicipios(uf: any) {
    this.muniUfs = [];
    for (let i = 0; i < this.municipios.length; i++) {
      if (uf === this.municipios[i].uf) {
        this.muniUfs.push(this.municipios[i]);
      }
    }
    return this.muniUfs;
  }

  pagination(objeto: any, size: number) {
    this.newObjeto = [];
    this.ObjetoFinal = [];
    this.cont = 0;
    this.quantPag = Math.ceil(objeto.length / size);
    for (let i = 0; i < this.quantPag; i++) {
      for (let z = 0; z < size; z++) {
        if (this.cont >= objeto.length) {
          break;
        } else {
          this.newObjeto.push(objeto[this.cont]);
          this.cont++;
        }
      }
      this.ObjetoFinal[i] = this.newObjeto;
      this.newObjeto = [];
    }
    return this.ObjetoFinal;
  }

  formatData(data) {
    return new DatePipe('en-US').transform(data, 'y-MM-dd');
  }

  handleError(err: any): Promise<any> {
    console.log('Error: ', err);
    return Promise.reject(err.message || err);
  }
}
