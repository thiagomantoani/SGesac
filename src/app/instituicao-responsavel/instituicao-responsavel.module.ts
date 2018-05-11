import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { FilterInstRespPipe } from './filter-inst-resp.pipe';

import { InstRespAddEditComponent } from './inst-resp-add-edit/inst-resp-add-edit.component';
import { InstRespComponent } from './instituicao-responsavel.component';
import { InstRespService } from './instituicao-responsavel.service';
import { InstRespRoutingModule } from './instituicao.responsavel.routing.module';
import { InstituicaoResponsavelDetalheComponent } from './instituicao-responsavel-detalhe/instituicao-responsavel-detalhe.component';
import { ContatoComponent } from '../contato/contato.component';
import { ContatoModule } from '../contato/contato.module';
import { ContatoService } from '../contato/contato.service';
@NgModule({
    imports: [
      CommonModule,
      SuiModule,
      SuiCheckboxModule,
      SuiRatingModule,
      InstRespRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaskModule.forRoot(),
        ContatoModule
    ],
    declarations: [
        InstRespComponent,
        InstRespAddEditComponent,
        InstituicaoResponsavelDetalheComponent,
        FilterInstRespPipe
    ],
    exports: [
        InstRespComponent
    ],
    entryComponents: [
        InstRespComponent
    ],
    providers: [
        InstRespService,
        FilterInstRespPipe
        ]
})

export class InstRespModule { }
