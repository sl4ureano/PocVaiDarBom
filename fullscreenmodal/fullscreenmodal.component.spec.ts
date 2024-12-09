import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenmodalComponent } from './fullscreenmodal.component';

describe('FullscreenmodalComponent', () => {
  let component: FullscreenmodalComponent;
  let fixture: ComponentFixture<FullscreenmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
