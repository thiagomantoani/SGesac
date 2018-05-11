import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { GESAC_API } from '../app.api';
import { PontoPresenca } from './ponto-presenca.model';
import { AppService } from '../app.service';
import { Contrato } from '../contrato/contrato.model';
import { InstituicaoResp } from '../instituicao-responsavel/instituicao-responsavel.model';


@Injectable()
export class PontoPresencaService {
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  /*
  * Protocolos HTTP do Ponto de presença
  */

  /*
  * Protocolo HTTP do ponto de presença para trazer do banco
  */
  getPontoPresenca() {
    return this.http
      .get<PontoPresenca>(`${GESAC_API}pontoPresenca`)
      .catch(this.appService.handleError);
  }

  /*
  * Protocolo HTTP do ponto de presença para trazer do banco pelo id
  */
  getPontoPresencaPorId(id: number) {
    return this.http
      .get<PontoPresenca>(`${GESAC_API}contatoInfo/${id}`)
      .catch(this.appService.handleError);
  }

  /*
  * Protocolo HTTP do ponto de presença para salvar no banco
  */
  postPontoPresenca(form) {
    return this.http
      .post<PontoPresenca>(`${GESAC_API}pontoPresenca`, form)
      .catch(this.appService.handleError);
  }


  /*
* Protocolo HTTP do Endereço para editar as informações no banco
*/
  putPontoPresenca(form, codPid) {
    return this.http
      .put<PontoPresenca>(`${GESAC_API}pontoPresenca`, form, codPid)
      .catch(this.appService.handleError);
  }



  /*
* Protocolos HTTP de Endereço
*/

  /*
  * Protocolo HTTP do Endereço para trazer do banco
  */
  // getEndereço() {
  //   return this.http
  //     .get(`${GESAC_API}pontoEndereco`)
  //     .catch(this.appService.handleError);
  // }

  /*
  * Protocolo HTTP do ponto de presença para trazer do banco pelo id
  */
  getEndereçoPorId(id: number) {
    return this.http
      .get(`${GESAC_API}contatoInfo/${id}`)
      .catch(this.appService.handleError);
  }

  /*
  * Protocolo HTTP do Endereço para salvar no banco
  */
  postEndereço(form, codPid) {
    return this.http
      .post<PontoPresenca>(`${GESAC_API}pontoEndereco`, form, codPid)
      .catch(this.appService.handleError);
  }

  /*
* Protocolo HTTP do Endereço para editar as informações no banco
*/
  putEndereço(form, codPid) {
    console.log('Foi enviado a mudança');
    // return this.http
    //   .put(`${GESAC_API}pontoEndereco`, form, codPid)
    //   .catch(this.appService.handleError);
  }




 /*
  * Protocolo HTTP do Contarto para trazer do banco
  */
  getContratos() {
    return this.http.get<Contrato[]>(`${GESAC_API}contrato`);
  }

   /*
  * Protocolo HTTP do Lote para trazer no banco pelo id contrato
  */
  getLotes(numContrato) {
    return this.http.get(`${GESAC_API}loteContrato/${numContrato}`);
  }

     /*
  * Protocolo HTTP do Velocidade para trazer no banco pelo id Lote
  */
  getVelocidade(codLote) {
    return this.http.get(`${GESAC_API}velocidade/${codLote}`)
      .map((res: Response) => res);
  }

 /*
  * Protocolo HTTP do Instituição Responsavel para trazer do banco
  */
  getInstResps() {
    return this.http
      .get<InstituicaoResp[]>(`${GESAC_API}instituicaoResponsavel`)
      .catch(this.appService.handleError);
  }


    /*
* Protocolos HTTP de Tipologia
*/

   /*
  * Protocolo HTTP do Tipologia para trazer do banco
  */
  getTipologia() {
    return this.http
      .get(`${GESAC_API}tipologia`)
      .catch(this.appService.handleError);
  }

 /*
  * Protocolo HTTP do Tipologia para salvar no banco
  */
  postTipologia(form) {
    return this.http
      .post(`${GESAC_API}pontoTipologia`, form)
      .catch(this.appService.handleError);
  }

     /*
  * Protocolo HTTP do Tipologia para trazer no banco pelo id pid
  */
  getTipologiaPP(codpid) {
    return this.http
      .get(`${GESAC_API}pontoTipologia/${codpid}`)
      .catch(this.appService.handleError);
  }


       /*
  * Protocolo HTTP do Tipologia para remover no banco pelo id do pid e da Tipologia
  */
  removeTipologiaId(cod_pid, cod_tipologia) {
    return this.http
      .delete(`${GESAC_API}pontoTipologia/${cod_pid}/${cod_tipologia}`)
      .map((res: Response) => res)
      .catch(this.appService.handleError);
  }


}
