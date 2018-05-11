import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SuiModule } from 'ng2-semantic-ui';

import { ContatoComponent } from './contato.component';
import { ContatoService } from './contato.service';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    HttpModule
  ],
  declarations: [
    ContatoComponent
  ],
  providers: [
    ContatoService
  ],
  exports: [
    ContatoComponent
  ]
})
export class ContatoModule { }
