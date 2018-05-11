import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ContratoService } from './../contrato.service';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';


@Component({
  selector: 'app-contrato-detalhe',
  templateUrl: './contrato-detalhe.component.html',
  styleUrls: ['./contrato-detalhe.component.scss']
})
export class ContratoDetalheComponent implements OnInit, OnDestroy {
  public firstActive: boolean;
  public secondActive: boolean;
  public thirdActive: boolean;
  public fourthActive: boolean;

  contrato: any[] = [];
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contratoService: ContratoService,
    private router: Router,
    public modalService: SuiModalService
  ) {
    this.firstActive = true;
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        // this.contrato = this.contratoService.getContrato(id);
      }
    );
    if (this.contrato === null) {
      this.router.navigate(['/contrato']);
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
