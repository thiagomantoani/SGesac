import { HttpModule, Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioService } from './municipio.service';
import { MunicipioRoutingModule } from './municipio.routing.module';
import { MunicipioComponent } from './municipio.component';
import { MunicipioAdicionarComponent } from './municipio-adicionar/municipio-adicionar.component';
import { MunicipioEditarComponent } from './municipio-editar/municipio-editar.component';

import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    HttpModule,
    SuiModule,
    SuiCheckboxModule,
    SuiRatingModule
  ],
  declarations: [
    MunicipioComponent,
    MunicipioAdicionarComponent,
    MunicipioEditarComponent
  ],
  exports: [MunicipioComponent],
  providers: [MunicipioService, HttpModule]
})
export class MunicipioModule {}
