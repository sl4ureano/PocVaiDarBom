import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarBoletoComponent } from './gerar-boleto.component';

describe('GerarBoletoComponent', () => {
  let component: GerarBoletoComponent;
  let fixture: ComponentFixture<GerarBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarBoletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
