import { Component, OnInit } from '@angular/core';


import { AuthService } from '../login/auth.service';
import { AuthenticationService } from '../services';

@Component({
  moduleId: 'module.id',
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

mostrarMenu = false;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService
  ) {

  }

  logout() {
    this.authenticationService.logout();
  }

  isLogado() {
    return this.authenticationService.isLogado();
  }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

}
