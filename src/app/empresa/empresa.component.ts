import { AppService } from './../app.service';
import { Empresa } from './empresa.model';
import { Component, OnInit } from '@angular/core';

import { SuiModalService } from 'ng2-semantic-ui';
import { EmpresaService } from './empresa.service';
import { ConfirmModal } from '../modal/modal.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  filtros = {
    cnpj: '',
    empresa: '',
    municipio: '',
    uf: ''
  };
  segmentDimmed: boolean;
  empresas: Empresa[];

  contratos: any[];

  /*
  * Pagination
  */
 todasEmpresas: any;
 totalItens = 0;
 itensPagina = 50;
 pagina = 1;

  constructor(
    private empresaService: EmpresaService,
    private modalService: SuiModalService,
    private appService: AppService
  ) {}

  /*
  * Método para carregar as empresa do banco e fazer a paginação na tela
  */
  getEmpresas() {
    this.segmentDimmed = true;
    this.empresaService.getEmpresas().subscribe(empresas => {
      this.totalItens = empresas.length;
      this.todasEmpresas = this.appService.pagination(empresas, this.itensPagina);
      this.empresas = this.todasEmpresas[0];
      this.segmentDimmed = false;
    });
  }

  /*
  * Método para deletar a empresa, caso a mesma não tenha contatos vinculados a ela
  */
  deletarEmpresa(empresa) {
    this.modalService
    .open(
      new ConfirmModal(
        'Você tem certeza?',
        `Você tem certeza que deseja excluir a empresa ${empresa.empresa}?`,
        'mini'
      )
    )
    .onApprove(() => {
      this.empresaService
      .deleteEmpresa(empresa.cnpj_empresa)
      .subscribe(res => {
        this.getEmpresas();
        event.stopPropagation();
      });
    });
  }

  /*
  * Método para mudar a página da paginação
  */
  mudarPagina(pagina) {
    this.empresas = this.todasEmpresas[pagina - 1];
  }

  /*
  * Métodos que serão executados quando o componente é iniciado
  */
  ngOnInit() {
      this.getEmpresas();
  }
}
