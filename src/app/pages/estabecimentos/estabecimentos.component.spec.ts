import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabecimentosComponent } from './estabecimentos.component';

describe('EstabecimentosComponent', () => {
  let component: EstabecimentosComponent;
  let fixture: ComponentFixture<EstabecimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstabecimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabecimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
