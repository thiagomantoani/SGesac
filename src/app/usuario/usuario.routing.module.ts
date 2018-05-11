import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UsuarioComponent } from './usuario.component';
import { UsuarioAdicionarComponent } from './usuario-adicionar/usuario-adicionar.component'
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';

const UsuarioRoutes: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent
    },
    {
        path: 'novaUsuario',
        component: UsuarioAdicionarComponent
    },
    {
        path: ':id/editarUsuario',
        component: UsuarioEditarComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(UsuarioRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsuarioRoutingModule {}
