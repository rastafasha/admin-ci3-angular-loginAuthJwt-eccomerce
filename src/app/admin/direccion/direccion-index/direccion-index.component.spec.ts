import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionIndexComponent } from './direccion-index.component';

describe('DireccionIndexComponent', () => {
  let component: DireccionIndexComponent;
  let fixture: ComponentFixture<DireccionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
