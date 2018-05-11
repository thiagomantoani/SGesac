import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { InstRespService } from '../instituicao-responsavel.service';

@Component({
  selector: 'app-instituicao-responsavel-detalhe',
  templateUrl: './instituicao-responsavel-detalhe.component.html',
  styleUrls: ['./instituicao-responsavel-detalhe.component.scss']
})
export class InstituicaoResponsavelDetalheComponent implements OnInit {

  modalActions = new EventEmitter<string>();
  inscricao: Subscription;
  instituicao: any[];
  instiResp: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private instituicaoResponsavelService: InstRespService,
    private router: Router,
    private instRespService: InstRespService
  ) { }

  ngOnInit() {

    // função para pegar o id da rota
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );

      // função que passa o id da rota para pegar os dados do respectivo ID.
      setTimeout(() => {
      this.instRespService.getInstResp(this.id).subscribe(
        res => {
          this.instiResp = res[0];
          console.log(this.instiResp);
        }
      );
    }, 200);


    // if (this.instituicao === null) {
    //   this.router.navigate(['/contrato']);
    // }

  }


  openModal() {

  }


}
