import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuiModule, SuiCheckboxModule, SuiRatingModule} from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import '../util/rxjs-extensions';

import { FilterPontoPresencaPipe } from './filter-ponto-presenca.pipe';
import { PontoPresencaRoutingModule } from './ponto-presenca.routing.module';
import { PontoPresencaAddEditComponent } from './ponto-presenca-add-edit/ponto-presenca-add-edit.component';
import { PontoPresencaDetalheComponent } from './ponto-presenca-detalhe/ponto-presenca-detalhe.component';
import { JustificativaModalComponent  } from './ponto-presenca-detalhe/justificativa-modal.component';
import { PontoPresencaComponent } from './ponto-presenca.component';
import { PontoPresencaService } from './ponto-presenca.service';
import { ContatoModule } from './../contato/contato.module';

@NgModule({
    imports: [
        CommonModule,
        SuiModule,
        SuiCheckboxModule,
        SuiRatingModule,
        PontoPresencaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ContatoModule,
        HttpModule
    ],
    declarations: [
        PontoPresencaAddEditComponent,
        PontoPresencaComponent,
        PontoPresencaDetalheComponent,
        JustificativaModalComponent,
        FilterPontoPresencaPipe
    ],
    exports: [
        PontoPresencaComponent
    ],
    providers: [
        PontoPresencaService,
        HttpModule,
        FilterPontoPresencaPipe
    ],
  entryComponents : [
    JustificativaModalComponent
  ]
})

export class PontoPresencaModule { }
