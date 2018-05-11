import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MunicipioComponent } from './municipio.component';
import { MunicipioAdicionarComponent } from './municipio-adicionar/municipio-adicionar.component';
import { MunicipioEditarComponent } from './municipio-editar/municipio-editar.component';

const MunnicipioRoutes: Routes = [
    {
        path: '',
        component: MunicipioComponent
    },
    {
        path: 'novaMunicipio',
        component: MunicipioAdicionarComponent
    },
    {
        path: ':id/editarMunicipio',
        component: MunicipioEditarComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(MunnicipioRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MunicipioRoutingModule {}
