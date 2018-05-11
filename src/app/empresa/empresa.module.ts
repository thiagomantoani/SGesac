import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';
import { NgxMaskModule } from 'ngx-mask';
import { FilterEmpresaPipe } from './filter-empresa.pipe';

import { EmpresaComponent } from './empresa.component';
import { EmpresaAdicionarEditarComponent } from './empresa-adicionar-editar/empresa-adicionar-editar.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { EmpresaService } from './empresa.service';
import { ContatoModule } from './../contato/contato.module';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    EmpresaRoutingModule,
    ContatoModule
  ],
  declarations: [
    EmpresaComponent,
    EmpresaAdicionarEditarComponent,
    FilterEmpresaPipe
  ],
  exports: [
    EmpresaComponent
  ],
  providers: [
    EmpresaService,
    FilterEmpresaPipe
  ]
})
export class EmpresaModule { }
