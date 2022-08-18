import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDatasComponent } from './import-datas.component';

describe('ImportDatasComponent', () => {
  let component: ImportDatasComponent;
  let fixture: ComponentFixture<ImportDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
