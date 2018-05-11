import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';

import { FilterTipologiaPipe } from './filter-tipologia.pipe';
import { TipologiaService } from './tipologia.service';
import { TipologiaRoutingModule } from './tipologia.routing.module';
import { TipologiaComponent } from './tipologia.component';
import { TipologiaEditarComponent } from './tipologia-editar/tipologia-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    SuiCheckboxModule,
    SuiRatingModule,
    TipologiaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TipologiaComponent,
    TipologiaEditarComponent,
    FilterTipologiaPipe
  ],
  exports: [TipologiaComponent],
  providers: [
    TipologiaService,
    FilterTipologiaPipe
  ]
})
export class TipologiaModule {}
