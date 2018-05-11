import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal/modal.component';
import { ContatoService } from './contato.service';
import { Contato } from './contato.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  local: string;
  codContato: string;

  @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
  private termosDaBusca: Subject<string> = new Subject<string>();
  contatos: Observable<any[]>;
  contatosRetorno: any[];
  dadosPessoa: any;
  contatosCadastrados = [];
  formulario = {};
  existeContato = false;
  telefone: any;

  // Campos ngifs
  desabilitarCampos = false;
  aparecerInfContato = false;
  aparecerContatosCadastrados = false;

  constructor(
    private contatoService: ContatoService,
    private modalService: SuiModalService
  ) {}

  // GET E POSTS INICIO


  // GET E POST EMPRESA

  getContatosEmpresa(cnpjEmpresa) {
    this.contatoService
      .getContatosEmpresa(cnpjEmpresa)
      .subscribe(contatos => {
        this.contatosCadastrados = contatos;
      });
  }

  postContatoEmpresa(form) {
    this.formulario = {
      cod_pessoa: this.dadosPessoa.cod_pessoa,
      cnpj_empresa: this.codContato,
      cargo: form.cargo,
      obs: form.obs
    };
    this.postContatos(this.formulario);
  }


  // GET E POST PONTO

  getContatosPonto(codGesac) {
    this.contatoService
      .getContatosPonto(codGesac)
      .subscribe(contatos => {
        this.contatosCadastrados = contatos;
      });
  }

  postContatoPonto(form) {
    this.formulario = {
      cod_pessoa: this.dadosPessoa.cod_pessoa,
      cod_gesac: this.codContato,
      cargo: form.cargo,
      obs: form.obs
    };
    this.postContatos(this.formulario);
  }


  // GET E POST INSTITUICAO

  getContatosInstituicao(codInst) {
    this.contatoService
      .getContatosInstituicao(codInst)
      .subscribe(contatos => {
        this.contatosCadastrados = contatos;
      });
  }

  postContatoInstituicao(form) {
    this.formulario = {
      cod_pessoa: this.dadosPessoa.cod_pessoa,
      cod_instituicao: this.codContato,
      cargo: form.cargo,
      obs: form.obs
    };
    this.postContatos(this.formulario);
  }

// post de contatos

  postContatos(form) {
    this.contatoService
      .postContato(form)
      .subscribe(contatos => {
        this.cancelarInfContato();
        this.funcaoContato('get', this.local, this.codContato);
      });
  }

  funcaoContato(metodo, local, valor) {
    if (local === 'empresa') {
      if (metodo === 'get') {
        this.getContatosEmpresa(valor);
      } else if (metodo === 'post') {
        this.postContatoEmpresa(valor);
      }
    } else if (local === 'ponto') {
      if (metodo === 'get') {
        this.getContatosPonto(valor);
      } else if (metodo === 'post') {
        this.postContatoPonto(valor);
      }
    } else if (local === 'instituicao') {
      if (metodo === 'get') {
        this.getContatosInstituicao(valor);
      } else if (metodo === 'post') {
        this.postContatoInstituicao(valor);
      }
    }
  }

// GET E POSTS FIM

  getContatos(codigo) {
    this.contatoService
    .getContatoById(codigo)
    .subscribe(contatosRetorno => {
      this.contatosRetorno = contatosRetorno;
      this.aparecerInfContato = true;
    });
  }

  salvarCods(local, codContato) {
    this.local = local;
    this.codContato = codContato;
  }

  buscaPessoa(contatos: any): void {
    this.termosDaBusca.next(contatos);
    this.buscaChange.emit(contatos);
  }

  telefoneValido(form) {
    if ((form.fone && !form.tipo) || (!form.fone && form.tipo)) {
        this.modalService
        .open(
          new ConfirmModal(
            'O tipo de telefone e o telefone devem estar preeenchidos.',
            '',
            'mini'
          )
        );
        return false;
    } else if (!form.tipo && !form.fone && !form.email) {
      this.modalService
      .open(
        new ConfirmModal(
          'Verifique se os campos não estão vazios.',
          '',
          'mini'
        )
      );
      return false;
    } else {
      return true;
    }
  }

  addTelefone(fAddTel: NgForm) {
    this.telefone = {
      cod_pessoa: this.dadosPessoa.cod_pessoa,
      email: fAddTel.value.email,
      fone: fAddTel.value.fone,
      tipo: fAddTel.value.tipo
     };
     if (this.telefoneValido(this.telefone)) {
        this.contatoService.postTelefone(this.telefone)
        .subscribe(res => {
          this.getContatos(this.dadosPessoa.cod_pessoa);
          fAddTel.reset();
        });
     }
  }

  infoContato(contato: any) {
    if (this.desabilitarCampos === false) {
      this.modalService
        .open(
          new ConfirmModal(
            'Você tem certeza?',
            `Você tem certeza que deseja editar o contato ${contato.nomePessoa}?`,
            'mini'
          )
        )
        .onApprove(() => {
          this.desabilitarCampos = true;
          this.dadosPessoa = {cod_pessoa: contato.cod_pessoa, nome: contato.nomePessoa};
          this.getContatos(contato.cod_pessoa);
        });
    }
  }

  enviarNome(nome) {
    this.modalService
      .open(
        new ConfirmModal(
          'Você tem certeza?',
          `Você tem certeza que deseja cadastrar ${nome}?`,
          'mini'
        )
      )
      .onApprove(() => {
        this.contatoService.postContatoPessoa(nome).subscribe(cod_pessoa => {
          this.dadosPessoa = {cod_pessoa, nome};
          this.desabilitarCampos = true;
          this.aparecerInfContato = true;
        });
      });
  }

  // Informacaoes do contato

  cancelarInfContato() {
    this.desabilitarCampos = false;
    this.aparecerInfContato = false;
    this.dadosPessoa = [];
    this.contatosRetorno = [];
  }

  salvarContato(form) {
    this.existeContato = false;
    for (let i = 0; i < this.contatosCadastrados.length; i++) {
      if (this.dadosPessoa.cod_pessoa === this.contatosCadastrados[i].cod_pessoa) {
        this.existeContato = true;
        break;
      }
    }
    if (!this.existeContato) {
      this.modalService
            .open(
              new ConfirmModal(
                'Você tem certeza?',
                `Você tem certeza que deseja Salvar os dados de ${this.dadosPessoa.nome}?`,
                'mini'
              )
            )
            .onApprove(() => {
              this.funcaoContato('post', this.local, form.value);
        });
    } else {
      this.modalService
            .open(
              new ConfirmModal(
                'Não foi possível cadastrar!',
                `O contato que você está tentando adicionar já está cadastrado.`,
                'mini'
              )
            );
    }
  }

  // Tabela dos contatos cadastrados no banco

  ngOnInit() {
    this.contatos = this.termosDaBusca
      .debounceTime(500) // aguarde por 500ms para emitir novos eventos
      .distinctUntilChanged() // ignore se o próximo termo de busca for igual ao anterior
      .switchMap(term => term ? this.contatoService.buscaPessoa(term) : Observable.of<Contato[]>([]))
      .catch(err => {
          console.log(err);
          return Observable.of<Contato[]>([]);
    });
    this.contatoService.emitirCodContatos.subscribe(codigo => {
      if (codigo.codContato !== '') {
        this.funcaoContato('get', codigo.local, codigo.codContato);
      }
      this.salvarCods(codigo.local, codigo.codContato);
      this.cancelarInfContato();
    });
  }
}
