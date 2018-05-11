import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Municipio } from './municipio.model';
import { GESAC_API } from '../app.api';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppService } from '../app.service';

@Injectable()
export class MunicipioService {
  constructor(
    private http: HttpClient,
    private appService: AppService) {}

  getMunicipio() {
    return this.http.get(`${GESAC_API}municipio`)
    .catch(this.appService.handleError);
  }
}
