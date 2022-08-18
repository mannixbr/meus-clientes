import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharPedidoComponent } from './fechar-pedido.component';

describe('FecharPedidoComponent', () => {
  let component: FecharPedidoComponent;
  let fixture: ComponentFixture<FecharPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FecharPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
