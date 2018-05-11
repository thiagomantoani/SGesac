import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoResponsavelDetalheComponent } from './instituicao-responsavel-detalhe.component';

describe('InstituicaoResponsavelDetalheComponent', () => {
  let component: InstituicaoResponsavelDetalheComponent;
  let fixture: ComponentFixture<InstituicaoResponsavelDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituicaoResponsavelDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoResponsavelDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
