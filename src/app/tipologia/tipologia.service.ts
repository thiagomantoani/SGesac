import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppService } from './../app.service';
import { GESAC_API } from '../app.api';
import { Tipologia } from './tipologia.model';



@Injectable()
export class TipologiaService {
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {}

  getTipologias() {
    return this.http
      .get<Tipologia>(`${GESAC_API}tipologia`)
      .catch(this.appService.handleError);
  }

  postTipologia(dados) {
    return this.http
      .post<Tipologia>(`${GESAC_API}tipologia`, dados.value)
      .catch(this.appService.handleError);
  }

  deleteTipologia(id) {
    return this.http
      .delete<Tipologia>(`${GESAC_API}tipologia/${id}`)
      .catch(this.appService.handleError);
  }

  putTipologia(dados) {
    return this.http
      .put<Tipologia>(`${GESAC_API}tipologia/${dados.cod_tipologia}`, dados)
      .catch(this.appService.handleError);
  }

}

