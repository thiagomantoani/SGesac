import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GESAC_API } from '../app.api';
import { Empresa } from './empresa.model';

@Injectable()
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  getEmpresas() {
    return this.http.get<Empresa[]>(`${GESAC_API}empresa`);
  }

  getEmpresa(cnpjEmpresa) {
    return this.http.get<Empresa[]>(`${GESAC_API}empresa/${cnpjEmpresa}`);
  }

  getEmpresasPai() {
    return this.http.get<Empresa[]>(`${GESAC_API}empresaPai`);
  }

  postEmpresa(form) {
    return this.http.post(`${GESAC_API}empresa`, form)
    .map(res => res);
  }

  putEmpresa(cnpjEmpresa, form) {
    return this.http.put(`${GESAC_API}empresa/${cnpjEmpresa}`, form)
    .map(res => res);
  }

  deleteEmpresa(cnpjEmpresa) {
    return this.http.delete(`${GESAC_API}empresa/${cnpjEmpresa}`)
    .map(res => res);
  }


}
