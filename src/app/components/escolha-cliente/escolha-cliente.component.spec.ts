import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhaClienteComponent } from './escolha-cliente.component';

describe('StepperComponent', () => {
  let component: EscolhaClienteComponent;
  let fixture: ComponentFixture<EscolhaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscolhaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolhaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
