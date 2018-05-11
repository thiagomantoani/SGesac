import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GESAC_API } from '../app.api';
import { InstituicaoResp, RepLegal } from './instituicao-responsavel.model';
import { AppService } from '../app.service';

@Injectable()
export class InstRespService {
  idRepLegalPut: any;

  constructor(private http: HttpClient, private appService: AppService) {}

  // INSTITUIÇÃO RESPONSAVEL

  // lista todas as insituições responsaveis
  getInstResps() {
    return this.http
      .get<InstituicaoResp[]>(`${GESAC_API}instituicaoResponsavel`)
      .catch(this.appService.handleError);
  }

  // lista a instituição responsavel, passando o codigo ID
  getInstResp(idInstResp) {
    return this.http
      .get<InstituicaoResp>(`${GESAC_API}instituicaoResponsavel/${idInstResp}`)
      .catch(this.appService.handleError);
  }

  // atualiza instituição responsavel
  putInstResp(idIR, form) {
    return this.http
    .put(`${GESAC_API}instituicaoResponsavel/${idIR}`, form)
    .catch(this.appService.handleError);
  }

  // Salva a instituição responsavel
  postInstResp(valor) {
    console.log(valor);

    return this.http
      .post<InstituicaoResp>(`${GESAC_API}instituicaoResponsavel`, valor)
      .catch(this.appService.handleError);
  }


  // Remove a instituição responsavel
  deleteInstResp(idInstResp) {
    return this.http
      .delete(`${GESAC_API}instituicaoResponsavel/${idInstResp}`)
      .map(res => console.log(res)
      );
  }

  // REPRESENTANTE LEGAL

  // Lista todos os contatos da instituição responsavel

  getRepresentanteLegalId(idRepresentante) {
    return this.http
      .get(`${GESAC_API}representanteLegalInst/${idRepresentante}`)
      .catch(this.appService.handleError);
  }

  postRepLegalInstResp(dados) {
    console.log(dados);
    return this.http
      .post(`${GESAC_API}representanteLegal`, dados)
      .catch(this.appService.handleError);
  }

  putRepLegalInstResp(dados, id) {
        delete dados.cod_representante;

    return this.http
    .put(`${GESAC_API}representanteLegal/${id}`, dados)
    .catch(this.appService.handleError);
  }

  // contato representante legal

  getContatoInstResp(idContatoInstResp) {
    return this.http
      .get(`${GESAC_API}contatoInstituicao/${idContatoInstResp}`)
      .catch(this.appService.handleError);
  }



}
