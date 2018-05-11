import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppService } from './../app.service';

import { GESAC_API } from '../app.api';
import { Contrato } from './contrato.model';
import { Lote } from './lote.model';

@Injectable()
export class ContratoService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  // CONTRATOS

  getContratos() {
    return this.http.get<Contrato[]>(`${GESAC_API}contrato`);
  }

  getContrato(idContrato) {
    return this.http.get<Contrato[]>(`${GESAC_API}contrato/${idContrato}`);
  }

  postContrato(form) {
    return this.http.post(`${GESAC_API}contrato`, form)
    .map((res: Response) => res);
  }

  putContrato(idContrato, form) {
    return this.http.put(`${GESAC_API}contrato/${idContrato}`, form)
    .map((res: Response) => res);
  }

  // LOTES

  getLotes(numContrato) {
    return this.http.get<Lote[]>(`${GESAC_API}loteContrato/${numContrato}`);
  }

  postLote(num_contrato, lote) {
    return this.http.post(`${GESAC_API}lote`, {num_contrato, lote})
    .map((res: Response) => res);
  }

  putLote(codLote, lote) {
    return this.http.put(`${GESAC_API}lote/${codLote}`, {lote})
    .map((res: Response) => res);
  }

  deleteLote(codLote) {
    return this.http.delete(`${GESAC_API}lote/${codLote}`)
    .map((res: Response) => res);
  }

// VELOCIDADE

  getVelocidade(codLote) {
    return this.http.get(`${GESAC_API}velocidade/${codLote}`)
    .map((res: Response) => res);
  }

  postVelocidade(form) {
    return this.http.post(`${GESAC_API}velocidade`, form)
    .map((res: Response) => res);
  }


}
