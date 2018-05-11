import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiModule, SuiCheckboxModule, SuiRatingModule} from 'ng2-semantic-ui';

import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioService } from './usuario.service';
import { UsuarioComponent } from './usuario.component';
import { UsuarioAdicionarComponent } from './usuario-adicionar/usuario-adicionar.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';


@NgModule({
  imports: [
    CommonModule,
        SuiModule,
        SuiCheckboxModule,
        SuiRatingModule,
    UsuarioRoutingModule
  ],
  declarations: [
    UsuarioComponent,
    UsuarioAdicionarComponent,
    UsuarioEditarComponent
  ],
  exports: [
    UsuarioComponent
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
