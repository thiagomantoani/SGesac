import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiModule } from 'ng2-semantic-ui';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ContratoComponent } from './contrato.component';
import { ContratoAdicionarEditarComponent } from './contrato-adicionar-editar/contrato-adicionar-editar.component';
import { ContratoDetalheComponent } from './contrato-detalhe/contrato-detalhe.component';
import { ContratoRoutingModule } from './contrato.routing.module';
import { ContratoService } from './contrato.service';
import { EmpresaModule } from '../empresa/empresa.module';
import { EmpresaService } from '../empresa/empresa.service';
import { FilterContratoPipe } from './filter-contrato.pipe';
// import { PontoPresencaAdicionarComponent } from '../ponto-presenca/ponto-presenca-adicionar/ponto-presenca-adicionar.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        ContratoRoutingModule,
        SuiModule,
        CurrencyMaskModule
    ],
    declarations: [
        ContratoComponent,
        ContratoDetalheComponent,
        ContratoAdicionarEditarComponent,
        FilterContratoPipe
        // PontoPresencaAdicionarComponent
    ],
    exports: [
        ContratoComponent
    ],
    providers: [
        EmpresaService,
        HttpModule,
        FilterContratoPipe
    ]
})

export class ContratoModule { }
