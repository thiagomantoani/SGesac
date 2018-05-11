import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Response } from '@angular/http';
import { GESAC_API } from './../app.api';
import { Contato } from './contato.model';

@Injectable()
export class ContatoService {

  emitirCodContatos = new EventEmitter();

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

// INICIO GETS E POST CONTATOS

// GET E POST EMPRESA

  getContatos(codContato, local) {
    this.emitirCodContatos.emit({codContato, local});
  }

  postContatoEmpresa(form) {
    return form;
  }

// GET E POST PONTO

  getContatosEmpresa(cnpjEmpresa) {
    return this.http
    .get<Contato[]>(`${GESAC_API}contatoEmpresa/${cnpjEmpresa}`)
    .catch(this.appService.handleError);
  }

  postContatoPonto(form) {
    return form;
  }

// GET E POST INSTITUICAO

  getContatosInstituicao(codInstituicao) {
    return this.http
    .get<Contato[]>(`${GESAC_API}contatoInstituicao/${codInstituicao}`)
    .catch(this.appService.handleError);
  }

  postContatoInstituicao(form) {
    return form;
  }

  // GET DE CONTATOS

  postContato(form) {
    return this.http
    .post<Contato>(`${GESAC_API}contato`, form)
    .catch(this.appService.handleError);
  }

  // FIM GETS E POST CONTATOS


  // POST TELEFONE

  postTelefone(form) {
    return this.http
    .post(`${GESAC_API}telefone`, form)
    .catch(this.appService.handleError);
  }


  getContatosPonto(codGesac) {
    return this.http
    .get<Contato[]>(`${GESAC_API}contatoPonto/${codGesac}`)
    .catch(this.appService.handleError);
  }

  buscaPessoa(term: string) {
    return this.http
      .get<Contato[]>(`${GESAC_API}contato/${term}`)
      .catch(this.appService.handleError);
  }

  getContatoById(id: number) {
    return this.http
      .get<Contato>(`${GESAC_API}contatoInfo/${id}`)
      .catch(this.appService.handleError);
  }

  postContatoPessoa(nome) {
    return this.http
      .post(`${GESAC_API}pessoa`, {nome})
      .map((res: Response) => res)
      .catch(this.appService.handleError);
  }
}
